import BaseObject = require("BaseObject");

class Enemy extends BaseObject {

    protected m_speed: number;
    protected m_walls: number[];
    protected m_currentFrameY: number;
    protected m_sheetSize: number;
    protected m_timeSinceLastFrame: number;
    protected m_millisecondsPerFrame: number;
    protected m_facingLeft: boolean;
    protected m_turning: boolean;

    constructor(xpos: number, ypos: number, speedX: number, texture: HTMLCanvasElement, walls: number[]) {
        super(texture);

        this.m_speed = speedX;
        this.m_x = xpos;
        this.m_y = ypos;
        this.m_width = texture.width;
        this.m_height = texture.height;
        this.m_frameX = 0;
        this.m_frameY = 0;
        this.m_walls = walls;
        this.m_sheetSize = 8;
        this.m_timeSinceLastFrame = 0;
        this.m_millisecondsPerFrame = 100;
    }
}

export = Enemy;