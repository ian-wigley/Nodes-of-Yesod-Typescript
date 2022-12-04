import BaseObject = require("BaseObject");
import ScreenInfo = require("ScreenInfo");

class Rocket extends BaseObject {

    private m_rocketScreen: number = 0;

    constructor(
        texture: HTMLCanvasElement,
        screenInfo: ScreenInfo
    ) {
        super(texture, screenInfo);
        this.m_y = 100;
        this.m_offsetX = 17 * 64;
        this.m_offsetY = 11 * 68;
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
        ctx.drawImage(this.m_texture, this.m_offsetX, this.m_offsetY, 64, 64, this.m_x, this.m_y, 64, 64);
    }

    public get RocketScreen(): number {
        return this.m_rocketScreen;
    }
}
export = Rocket;
