import DirectionalEnemy = require("DirectionalEnemy");
import Rectangle = require("Rectangle");
import ScreenInfo = require("ScreenInfo");
import { direction } from "./Direction";

class Caterpillar extends DirectionalEnemy {
    constructor(
        x: number,
        y: number,
        speed: number,
        gameSprites: HTMLCanvasElement,
        wall: Array<Rectangle>,
        screenInfo: ScreenInfo
    ) {
        super(x, y, speed, gameSprites, wall, screenInfo);
        this.m_name = "Caterpillar";
        this.m_offsetX = 0 * 64;
        this.m_offsetY = 17 * 69;
        this.m_imageIndex = 8 * 64;
        this.m_width = 34;
        this.m_height = 64;
    }

    public Update(): void {
        this.m_animTimer += 0.1;
        this.m_x += this.m_speed;
        this.m_offsetX = this.m_frame * 64;
        if (this.m_animTimer > 0.4) {
            this.m_frame = (this.m_frame + 1) % 7;
            this.m_animTimer = 0;
        }
        if (this.m_x >= 700) {
            this.m_speed *= -1;
            this.m_direction = direction.FACE_LEFT;
        }
        else if (this.m_x < 0) {
            this.m_speed *= -1;
            this.m_direction = direction.FACE_RIGHT;
        }
    }
}

export = Caterpillar;