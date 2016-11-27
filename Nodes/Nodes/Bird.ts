import Enemy = require("Enemy");
import Rectangle = require("Rectangle");

class Bird extends Enemy {

    private m_birdRect: Rectangle;

    constructor(xpos: number, ypos: number, speedx: number, gamesprites: HTMLCanvasElement, wall: Array<Rectangle>) {
        super(xpos, ypos, speedx, gamesprites, wall);
        this.m_name = "Bird";
        this.m_x = 180;
        this.m_y = 420;
        this.m_width = 34;//64
        this.m_height = 64;
        this.m_speed = 1;
        this.m_facingLeft = false;
        this.m_offsetX = 4 * 64;
        this.m_offsetY = 9 * 69;
    }

    public Update(): void {
        this.m_animTimer += 0.1;
        this.m_x += this.m_speed;
        if (this.m_animTimer > 0.4) {
            this.m_frame = (this.m_frame + 1) % 4;
            this.m_animTimer = 0;
        }
        var triggered = false;
        this.m_birdRect = new Rectangle(this.m_x + 10, this.m_y, this.m_width, this.m_height);
        for (var i = 0; i < this.m_walls.length; i++) {
            if (this.m_birdRect.Intersects(this.m_walls[i]) && !triggered ){
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
        ctx.beginPath();
        if (!this.m_facingLeft) {
            ctx.drawImage(this.m_texture, (this.m_frame + 4) * 64, this.m_offsetY, 68, 68, this.m_x, this.m_y, 64, 64);
        }
        else {
            ctx.drawImage(this.m_texture, (this.m_frame + 8) * 64, this.m_offsetY, 68, 68, this.m_x, this.m_y, 64, 64);
        }
    }
}

export = Bird; 