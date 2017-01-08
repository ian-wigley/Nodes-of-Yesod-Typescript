import Enemy = require("Enemy");
import Rectangle = require("Rectangle");
import ScreenInfo = require("ScreenInfo");

class Alf extends Enemy {

    private m_alfRect: Rectangle;

    constructor(xpos: number, ypos: number, speedx: number, gamesprites: HTMLCanvasElement, wall: Array<Rectangle>, screenInfo: ScreenInfo) {
        super(xpos, ypos, speedx, gamesprites, wall, screenInfo);
        this.m_name = "Alf";
        this.m_x = 180;
        this.m_y = 420;
        this.m_width = 34;
        this.m_height = 64;
        this.m_speed = 1;
        this.m_offsetX = 0 * 64;
        this.m_offsetY = 5 * 69;
    }

    public Update(): void {
        this.m_animTimer += 0.1;
        if (this.m_animTimer > 0.4) {
            this.m_frame = (this.m_frame + 1) % 7;
            this.m_animTimer = 0;
        }
        var triggered = false;
        this.m_alfRect = new Rectangle(this.m_x + 10, this.m_y, this.m_width, this.m_height, "alf");
        for (var i = 0; i < this.m_walls.length; i++) {
            if (this.m_alfRect.Intersects(this.m_walls[i]) && !triggered) {
                triggered = true;
                if (this.m_speed > 0) {
                    this.m_x -= 5;
                    this.m_speed *= -1;
                }
                else {
                    this.m_x += 5;
                    this.m_speed *= -1;
                }
            }
        }
    }

    public Draw(ctx: CanvasRenderingContext2D): void {
        ctx.beginPath();
        if (!this.m_facingLeft) {
            ctx.drawImage(this.m_texture, this.m_frame * 64 + this.m_offsetX, this.m_offsetY, 68, 68, this.m_x, this.m_y, 64, 64);
        }
        else {
            ctx.drawImage(this.m_texture, this.m_frame * 64 + this.m_offsetX, this.m_offsetY + 69, 68, 68, this.m_x, this.m_y, 64, 64);
        }
    }
}

export = Alf;  