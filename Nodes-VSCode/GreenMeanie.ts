﻿import Enemy = require("Enemy");
import Rectangle = require("Rectangle");
import ScreenInfo = require("ScreenInfo");

class GreenMeanie extends Enemy {

    constructor(
        x: number,
        y: number,
        speed: number,
        gameSprites: HTMLCanvasElement,
        wall: Array<Rectangle>,
        screenInfo: ScreenInfo
    ) {
        super(x, y, speed, gameSprites, wall, screenInfo);
        this.m_name = "GreenMeanie";
        this.m_offsetX = 0;
        this.m_offsetY = 19 * 69;
        this.m_width = 34;
        this.m_height = 64;
    }

    public Update(): void {
        this.m_animTimer += 0.1;
        this.m_x += this.m_speed;
        this.m_offsetX = this.m_frame * 64;
        if (this.m_animTimer > 0.4) {
            this.m_frame = (this.m_frame + 1) % 4;
            this.m_animTimer = 0;
        }
        if (this.m_x >= 700) {
            this.m_speed *= -1;
            this.m_facingLeft = true;
        }
        else if (this.m_x < 0) {
            this.m_speed *= -1;
            this.m_facingLeft = false;
        }
        this.m_rectangle = new Rectangle(this.m_x + 10, this.m_y, 64, 64, this.m_name);
    }

    public Draw(ctx: CanvasRenderingContext2D): void {
        if (!this.m_facingLeft) {
            ctx.drawImage(this.m_texture, this.m_offsetX, this.m_offsetY, 68, 68, this.m_x, this.m_y, 64, 64);
        }
        else {
            this.m_offsetX += 4 * 64;
            ctx.drawImage(this.m_texture, this.m_offsetX, this.m_offsetY, 68, 68, this.m_x, this.m_y, 64, 64);
        }
        this.DrawDebugRectangle(ctx);
    }
}
export = GreenMeanie;