import BaseObject = require("BaseObject");
import Rectangle = require("Rectangle");
import ScreenInfo = require("ScreenInfo");
import ResourceManager = require("./ResourceManager");
import { direction } from "./Direction";

class Mole extends BaseObject {

    private m_moleRect!: Rectangle;
    private m_screenCounter: number = 0;
    private m_underground: boolean;
    private m_resourceManager: ResourceManager;
    private m_moleScreen: number = 0;

    constructor(
        texture: HTMLCanvasElement,
        screenInfo: ScreenInfo,
        resourceManager: ResourceManager
    ) {
        super(texture, screenInfo);
        this.m_underground = false;
        this.m_offsetX = 0;
        this.m_offsetY = 12 * 69;
        this.m_width = 40;
        this.m_height = 40;
        this.m_name = "Mole";
        this.m_resourceManager = resourceManager;
        this.m_moleScreen = Math.floor(Math.random() * 15);
    }

    public Update(): void {
        this.m_animTimer += 0.1;
        if (this.m_animTimer > 0.4) {
            this.m_frame = (this.m_frame + 1) % 8;
            this.m_animTimer = 0;
        }
        if (!this.m_underground) {
            this.m_x = 230;
            this.m_y = 260;
        }
    }

    public UpdatePosition(value: number): void {
        if (value == 0 && this.m_x > this.m_screen.Left) {
            this.m_x -= 4;
            this.m_direction = direction.FACE_LEFT;
        }
        if (value == 1 && this.m_x < this.m_screen.Right) {
            this.m_x += 4;
            this.m_direction = direction.FACE_RIGHT;
        }
        if (value == 2 && this.m_y > this.m_screen.Top) {
            this.m_y -= 4;
        }
        if (value == 3 && this.m_y < this.m_screen.Bottom) {
            this.m_y += 4;
        }
        this.CheckWallCollisions();
    }

    private CheckWallCollisions():void{
        let triggered = false;
        this.m_moleRect = new Rectangle(this.m_x + 10, this.m_y, this.m_width, this.m_height, this.m_name);
        for (const element of this.m_walls) {
            if (this.m_moleRect.Intersects(element) && !triggered) {
                triggered = true;
                if (this.m_direction == direction.FACE_LEFT) {
                    this.m_x += 4;
                }
                else {
                    this.m_x -= 4;
                }
            }
        }

        for (const element of this.m_edibleWalls) {
            if (this.m_moleRect.Intersects(element) && !triggered) {
                triggered = true;
                // Get the identifier numbers that relate to the tiles to turn off
                let t = element.tileIds;
                let u = element.otherScreen;
                let v = element.otherTiles;
                this.m_resourceManager.TurnOffEdibleWallChunks(this.m_screenCounter, t, u, v);
            }
        }
    }

    public Draw(ctx: CanvasRenderingContext2D): void {

        if (!this.m_underground) {
            ctx.drawImage(this.m_texture, this.m_frame * 64, this.m_offsetY, 68, 68, this.m_x, this.m_y, 64, 64);
        }
        else if (this.m_direction == direction.FACE_RIGHT) {
            ctx.drawImage(this.m_texture, this.m_frame * 64, this.m_offsetY, 68, 68, this.m_x, this.m_y, 64, 64);
        }
        else {
            ctx.drawImage(this.m_texture, this.m_frame * 64, this.m_offsetY + 69, 68, 68, this.m_x, this.m_y, 64, 64);
        }
        this.DrawDebugRectangle(ctx);
    }

    public get X(): number { return this.m_x; }
    public set X(value: number) { this.m_x = value; }
    public get Y(): number { return this.m_y; }
    public set Y(value: number) { this.m_y = value; }
    public set ScreenCounter(value: number) { this.m_screenCounter = value; }
    public get MoleScreen(): number { return 0; } //this.m_moleScreen; }
    public set Underground(value: boolean) { this.m_underground = value; }
    public set Walls(value: Array<Rectangle>) { this.m_walls = value; }
    public set EdibleWalls(value: Array<Rectangle>) { this.m_edibleWalls = value; }
    public set Direction(value: direction) { this.m_direction = value; }
}
export = Mole;