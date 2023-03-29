import NonDirectionalEnemy = require("NonDirectionalEnemy");
import Rectangle = require("Rectangle");
import ScreenInfo = require("ScreenInfo");

class ChasingEnemy extends NonDirectionalEnemy {
    constructor(
        x: number,
        y: number,
        speed: number,
        gameSprites: HTMLCanvasElement,
        wall: Array<Rectangle>,
        screenInfo: ScreenInfo
    ) {
        super(x, y, speed, gameSprites, wall, screenInfo);
        this.m_name = "ChasingEnemy";
        this.m_offsetX = 0;
        this.m_offsetY = 11 * 69;
        this.m_width = 34;
        this.m_height = 64;
        this.m_debug = false;
    }

    public Update(): void {
        this.m_animTimer += 0.1;
        this.m_offsetX = this.m_frame * 64;
        if (this.m_animTimer > 0.4) {
            this.m_frame = (this.m_frame + 1) % 3;
            this.m_animTimer = 0;
        }
        if (this.m_charlieX < this.m_x) {
            this.m_x -= this.m_speedX;
        }
        else if (this.m_charlieX > this.m_x) {
            this.m_x += this.m_speedX;
        }

        if (this.m_charlieY < this.m_y) {
            this.m_y -= this.m_speedY;
        }
        else if (this.m_charlieY > this.m_y) {
            this.m_y += this.m_speedY;
        }
    }
}

export = ChasingEnemy;