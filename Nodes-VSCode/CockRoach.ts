import Enemy = require("Enemy");
import Rectangle = require("Rectangle");
import ScreenInfo = require("ScreenInfo");

class CockRoach extends Enemy {
    constructor(
        x: number,
        y: number,
        speed: number,
        gameSprites: HTMLCanvasElement,
        wall: Array<Rectangle>,
        screenInfo: ScreenInfo
    ) {
        super(x, y, speed, gameSprites, wall, screenInfo);
        this.m_name = "WoodLouse";
        this.m_facingLeft = true;
    }

    public Update(): void {
        this.m_animTimer += 0.1;
        this.m_x -= this.m_speed;
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
            ctx.drawImage(this.m_texture, this.m_frame * 64, 7 * 69, 68, 68, this.m_x, this.m_y, 64, 64);
        }
        else {
            ctx.drawImage(this.m_texture, (this.m_frame + 4) * 64, 7 * 69, 68, 68, this.m_x, this.m_y, 64, 64);
        }
    }
}
export = CockRoach;