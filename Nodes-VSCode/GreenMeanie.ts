import Enemy = require("Enemy");
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
        this.m_offsetX = 11 * 64;
        this.m_offsetY = 7 * 69;
    }

    public Update(): void {
        this.m_animTimer += 0.1;
        this.m_x += this.m_speed;
        this.m_offsetX = (this.m_frame + 11) * 64;
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
    }

    public Draw(ctx: CanvasRenderingContext2D): void {
        if (!this.m_facingLeft) {
            ctx.drawImage(this.m_texture, this.m_offsetX, this.m_offsetY, 68, 68, this.m_x, this.m_y, 64, 64);
        }
        else {
            this.m_offsetX += 4 * 64;
            ctx.drawImage(this.m_texture, this.m_offsetX, this.m_offsetY, 68, 68, this.m_x, this.m_y, 64, 64);
        }
    }
}
export = GreenMeanie;