import BaseObject = require("BaseObject");
import ScreenInfo = require("ScreenInfo");

class Earth extends BaseObject {

    constructor(
        gameSprites: HTMLCanvasElement,
        screenInfo: ScreenInfo
    ) {
        super(gameSprites, screenInfo);
        this.m_x = 600;
        this.m_y = 20;
        this.m_width = this.m_wide;
        this.m_height = this.m_high;
        this.m_offsetX = 0;
        this.m_offsetY = 15 * this.m_high;
    }

    public Update(): void {
        this.m_animTimer += 0.1;
        this.m_offsetX = this.m_frame * this.m_wide;
        if (this.m_animTimer > 10.4) {
            this.m_frame = (this.m_frame + 1) % 15;
            this.m_animTimer = 0;
        }
    }

    public Draw(ctx: CanvasRenderingContext2D): void {
        ctx.drawImage(this.m_texture, this.m_offsetX, this.m_offsetY, 64, 64, this.m_x, this.m_y, 64, 64);
        if (this.m_debug) {
            ctx.font = "12px Arial";
            ctx.fillStyle = "yellow";
            ctx.fillText("Earth Frame :" + this.m_frame, 600, 100);
        }
    }
}

export = Earth;