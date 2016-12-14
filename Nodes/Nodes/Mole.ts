import BaseObject = require("BaseObject");
import Rectangle = require("Rectangle");

class Mole extends BaseObject {

    private m_moleRect: Rectangle;
    private m_screenCounter: number = 0;
    private m_belowScreenCounter: number = 0;
    private m_undergroundScreenCounter: number = 0;
    private m_levels: number[][];

    constructor(xpos: number, ypos: number, speedx: number, texture: HTMLCanvasElement, walls: Array<Rectangle>, ediblewalls: Array<Rectangle>, platforms: Array<Rectangle>, levels: number[][], debug: boolean) {
        super(texture);
        this.m_debug = debug;
        this.m_walls = walls;
        this.m_edibleWalls = ediblewalls;
        this.m_levels = levels;
        this.m_offsetX = 0 * 64;
        this.m_offsetY = 11 * 69;
    }

    public Update(): void {
        this.m_animTimer += 0.1;
        if (this.m_animTimer > 0.4) {
            this.m_frame = (this.m_frame + 1) % 8;
            this.m_animTimer = 0;
        }
    }

    public UpdatePosition(value: number): void {
        if (value == 0) {
            this.m_x -= 4;
            this.m_facingLeft = true;
        }
        if (value == 1) {
            this.m_x += 4;
            this.m_facingLeft = false;
        }
        if (value == 2) {
            this.m_y -= 4;
        }
        if (value == 3) {
            this.m_y += 4;
        }

        var triggered = false;
        this.m_moleRect = new Rectangle(this.m_x + 10, this.m_y, this.m_width, this.m_height);
        for (var i = 0; i < this.m_walls.length; i++) {
            if (this.m_moleRect.Intersects(this.m_walls[i]) && !triggered) {
                triggered = true;
                if (this.m_facingLeft) {
                    this.m_x += 4;
                }
                else {
                    this.m_x -= 4;
                }
                //if (this.m_speed > 0) {
                //    this.m_x -= 5;
                //    this.m_speed *= -1;
                //    this.m_facingLeft = true;
                //}
                //else {
                //    this.m_x += 5;
                //    this.m_speed *= -1;
                //    this.m_facingLeft = false;
                //}
            }
        }

        for (var i = 0; i < this.m_edibleWalls.length; i++) {
            if (this.m_moleRect.Intersects(this.m_edibleWalls[i]) && !triggered) {
                triggered = true;
                var span = this.m_belowScreenCounter * 10;
                for (var i = span; i < span + 13; i++) {
                    if (this.m_x < 100) {
                        if (this.m_levels[i][1] == 15 || this.m_levels[i][1] == 17) {
                            // replace the edible walls with empty sections
                            this.m_levels[i][1] = 4;
                            if (this.m_screenCounter > 0) {
                                this.m_levels[(i - 10)][12] = 4;
                            }
                            else {
                                this.m_levels[(i + 150)][12] = 4;
                            }
                        }
                    }
                    else {
                        if (this.m_x > 650) {
                            if (this.m_levels[i][12] == 16 || this.m_levels[i][12] == 18) {
                                this.m_levels[i][12] = 4;
                            }
                        }
                    }
                }
            }
        }
    }

    public Draw(ctx: CanvasRenderingContext2D): void {
        ctx.beginPath();
        if (!this.m_facingLeft) {
            ctx.drawImage(this.m_texture, this.m_frame * 64, this.m_offsetY, 68, 68, this.m_x, this.m_y, 64, 64);
        }
        else {
            ctx.drawImage(this.m_texture, this.m_frame * 64, this.m_offsetY + 69, 68, 68, this.m_x, this.m_y, 64, 64);
        }
        if (this.m_debug) {
            ctx.font = "12px SpaceAge";
            ctx.fillStyle = "yellow";
            ctx.fillText("Mole x : " + this.m_x, 10, 90);
        }
    }

    public set X(value: number) { this.m_x = value; }
    public set Y(value: number) { this.m_y = value; }
    public set ScreenCounter(value: number) { this.m_screenCounter = value; }
    public set BelowScreenCounter(value: number) { this.m_belowScreenCounter = value; }
    public set Walls(value: Array<Rectangle>) { this.m_walls = value; }
    public set EdibleWalls(value: Array<Rectangle>) { this.m_edibleWalls = value; }
}
export = Mole; 