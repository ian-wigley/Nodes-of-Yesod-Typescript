import Enemy = require("Enemy");
import Rectangle = require("Rectangle");
import ScreenInfo = require("ScreenInfo");

class TelePort extends Enemy {
    constructor(
        x: number,
        y: number,
        speed: number,
        gameSprites: HTMLCanvasElement,
        wall: Array<Rectangle>,
        screenInfo: ScreenInfo
    ) {
        super(x, y, speed, gameSprites, wall, screenInfo);
        this.m_name = "TelePort";
        this.m_x = x;
        this.m_y = y;
        this.m_width = 34;
        this.m_height = 64;
        this.m_speed = speed;
        this.m_offsetX = 11 * 64;
        this.m_offsetY = 7 * 69;
    }

    public Update(): void {
        this.m_animTimer += 0.1;
        this.m_offsetX = (this.m_frame + 8) * 64;
        if (this.m_animTimer > 0.4) {
            this.m_frame = (this.m_frame + 1) % 3;
            this.m_animTimer = 0;
        }
    }

    public Draw(ctx: CanvasRenderingContext2D): void {
        ctx.drawImage(this.m_texture, this.m_offsetX, this.m_offsetY, 68, 68, this.m_x, this.m_y, 64, 64);
    }
}
export = TelePort; 