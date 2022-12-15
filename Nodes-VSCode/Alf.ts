import Enemy = require("Enemy");
import Rectangle = require("Rectangle");
import ScreenInfo = require("ScreenInfo");

class Alf extends Enemy {

    private m_alfRect!: Rectangle;

    constructor(
        x: number,
        y: number,
        speed: number,
        gameSprites: HTMLCanvasElement,
        wall: Array<Rectangle>,
        screenInfo: ScreenInfo
    ) {
        super(x, y, speed, gameSprites, wall, screenInfo);
        this.m_name = "Alf";
        this.m_x = x;
        this.m_y = y;
        this.m_width = 34;
        this.m_height = 64;
        this.m_speed = speed;
        this.m_offsetX = 0 * 64;
        this.m_offsetY = 5 * 69;
    }

    public Update(): void {
        this.m_animTimer += 0.1;
        this.m_x += this.m_speed;
        if (this.m_animTimer > 0.4) {
            this.m_frame = (this.m_frame + 1) % 7;
            this.m_animTimer = 0;
        }
        if (this.m_x >= 700) {
            this.m_speed *= -1;
            this.m_facingLeft = true;
        }
        else if (this.m_x < 0) {
            this.m_speed *= -1;
            this.m_facingLeft = false;
        }
        let triggered = false;
        this.m_alfRect = new Rectangle(this.m_x + 10, this.m_y, this.m_width, this.m_height, "alf");
        for (const element of this.m_walls) {
            if (this.m_alfRect.Intersects(element) && !triggered) {
                triggered = true;
                if (this.m_speed > 0) {
                    this.m_x -= 5;
                    this.m_speed *= -1;
                    this.m_facingLeft = true;
                }
                else {
                    this.m_x += 5;
                    this.m_speed *= -1;
                    this.m_facingLeft = false;
                }
            }
        }
    }

    public Draw(ctx: CanvasRenderingContext2D): void {
        if (!this.m_facingLeft) {
            ctx.drawImage(this.m_texture, this.m_frame * 64 + this.m_offsetX, this.m_offsetY, 68, 68, this.m_x, this.m_y, 64, 64);
        }
        else {
            ctx.drawImage(this.m_texture, this.m_frame * 64 + this.m_offsetX, this.m_offsetY + 69, 68, 68, this.m_x, this.m_y, 64, 64);
        }
    }
}

export = Alf;  