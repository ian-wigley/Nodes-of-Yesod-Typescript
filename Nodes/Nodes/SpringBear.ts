import Enemy = require("Enemy");
import Rectangle = require("Rectangle");

class SpringBear extends Enemy {
    constructor(xpos: number, ypos: number, speedx: number, gamesprites: HTMLCanvasElement, wall: Array<Rectangle>) {
        super(xpos, ypos, speedx, gamesprites, wall);
    }

    public Update(): void {
        this.m_animTimer += 0.1;
        if (this.m_animTimer > 0.4) {
            this.m_frameX = (this.m_frameX + 1) % 4;
            this.m_animTimer = 0;
        }
    }

    public Draw(ctx: CanvasRenderingContext2D): void {
        ctx.beginPath();
        ctx.drawImage(this.m_texture, this.m_frameX * 64, 6 * 69, 68, 68, this.m_x, this.m_y, 64, 64);
    }

    public set Ledges(value: Array<Rectangle>) { this.m_platforms = value; }
    public set Walls(value: Array<Rectangle>) { this.m_walls = value; }

}
export = SpringBear;