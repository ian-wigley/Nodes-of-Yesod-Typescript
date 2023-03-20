import Enemy = require("Enemy");
import Rectangle = require("Rectangle");
import ScreenInfo = require("ScreenInfo");

class Alf extends Enemy {

    constructor(
        x: number,
        y: number,
        speed: number,
        gameSprites: HTMLCanvasElement,
        wall: Array<Rectangle>,
        screenInfo: ScreenInfo
    ) {
        super(x, y, speed, gameSprites, wall, screenInfo);
        this.m_name = "Alf";
        this.m_x = x;
        this.m_y = y;
        this.m_width = 34;
        this.m_height = 64;
        this.m_speed = speed;
        this.m_offsetX = 0 * 64;
        this.m_offsetY = 5 * 69;
    }

    public Update(): void {
        this.m_animTimer += 0.1;
        this.m_x += this.m_speed;
        if (this.m_animTimer > 1.4) {
            this.m_frame = (this.m_frame + 1) % 7;
            this.m_animTimer = 0;
        }
        this.m_rectangle = new Rectangle(this.m_x + 10, this.m_y, this.m_width, this.m_height, this.m_name);
        this.CheckWallCollisions();
    }

    public Draw(ctx: CanvasRenderingContext2D): void {
        if (!this.m_facingLeft) {
            ctx.drawImage(this.m_texture, this.m_frame * 64 + this.m_offsetX, this.m_offsetY, 68, 68, this.m_x, this.m_y, 64, 64);
        }
        else {
            ctx.drawImage(this.m_texture, this.m_frame * 64 + this.m_offsetX, this.m_offsetY + 69, 68, 68, this.m_x, this.m_y, 64, 64);
        }
    }
}

export = Alf;