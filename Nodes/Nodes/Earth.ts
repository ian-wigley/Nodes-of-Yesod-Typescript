import BaseObject = require("BaseObject");

class Earth extends BaseObject {

    constructor(texture: HTMLCanvasElement) {
        super(texture);
        this.m_x = 50;
        this.m_y = 50;
        this.m_width = texture.width;
        this.m_height = texture.height;
        this.m_frameX = 0;
    }

    Update(value: number = 0): void {
        this.m_frameX = (this.m_frameX + 1) % 15;
    }

    public Draw(ctx: CanvasRenderingContext2D): void {
        ctx.beginPath();
        ctx.drawImage(this.m_texture, this.m_frameX * 64, 894, 64, 64, this.m_x, this.m_y, 64, 64);
        ctx.fill();
    }
}

export = Earth;