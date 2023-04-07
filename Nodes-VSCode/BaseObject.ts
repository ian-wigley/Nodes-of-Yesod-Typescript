import Rectangle = require("Rectangle");
import ScreenInfo = require("ScreenInfo");
import { direction } from "./Direction";

class BaseObject {

    protected m_texture: HTMLCanvasElement;
    protected m_walls: Array<Rectangle> = [];
    protected m_edibleWalls: Array<Rectangle> = [];
    protected m_x: number;
    protected m_y: number;
    protected m_width: number;
    protected m_height: number;
    protected m_frame: number;
    protected m_offsetX: number;
    protected m_offsetY: number;
    protected m_animTimer: number;
    protected m_charlieX: number = 0;
    protected m_charlieY: number = 0;
    protected m_speedX: number = 1.0;
    protected m_speedY: number = 1.0;
    protected m_direction = direction.FACE_RIGHT;
    protected m_debug: boolean = false;
    protected m_name: string;
    protected m_screen: ScreenInfo;

    constructor(
        texture: HTMLCanvasElement,
        screenInfo: ScreenInfo
    ) {
        this.m_texture = texture;
        this.m_screen = screenInfo;
        this.m_x = 0;
        this.m_y = 0;
        this.m_width = 0;
        this.m_height = 0;
        this.m_frame = 0;
        this.m_offsetX = 0;
        this.m_offsetY = 0;
        this.m_animTimer = 0;
        this.m_name = "";
    }

    public Reset(): void {
        this.m_x = 400;
        this.m_y = 50;
    }

    public Draw(ctx: CanvasRenderingContext2D): void { /* TODO document why this method 'Update' is empty */ }

    protected DrawDebugRectangle(ctx: CanvasRenderingContext2D): void {
        if (this.m_debug) {
            ctx.lineWidth = 1;
            ctx.strokeStyle = "green";
            ctx.rect(this.BoundingRectangle.left, this.BoundingRectangle.top, this.BoundingRectangle.Width, this.BoundingRectangle.Height);
            ctx.stroke();
        }
    }

    public set Debug(value: boolean) { this.m_debug = value; }
    public get X(): number { return this.m_x; }
    public set CharlieX(value: number) { this.m_charlieX = value; }
    public get Y(): number { return this.m_y; }
    public set CharlieY(value: number) { this.m_charlieY = value; }
    public set EdibleWalls(value: Array<Rectangle>) { this.m_edibleWalls = value; }
    public get BoundingRectangle(): Rectangle { return new Rectangle(this.m_x + 10, this.m_y, this.m_width, this.m_height, this.m_name); }
}

export = BaseObject;