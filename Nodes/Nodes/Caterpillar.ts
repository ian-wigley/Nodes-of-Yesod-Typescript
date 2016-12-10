import Enemy = require("Enemy");
import Rectangle = require("Rectangle");

class Caterpillar extends Enemy {

    constructor(xpos: number, ypos: number, speedx: number, gamesprites: HTMLCanvasElement, wall: Array<Rectangle>) {
        super(xpos, ypos, speedx, gamesprites, wall);
        this.m_name = "Caterpillar";
        this.m_offsetX = 0 * 64;
        this.m_offsetY = 0 * 69;
    }

    public Update(): void {
        this.m_animTimer += 0.1;
        if (this.m_animTimer > 0.4) {
            this.m_frame = (this.m_frame + 1) % 7;
            this.m_animTimer = 0;
        }
    }

    public Draw(ctx: CanvasRenderingContext2D): void {
        ctx.beginPath();
        ctx.drawImage(this.m_texture, this.m_frame * 64 + (15 * 64), 5 * 69, 68, 68, this.m_x, this.m_y, 64, 64);
    }

    public set Ledges(value: Array<Rectangle>) { this.m_platforms = value; }
    public set Walls(value: Array<Rectangle>) { this.m_walls = value; }
}

export = Caterpillar;  