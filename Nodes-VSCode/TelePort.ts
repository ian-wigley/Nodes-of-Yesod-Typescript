import NonDirectionalEnemy = require("NonDirectionalEnemy");
import Rectangle = require("Rectangle");
import ScreenInfo = require("ScreenInfo");

class TelePort extends NonDirectionalEnemy {
    private m_warpTo?: number;

    constructor(
        x: number,
        y: number,
        speed: number,
        gameSprites: HTMLCanvasElement,
        wall: Array<Rectangle>,
        screenInfo: ScreenInfo,
        warpTo?: number
    ) {
        super(x, y, speed, gameSprites, wall, screenInfo);
        this.m_name = "TelePort";
        this.m_x = x;
        this.m_y = y;
        this.m_width = 34;
        this.m_height = 64;
        this.m_speed = speed;
        this.m_warpTo = warpTo;
        this.m_offsetX = 0;
        this.m_offsetY = 24 * 69;
    }

    public Update(): void {
        this.m_animTimer += 0.1;
        this.m_offsetX = this.m_frame * 64;
        if (this.m_animTimer > 0.4) {
            this.m_frame = (this.m_frame + 1) % 3;
            this.m_animTimer = 0;
        }
    }
}
export = TelePort;