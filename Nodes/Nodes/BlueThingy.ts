import Enemy = require("Enemy");
import Rectangle = require("Rectangle");

class BlueThingy extends Enemy {

    private m_blueThingRect: Rectangle;

    constructor(xpos: number, ypos: number, speedx: number, gamesprites: HTMLCanvasElement, wall: Array<Rectangle>) {
        super(xpos, ypos, speedx, gamesprites, wall);
        this.m_name = "BlueThingy";
    }

    public Update(): void {
        this.m_animTimer += 0.1;
        if (this.m_animTimer > 0.4) {
            this.m_frameX = (this.m_frameX + 1) % 7;
            this.m_animTimer = 0;
        }
        this.m_x += this.m_speedX;
        this.m_y += this.m_speedY;

        if (this.m_y > 400 ||
            this.m_y < 0) {
            this.m_speedY *= -1;
        }
        var triggered = false;
        this.m_blueThingRect = new Rectangle(this.m_x + 10, this.m_y, 64, 64);
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
        ctx.drawImage(this.m_texture, this.m_frameX * 64 + (12 * 64), 5 * 69, 68, 68, this.m_x, this.m_y, 64, 64);
    }
}

export = BlueThingy;