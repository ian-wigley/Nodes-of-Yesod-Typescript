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
        this.m_offsetX = 0 * 64;
        this.m_offsetY = 0 * 69;
    }

    public Update(): void {
        this.m_animTimer += 0.1;
        //this.m_x += this.m_speed;
        if (this.m_animTimer > 0.4) {
            this.m_frame = (this.m_frame + 1) % 4;
            this.m_animTimer = 0;
        }
    }

    public Draw(ctx: CanvasRenderingContext2D): void {
        ctx.beginPath();
        ctx.drawImage(this.m_texture, (this.m_frame + 4) * 64, 6 * 69, 68, 68, this.m_x, this.m_y, 64, 64);
    }
}
export = GreenMeanie;