import BaseObject = require("BaseObject");

class Earth extends BaseObject {

    constructor(texture: HTMLCanvasElement) {
        super(texture);
        this.m_x = 50;
        this.m_y = 50;
        this.m_width = 64;//texture.width;
        this.m_height = 64;//texture.height;
        this.m_frameX = 0;
    }

    Update(value: number = 0): void {
        this.m_animTimer += 0.1;
        if (this.m_animTimer > 0.4) {
            this.m_frameX = (this.m_frameX + 1) % 15;
            this.m_animTimer = 0;
        }
    }

    public Draw(ctx: CanvasRenderingContext2D): void {
        ctx.beginPath();
        ctx.drawImage(this.m_texture, this.m_frameX * 64, 894, 64, 64, this.m_x, this.m_y, 64, 64);
        ctx.fill();

        //ctx.beginPath();
        //ctx.lineWidth = 1;
        //ctx.strokeStyle = "green";
        //ctx.rect(this.m_x, this.m_y, this.m_width, this.m_height);
        //ctx.stroke();
    }
}

export = Earth;