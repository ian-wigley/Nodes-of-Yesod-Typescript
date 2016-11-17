import BaseObject = require("BaseObject");
import Rectangle = require("Rectangle");

class Mole extends BaseObject {
    constructor(xpos: number, ypos: number, speedx: number, texture: HTMLCanvasElement, walls: Array<Rectangle>, platforms: Array<Rectangle>, debug: boolean) {
        super(texture);
        this.m_debug = debug;
    }

    public Update(): void {
        this.m_animTimer += 0.1;
        if (this.m_animTimer > 0.4) {
            this.m_frameX = (this.m_frameX + 1) % 8;
            this.m_animTimer = 0;
        }
    }

    public UpdatePosition(value: number): void {
        if (value == 0) {
            this.m_x -= 4;
        }
        if (value == 1) {
            this.m_x += 4;
        }
    }

    public Draw(ctx: CanvasRenderingContext2D): void {
        ctx.beginPath();
        ctx.drawImage(this.m_texture, this.m_frameX * 64, 12 * 69, 68, 68, this.m_x, this.m_y, 64, 64);
        if (this.m_debug) {
            ctx.font = "12px SpaceAge";
            ctx.fillStyle = "yellow";
            ctx.fillText("Mole x : " + this.m_x, 10, 90);
        }
    }

    public set X(value: number) { this.m_x = value; }
    public set Y(value: number) { this.m_y = value; }

}
export = Mole; 