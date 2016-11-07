import Enemy = require("Enemy");

class ChasingEnemy extends Enemy {
    constructor(xpos: number, ypos: number, speedx: number, gamesprites: HTMLCanvasElement, wall: number[]) {
        super(xpos, ypos, speedx, gamesprites, wall);
    }

    public Update(): void {
        this.m_animTimer += 0.1;
        if (this.m_animTimer > 0.4) {
            this.m_frameX = (this.m_frameX + 1) % 3;
            this.m_animTimer = 0;
        }
    }

    public Draw(ctx: CanvasRenderingContext2D): void {
        ctx.beginPath();
        ctx.drawImage(this.m_texture, this.m_frameX * 64 + (2 * 64), 9 * 69, 68, 68, this.m_x, this.m_y, 64, 64);
    }

}

export = ChasingEnemy;
