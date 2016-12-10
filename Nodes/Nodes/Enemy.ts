import BaseObject = require("BaseObject");
import Rectangle = require("Rectangle");

class Enemy extends BaseObject {

    protected m_speed: number;
    protected m_walls: Array<Rectangle>;
    protected m_platforms: Array<Rectangle>;
    protected m_currentFrameY: number;
    protected m_sheetSize: number;
    protected m_timeSinceLastFrame: number;
    protected m_millisecondsPerFrame: number;
    protected m_turning: boolean;

    constructor(xpos: number, ypos: number, speedX: number, texture: HTMLCanvasElement, walls: Array<Rectangle>) {
        super(texture);
        this.m_speed = speedX;
        this.m_x = xpos;
        this.m_y = ypos;
        this.m_width = texture.width;
        this.m_height = texture.height;
        this.m_frame = 0;
        this.m_offsetX = 0;
        this.m_offsetY = 0;
        this.m_walls = walls;
        this.m_sheetSize = 8;
        this.m_timeSinceLastFrame = 0;
        this.m_millisecondsPerFrame = 100;
    }

    public Update(): void { }

    public get Name(): string { return this.m_name; }
    public set Walls(value: Array<Rectangle>) { this.m_walls = value; }
    public set Ledges(value: Array<Rectangle>) { this.m_platforms = value; }
}

export = Enemy;