﻿import Rectangle = require("Rectangle");
import ScreenInfo = require("ScreenInfo");
import NonDirectionalEnemy = require("./NonDirectionalEnemy");

class Plant extends NonDirectionalEnemy {

    private m_spawnTimer: number = 0;

    constructor(
        x: number,
        y: number,
        speed: number,
        gameSprites: HTMLCanvasElement,
        wall: Array<Rectangle>,
        screenInfo: ScreenInfo
    ) {
        super(x, y, speed, gameSprites, wall, screenInfo);
        this.m_name = "Plant";
        this.m_offsetX = 0;
        this.m_offsetY = 14 * 69;
        this.m_width = 34;
        this.m_height = 64;
        this.m_spawnTimer = Math.floor(Math.random() * 100);
    }

    public Update(): void {
        if (this.m_spawnTimer == 0) {
            this.m_offsetX = this.m_frame * 64;
            this.m_animTimer += 0.1;
            if (this.m_animTimer > 2.4) {
                this.m_frame = (this.m_frame + 1) % 8;
                this.m_animTimer = 0;
            }
        }
        else {
            this.m_spawnTimer -= 1;
        }
    }
}
export = Plant;