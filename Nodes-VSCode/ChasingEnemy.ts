import Enemy = require("Enemy");
import Rectangle = require("Rectangle");
import ScreenInfo = require("ScreenInfo");

class ChasingEnemy extends Enemy {
    constructor(
        x: number,
        y: number,
        speed: number,
        gameSprites: HTMLCanvasElement,
        wall: Array<Rectangle>,
        screenInfo: ScreenInfo
    ) {
        super(x, y, speed, gameSprites, wall, screenInfo);
        this.m_name = "ChasingEnemy";
        this.m_offsetX = 0 * 64;
        this.m_offsetY = 10 * 69;
        this.m_width = 34;
        this.m_height = 64;
        this.m_debug = false;
    }

    public Update(): void {
        this.m_animTimer += 0.1;
        if (this.m_animTimer > 0.4) {
            this.m_frame = (this.m_frame + 1) % 3;
            this.m_animTimer = 0;
        }
        if (this.m_charlieX < this.m_x) {
            this.m_x -= this.m_speedX;
        }
        else if (this.m_charlieX > this.m_x) {
            this.m_x += this.m_speedX;
        }

        if (this.m_charlieY < this.m_y) {
            this.m_y -= this.m_speedY;
        }
        else if (this.m_charlieY > this.m_y) {
            this.m_y += this.m_speedY;
        }
    }

    public Draw(ctx: CanvasRenderingContext2D): void {
        // ctx.beginPath();
        ctx.drawImage(this.m_texture, this.m_frame * 64, this.m_offsetY, 68, 68, this.m_x, this.m_y, 64, 64);
        this.DrawDebugRectangle(ctx);
    }
}

export = ChasingEnemy;