import Enemy = require("Enemy");
import Rectangle = require("Rectangle");
import ScreenInfo = require("ScreenInfo");

class SpringBear extends Enemy {

    private m_springBearRect!: Rectangle;

    constructor(
        x: number,
        y: number,
        speed: number,
        gameSprites: HTMLCanvasElement,
        wall: Array<Rectangle>,
        screenInfo: ScreenInfo
    ) {
        super(x, y, speed, gameSprites, wall, screenInfo);
        this.m_name = "SpringBear";
        this.m_offsetX = 15 * 64;
        this.m_offsetY = 5 * 69;
    }

    public Update(): void {
        this.m_animTimer += 0.1;
        if (this.m_animTimer > 0.4) {
            this.m_frame = (this.m_frame + 1) % 4;
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
        this.m_springBearRect = new Rectangle(this.m_x + 10, this.m_y, 64, 64, "springbear");

        //let springBearRect: any = { left: this.X, top: this.Y, right: 64, bottom: 64, Name: "springbear" };
        this.m_walls.forEach((platform: Rectangle) => {
            let v = this.m_springBearRect.Intersects(platform) && !triggered;
            if (v == true) {
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
        });

        // for (var i = 0; i < this.m_walls.length; i++) {
        //     if (this.m_springBearRect.Intersects(this.m_walls[i]) && !triggered) {
        //         triggered = true;
        //         if (this.m_speedX > 0) {
        //             this.m_x -= 5;
        //             this.m_speedX *= -1;
        //         }
        //         else {
        //             this.m_x += 5;
        //             this.m_speedX *= -1;
        //         }
        //     }
        // }
    }

    public Draw(ctx: CanvasRenderingContext2D): void {
        ctx.drawImage(this.m_texture, this.m_frame * 64 + this.m_offsetX, this.m_offsetY, 68, 68, this.m_x, this.m_y, 64, 64);
    }

    // public set Ledges(value: Array<Rectangle>) { this.m_platforms = value; }
    // public set Walls(value: Array<Rectangle>) { this.m_walls = value; }
}

export = SpringBear;