import Enemy = require("Enemy");
import Rectangle = require("Rectangle");
import ScreenInfo = require("ScreenInfo");

class Bird extends Enemy {

    constructor(
        x: number,
        y: number,
        speed: number,
        gameSprites: HTMLCanvasElement,
        wall: Array<Rectangle>,
        screenInfo: ScreenInfo
    ) {
        super(x, y, speed, gameSprites, wall, screenInfo);
        this.m_name = "Bird";
        this.m_x = 180;
        this.m_y = y;
        this.m_width = 34;//64
        this.m_height = 64;
        this.m_speed = 1;
        this.m_facingLeft = false;
        this.m_offsetX = 4 * 64;
        this.m_offsetY = 10 * 69;
    }

    public Update(): void {
        this.m_animTimer += 0.1;
        this.m_x += this.m_speed;
        if (this.m_animTimer > 0.4) {
            this.m_frame = (this.m_frame + 1) % 4;
            this.m_animTimer = 0;
        }
        this.m_rectangle = new Rectangle(this.m_x + 10, this.m_y, this.m_width, this.m_height - 10, this.m_name);
        this.CheckWallCollisions();
    }

    public Draw(ctx: CanvasRenderingContext2D): void {
        if (!this.m_facingLeft) {
            ctx.drawImage(this.m_texture, (this.m_frame + 4) * 64, this.m_offsetY, 68, 68, this.m_x, this.m_y, 64, 64);
        }
        else {
            ctx.drawImage(this.m_texture, (this.m_frame + 8) * 64, this.m_offsetY, 68, 68, this.m_x, this.m_y, 64, 64);
        }
        if (this.m_debug) {
            ctx.lineWidth = 1;
            ctx.strokeStyle = "green";
            ctx.rect(this.BoundingRectangle.left, this.BoundingRectangle.top, this.BoundingRectangle.Width, this.BoundingRectangle.Height);
            ctx.stroke();
        }
    }
}

export = Bird;