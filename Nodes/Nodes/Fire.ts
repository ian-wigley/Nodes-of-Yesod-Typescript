import Enemy = require("Enemy");
import Rectangle = require("Rectangle");

class Fire extends Enemy{
    constructor(xpos: number, ypos: number, speedx: number, gamesprites: HTMLCanvasElement, wall: Array<Rectangle>) {
        super(xpos, ypos, speedx, gamesprites, wall);
        this.m_name = "Fire";
        this.m_offsetX = 6 * 64;
        this.m_offsetY = 10 * 69;
    }

    public Update(): void {
        this.m_animTimer += 0.1;
 //       this.m_x += this.m_speed;
        if (this.m_animTimer > 0.4) {
            this.m_frame = (this.m_frame + 1) % 4;
            this.m_animTimer = 0;
        }
    }

    public Draw(ctx: CanvasRenderingContext2D): void {
        ctx.beginPath();
        ctx.drawImage(this.m_texture, this.m_frame * 64 + this.m_offsetX, this.m_offsetY, 68, 68, this.m_x, this.m_y, 64, 64);
    }
}

export = Fire;