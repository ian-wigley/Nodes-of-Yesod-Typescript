import Enemy = require("Enemy");

class BlueThingy extends Enemy {

    constructor(xpos: number, ypos: number, speedx: number, gamesprites: HTMLCanvasElement, wall: number[]) {
        super(xpos, ypos, speedx, gamesprites, wall);
        this.m_name = "BlueThingy";
    }

    public Update(): void {
        this.m_animTimer += 0.1;
        if (this.m_animTimer > 0.4) {
            this.m_frameX = (this.m_frameX + 1) % 7;
            this.m_animTimer = 0;
        }
        if (this.m_y > 366 || this.m_y < 0) {
            this.m_speedY *= -1;
        }

        if (this.m_x > 750 || this.m_x < 0) {
            this.m_x *= -1;
        }

        //// Wall Collision check
        //if (mWalls.Count > 0) {
        //    foreach(Rectangle wallRects in mWalls)
        //    {
        //        if (wallRects.X == 62) {
        //            if (mPositionX <= 100) {
        //                this.mSpeedX *= -1;
        //                mPositionX += 5;
        //            }
        //        }

        //        if (wallRects.X == 744) {
        //            if (mPositionX >= 700) {
        //                this.mSpeedX *= -1;
        //                mPositionX -= 5;
        //            }
        //        }
        //    }
        //}

        //// Platform Collision check
        //foreach(Rectangle platform in mPlatforms)
        //{
        //    if (enemyRect.Intersects(platform)) {
        //        if (this.mSpeedX > 0) {
        //            mPositionX -= 5;
        //            this.mSpeedX *= -1;
        //        }
        //        else {
        //            mPositionX += 5;
        //            this.mSpeedX *= -1;
        //        }
        //    }
        //}
    }

    public Draw(ctx: CanvasRenderingContext2D): void {
        ctx.beginPath();
        ctx.drawImage(this.m_texture, this.m_frameX * 64 + (12 * 64), 5 * 69, 68, 68, this.m_x, this.m_y, 64, 64);
    }
}

export = BlueThingy;
