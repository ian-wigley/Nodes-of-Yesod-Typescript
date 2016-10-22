import BaseObject = require("BaseObject");
import Rectangle = require("Rectangle");

class Charlie extends BaseObject {

    mSummerSaultJump: boolean = false;
    mDirection: boolean = false;
    summerSaultFrame: number = 0;
    m_falling: boolean = false;

    constructor(xpos: number, ypos: number, speedx: number, texture: HTMLCanvasElement, wall: number[]) {

        super(texture);
        this.m_x = xpos;
        this.m_y = ypos;
        this.m_width = texture.width;
        this.m_height = texture.height;
        this.m_frameX = 1;
    }

    Update(value: number): void {

        // Walk Left
        if (value == 0 && !this.mSummerSaultJump) {
            this.m_x -= 5;
            this.mDirection = false;
            this.m_frameX = (this.m_frameX + 1) % 8;
        }
        // Walk Right
        else if (value == 1 && !this.mSummerSaultJump) {
            this.m_x += 5;
            this.mDirection = true;
            this.m_frameX = (this.m_frameX + 1) % 8;
        }

        if (this.mSummerSaultJump == true) {
            if (this.m_frameX < 7) {
                this.m_y -= 5;
            }
            else if (this.m_frameX > 7)// && this.m_frame < 16)
            {
                this.m_y += 5;
            }

            // Somersault jump left 
            if (this.mDirection && this.m_frameX < 16) {
                this.m_x += 1;
                this.summerSaultFrame = 70;
                this.m_frameX += 1;
            }
            // Somersault jump right
            else if (!this.mDirection && this.m_frameX < 16) {
                this.m_x -= 1;
                this.summerSaultFrame = 70 + 69;
                this.m_frameX += 1;
            }

            if (this.m_frameX == 15) {
                this.mSummerSaultJump = false;
                this.summerSaultFrame = 0;
                this.m_frameX = 0;
            }

            if (this.m_falling) {
                this.m_y += 1;
            }

            // if (this.mJumpright) {
            // this.m_x  += 2;
            // }
            // else {
            // this.m_x  -= 2;
            // }
            // if (this.summerSaultFrame < 8 && !this.mTrip) {
            // this.m_y -= 10;
            // }
            // else if (this.summerSaultFrame >= 8 && this.summerSaultFrame < 16 && this.mTrip) {
            // this.m_y += 10;
            // }

            // animTimer += elapsedSecs;
            // if (animTimer > 0.2) {
            // animTimer = 0;
            // this.summerSaultFrame++;
            // }


            //        summerSaultRect = new Rectangle((int)summerSaultFrame * spriteWidth, (int)1 * spriteHeight, spriteWidth, spriteHeight);

            // if (this.summerSaultFrame >= 16) {
            // this.summerSaultFrame = 0;
            // this.mSummerSaultJump = false;
            // if (this.belowMoon) {
            // //                       YPosition = 366;
            // }
            //}
        }
    }

    public Draw(ctx: CanvasRenderingContext2D): void {

        ctx.beginPath();

        if (!this.mDirection && !this.mSummerSaultJump) {
            ctx.drawImage(this.m_texture, this.m_frameX * 64 + (11 * 64), this.summerSaultFrame, 64, 64, this.m_x, this.m_y, 64, 64);
            ctx.fill();
        }
        if (!this.mDirection && this.mSummerSaultJump) {
            ctx.drawImage(this.m_texture, this.m_frameX * 64, this.summerSaultFrame, 64, 64, this.m_x, this.m_y, 64, 64);
            ctx.fill();
        }

        else if (this.mDirection && !this.mSummerSaultJump || this.mDirection && this.mSummerSaultJump) {
            ctx.drawImage(this.m_texture, this.m_frameX * 64, this.summerSaultFrame, 64, 64, this.m_x, this.m_y, 64, 64);
            ctx.fill();
        }
        ctx.fill();
    }

    public get X(): number {
        return this.m_x;
    }

    public set X(value: number) {
        this.m_x = value;
    }

    public get Y(): number {
        return this.m_y;
    }

    public get Rectangle(): Rectangle {
        return new Rectangle(this.m_x, this.m_y, 64, 64);
    }

    public set Falling(value: boolean) {
        this.m_falling = value;
    }
}

export = Charlie;