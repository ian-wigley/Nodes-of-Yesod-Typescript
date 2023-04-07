import BaseObject = require("BaseObject");
import Rectangle = require("Rectangle");
import ScreenInfo = require("ScreenInfo");
import { direction } from "./Direction";

class Enemy extends BaseObject {

    protected m_speed: number;
    protected m_walls: Array<Rectangle> = [];
    protected m_platforms: Array<Rectangle> = [];
    protected m_currentFrameY: number;
    protected m_sheetSize: number;
    protected m_timeSinceLastFrame: number;
    protected m_millisecondsPerFrame: number;
    protected m_turning: boolean;
    protected m_rectangle!: Rectangle;
    // Index into sprite sheet
    protected m_imageIndex: number;

    constructor(
        x: number,
        y: number,
        speedX: number,
        texture: HTMLCanvasElement,
        walls: Array<Rectangle>,
        screenInfo: ScreenInfo
    ) {
        super(texture, screenInfo);
        this.m_speed = speedX;
        this.m_x = x;
        this.m_y = y;
        this.m_width = texture.width;
        this.m_height = texture.height;
        this.m_frame = 0;
        this.m_offsetX = 0;
        this.m_offsetY = 0;
        this.m_imageIndex = 0;
        this.m_walls = walls;
        this.m_sheetSize = 8;
        this.m_timeSinceLastFrame = 0;
        this.m_millisecondsPerFrame = 100;
        this.m_currentFrameY = 0;
        this.m_turning = false;
    }

    public Update(): void { /* TODO document why this method 'Update' is empty */ }

    protected CheckWallCollisions(): void {
        let triggered = false;
        for (const element of this.m_walls) {
            triggered = this.CheckIntersection(element, triggered);
        }
        triggered = false;
        for (const element of this.m_edibleWalls) {
            triggered = this.CheckIntersection(element, triggered);
        }

        // If there are no walls
        if (this.m_x >= 801) {
            this.TurnLeft();
        }
        else if (this.m_x < 0) {
            this.TurnRight();
        }
    }

    protected CheckIntersection(element: any, triggered: boolean): boolean {
        if (this.m_rectangle.Intersects(element) && !triggered) {
            triggered = true;
            if (this.m_speed > 0) {
                this.TurnLeft();
            }
            else {
                this.TurnRight();
            }
        }
        return triggered;
    }

    protected TurnRight(): void {
        this.m_x += 5;
        this.m_speed *= -1;
        this.m_direction = direction.FACE_RIGHT;
    }

    protected TurnLeft(): void {
        this.m_x -= 5;
        this.m_speed *= -1;
        this.m_direction = direction.FACE_LEFT;
    }

    public get Name(): string { return this.m_name; }

}

export = Enemy;