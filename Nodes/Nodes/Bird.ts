﻿import Enemy = require("Enemy");
import Rectangle = require("Rectangle");

class Bird extends Enemy {

    private m_birdRect: Rectangle;

    constructor(xpos: number, ypos: number, speedx: number, gamesprites: HTMLCanvasElement, wall: Array<Rectangle>) {
        super(xpos, ypos, speedx, gamesprites, wall);
        this.m_name = "Bird";
        this.m_x = 180;
        this.m_y = 400;
        this.m_width = 34;//64
        this.m_height = 64;
        this.m_speed = 1;
    }

    public Update(): void {
        this.m_animTimer += 0.1;
        this.m_x += this.m_speed;
        if (this.m_animTimer > 0.4) {
            this.m_frameX = (this.m_frameX + 1) % 4;
            this.m_animTimer = 0;
        }
        var triggered = false;
        this.m_birdRect = new Rectangle(this.m_x + 10, this.m_y, this.m_width, this.m_height);
        for (var i = 0; i < this.m_walls.length; i++) {
            if (this.m_birdRect.Intersects(this.m_walls[i]) && !triggered ){
                triggered = true;
                if (this.m_speed > 0) {
                    this.m_x -= 5;
                    this.m_speed *= -1;
                }
                else {
                    this.m_x += 5;
                    this.m_speed *= -1;
                }
            }
        }
    }

    public Draw(ctx: CanvasRenderingContext2D): void {
        ctx.beginPath();
        ctx.drawImage(this.m_texture, this.m_frameX * 64, 7 * 69, 68, 68, this.m_x, this.m_y, 64, 64);
    }
}

export = Bird; 