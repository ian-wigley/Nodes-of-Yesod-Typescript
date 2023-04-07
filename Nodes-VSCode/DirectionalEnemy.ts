import Enemy = require("Enemy");
import { direction } from "./Direction";

class DirectionalEnemy extends Enemy {

    public Draw(ctx: CanvasRenderingContext2D): void {
        if (this.m_direction == direction.FACE_RIGHT) {
            ctx.drawImage(this.m_texture, this.m_offsetX, this.m_offsetY, 68, 68, this.m_x, this.m_y, 64, 64);
        }
        else {
            this.m_offsetX += this.m_imageIndex;
            ctx.drawImage(this.m_texture, this.m_offsetX, this.m_offsetY, 68, 68, this.m_x, this.m_y, 64, 64);
        }
        this.DrawDebugRectangle(ctx);
    }
}
export = DirectionalEnemy;