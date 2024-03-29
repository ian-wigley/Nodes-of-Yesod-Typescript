﻿import DirectionalEnemy = require("DirectionalEnemy");
import Rectangle = require("Rectangle");
import ScreenInfo = require("ScreenInfo");

class Bird extends DirectionalEnemy {

    constructor(
        x: number,
        y: number,
        speed: number,
        gameSprites: HTMLCanvasElement,
        wall: Array<Rectangle>,
        screenInfo: ScreenInfo
    ) {
        super(x, y, speed, gameSprites, wall, screenInfo);
        this.m_name = "Bird";
        this.m_x = 180;
        this.m_y = y;
        this.m_width = 34;
        this.m_height = this.m_high;
        this.m_speed = 1;
        this.m_offsetX = 0;
        this.m_offsetY = 10 * this.m_high;
        this.m_imageIndex = 4 * this.m_wide;
    }

    public Update(): void {
        this.m_animTimer += 0.1;
        this.m_x += this.m_speed;
        this.m_offsetX = this.m_frame * this.m_wide;
        if (this.m_animTimer > 0.4) {
            this.m_frame = (this.m_frame + 1) % 4;
            this.m_animTimer = 0;
        }
        this.m_rectangle = new Rectangle(this.m_x + 10, this.m_y, this.m_width, this.m_height - 10, this.m_name);
        this.CheckWallCollisions();
    }
}

export = Bird;