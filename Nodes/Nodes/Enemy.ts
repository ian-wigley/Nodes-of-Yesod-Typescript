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
    protected m_facingLeft: boolean;
    protected m_turning: boolean;
    protected m_name: string;

    constructor(xpos: number, ypos: number, speedX: number, texture: HTMLCanvasElement, walls: Array<Rectangle>) {
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
        this.m_name = "";
    }

    public Update(): void { }

    public get Name(): string { return this.m_name; }
    public set Walls(value: Array<Rectangle>) { this.m_walls = value; }

}

export = Enemy;