import Enemy = require("Enemy");
import Rectangle = require("Rectangle");
import ScreenInfo = require("ScreenInfo");

class BlueThingy extends Enemy {

    private m_blueThingRect!: Rectangle;

    constructor(
        x: number,
        y: number,
        speed: number,
        gameSprites: HTMLCanvasElement,
        wall: Array<Rectangle>,
        screenInfo: ScreenInfo
    ) {
        super(x, y, speed, gameSprites, wall, screenInfo);
        this.m_name = "BlueThingy";
        this.m_offsetX = 12 * 64;
        this.m_offsetY = 6 * 69;
        this.m_width = 34;//64
        this.m_height = 64;
    }

    public Update(): void {
        this.m_animTimer += 0.1;
        if (this.m_animTimer > 0.4) {
            this.m_frame = (this.m_frame + 1) % 7;
            this.m_animTimer = 0;
        }
        this.m_x += this.m_speedX;
        this.m_y += this.m_speedY;

        if (this.m_y > this.m_screen.Bottom || this.m_y < this.m_screen.Top) {
            this.m_speedY *= -1;
        }

        if (this.m_x > this.m_screen.Right || this.m_x < this.m_screen.Left) {
            this.m_speedX *= -1;
        }


        var triggered = false;
        this.m_blueThingRect = new Rectangle(this.m_x + 10, this.m_y, 64, 64, "bluethingy");
        for (var i = 0; i < this.m_walls.length; i++) {
            if (this.m_blueThingRect.Intersects(this.m_walls[i]) && !triggered) {
                triggered = true;
                if (this.m_speedX > 0) {
                    this.m_x -= 5;
                    this.m_speedX *= -1;
                }
                else {
                    this.m_x += 5;
                    this.m_speedX *= -1;
                }
            }
        }
    }

    public Draw(ctx: CanvasRenderingContext2D): void {
        ctx.beginPath();
        ctx.drawImage(this.m_texture, this.m_frame * 64 + this.m_offsetX, this.m_offsetY, 68, 68, this.m_x, this.m_y, 64, 64);
    }
}

export = BlueThingy;