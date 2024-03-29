﻿import DirectionalEnemy = require("DirectionalEnemy");
import Rectangle = require("Rectangle");
import ScreenInfo = require("ScreenInfo");

class Fish extends DirectionalEnemy {
    constructor(
        x: number,
        y: number,
        speed: number,
        gameSprites: HTMLCanvasElement,
        wall: Array<Rectangle>,
        screenInfo: ScreenInfo
    ) {
        super(x, y, speed, gameSprites, wall, screenInfo);
        this.m_name = "Fish";
        this.m_offsetX = 0 * 64;
        this.m_offsetY = 9 * 69;
        this.m_imageIndex = 8 * 64;
        this.m_width = 34;
        this.m_height = 64;
    }

    public Update(): void {
        this.m_animTimer += 0.1;
        this.m_offsetX = this.m_frame * 64;
        if (this.m_animTimer > 0.4) {
            this.m_frame = (this.m_frame + 1) % 4;
            this.m_animTimer = 0;
        }
    }
}

export = Fish;