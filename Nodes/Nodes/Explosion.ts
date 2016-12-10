import BaseObject = require("BaseObject");

class Explosion extends BaseObject {

    private m_active: boolean;
    constructor(texture: HTMLCanvasElement) {
        super(texture);
        this.m_name = "Explosion";
        this.m_offsetX = 3 * 64;
        this.m_offsetY = 10 * 69;
        this.m_active = false;
    }

    public Update(): void {
        this.m_animTimer += 0.1;
        if (this.m_animTimer > 0.7) {
            this.m_frame = (this.m_frame + 1) % 3;
            this.m_animTimer = 0;
        }
        if (this.m_frame == 2) {
            this.m_active = false;
            this.m_frame = 0;
        }
    }

    public Draw(ctx: CanvasRenderingContext2D): void {
        ctx.beginPath();
        //this.m_x = this.CharlieX + 20;
        //this.m_y = this.CharlieY + 20;
        ctx.drawImage(this.m_texture, this.m_frame * 64 + this.m_offsetX, this.m_offsetY, 68, 68, this.m_x, this.m_y, 64, 64);
    }

    public get Actived(): boolean { return this.m_active; }
    public set Actived(value: boolean) { this.m_active = value; }
}

export = Explosion;