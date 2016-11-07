import BaseObject = require("BaseObject");

class Rocket extends BaseObject {

    private m_rocketScreen: number = 0;

    constructor(texture: HTMLCanvasElement) {
        super(texture);
        this.m_y = 100;
        this.m_frameX = 16;
        this.m_frameY = 64;
    }

    public Update(): void {
        if (this.m_x >= 0 && this.m_x <= 800) {
            this.m_x += 1;
        }
        if (this.m_x >= 801) {
            this.m_x = 0;
            this.m_rocketScreen = (this.m_rocketScreen + 1) % 15;
        }
    }

    public Draw(ctx: CanvasRenderingContext2D): void {
        ctx.beginPath();
        ctx.drawImage(this.m_texture, 17 * 64, 9 * 68, 64, 64, this.m_x, this.m_y, 64, 64);
    }

    public get RocketScreen(): number {
        return this.m_rocketScreen;
    }
}
export = Rocket;
