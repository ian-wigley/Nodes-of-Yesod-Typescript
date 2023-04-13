import Rectangle = require("Rectangle");
import ScreenInfo = require("ScreenInfo");
import DirectionalEnemy = require("./DirectionalEnemy");

class Alf extends DirectionalEnemy {

    constructor(
        x: number,
        y: number,
        speed: number,
        gameSprites: HTMLCanvasElement,
        wall: Array<Rectangle>,
        screenInfo: ScreenInfo
    ) {
        super(x, y, speed, gameSprites, wall, screenInfo);
        this.m_name = "Alf";
        this.m_x = x;
        this.m_y = y;
        this.m_width = 34;
        this.m_height = this.m_high;
        this.m_speed = speed;
        this.m_offsetX = 0;
        this.m_offsetY = 6 * this.m_high;
        this.m_imageIndex = 14 * this.m_wide;
    }

    public Update(): void {
        this.m_animTimer += 0.1;
        this.m_x += this.m_speed;
        this.m_offsetX = this.m_frame * this.m_wide;
        if (this.m_animTimer > 1.4) {
            this.m_frame = (this.m_frame + 1) % 7;
            this.m_animTimer = 0;
        }
        this.m_rectangle = new Rectangle(this.m_x + 10, this.m_y, this.m_width, this.m_height, this.m_name);
        this.CheckWallCollisions();
    }
}

export = Alf;