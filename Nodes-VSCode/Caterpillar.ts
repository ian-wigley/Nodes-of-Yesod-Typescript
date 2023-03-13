import Enemy = require("Enemy");
import Rectangle = require("Rectangle");
import ScreenInfo = require("ScreenInfo");

class Caterpillar extends Enemy {

    constructor(
        x: number,
        y: number,
        speed: number,
        gameSprites: HTMLCanvasElement,
        wall: Array<Rectangle>,
        screenInfo: ScreenInfo
    ) {
        super(x, y, speed, gameSprites, wall, screenInfo);
        this.m_name = "Caterpillar";
        this.m_offsetX = 0 * 64;
        this.m_offsetY = 0 * 69;
        this.m_width = 34;
        this.m_height = 64;
    }

    public Update(): void {
        this.m_animTimer += 0.1;
        this.m_x += this.m_speed;
        if (this.m_animTimer > 0.4) {
            this.m_frame = (this.m_frame + 1) % 7;
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
    }

    public Draw(ctx: CanvasRenderingContext2D): void {
        ctx.drawImage(this.m_texture, this.m_frame * 64, 16 * 69, 68, 68, this.m_x, this.m_y, 64, 64);
        this.DrawDebugRectangle(ctx);
    }

}

export = Caterpillar;