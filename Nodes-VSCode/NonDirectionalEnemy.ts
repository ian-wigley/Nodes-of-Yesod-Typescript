import Enemy = require("Enemy");

class NonDirectionalEnemy extends Enemy {

    public Draw(ctx: CanvasRenderingContext2D): void {
        ctx.drawImage(this.m_texture, this.m_offsetX, this.m_offsetY, 68, 68, this.m_x, this.m_y, 64, 64);
        this.DrawDebugRectangle(ctx);
    }
}
export = NonDirectionalEnemy;