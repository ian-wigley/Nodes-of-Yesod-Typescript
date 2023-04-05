import BaseObject = require("BaseObject");
import Rectangle = require("Rectangle");
import ScreenInfo = require("ScreenInfo");
import { direction } from "./Direction";
import { charliesState } from "./CharliesState";

class Charlie extends BaseObject {

    private m_facing: direction = direction.FACE_RIGHT;

    private m_somerSaultJump: boolean = false;
    private m_falling: boolean = false;
    private m_initialised: boolean = false;
    private m_walkingOnFloor: boolean = false;
    private m_belowSurface: boolean = false;
    private m_jump: boolean = false;
    private m_sittingDown: boolean = false;
    private m_jumpStarted: boolean = false;
    private m_jumpingUp: boolean = false;

    //https://csanyk.com/2012/10/game-maker-wave-motion-tutorial/
    private m_landingVal: number = 0;
    private m_startFrame: number = 16;
    private m_startYPosition: number = 0;
    private m_screenCounter: number = 0;
    private m_amplitude: number = 185;//125
    private m_shift: number = 0;
    private m_t: number = 0;//6;
    private m_increment: number = 10 * Math.PI / 180;//12

    private plats: Array<Rectangle>;

    private testingRect: Rectangle;

    constructor(
        x: number,
        y: number,
        texture: HTMLCanvasElement,
        screenInfo: ScreenInfo
    ) {
        super(texture, screenInfo);
        this.m_x = x;
        this.m_y = y;
        this.m_width = 34;
        this.m_height = 64;
        this.m_frame = 1;
        this.plats = new Array<Rectangle>();
        this.testingRect = new Rectangle(0, 0, 0, 0);
    }

    // Values:
    // 0 - nothing ! 1 - left ! 2 - right ! 3 - standard jump
    public Update(value: number): void {
        this.m_animTimer += 0.1;
        this.m_landingVal = !this.m_belowSurface ? 320 : this.m_y;
        this.UpdateWalking(value);
        this.UpdateJumping(value);
        this.UpdateSomersault(value);
    }

    private UpdateWalking(value: number): void {
        // Walk Left
        if (value == 1 && !this.m_somerSaultJump) {
            this.m_x += this.GetVelocityX(-2);
            this.m_facing = direction.FACE_LEFT;
            this.UpdateWalkingAnimation();
        }
        // Walk Right
        else if (value == 2 && !this.m_somerSaultJump) {
            this.m_x += this.GetVelocityX(2);
            this.m_facing = direction.FACE_RIGHT;
            this.UpdateWalkingAnimation();
        }
    }

    private UpdateWalkingAnimation(): void {
        /** If a collision is not detected with
            the floor then Charlie must be falling
        **/
        if (this.GetVelocityY(4) != 0) {
            this.m_falling = true;
        }
        if (this.m_animTimer > 0.4) {
            this.m_frame = (this.m_frame + 1) % 8;
            this.m_animTimer = 0;
        }
    }

    private UpdateJumping(value: number): void {
        this.JumpLeft(value);
        this.JumpRight(value);
    }

    private JumpLeft(value: number) {
        if (value == 5 && this.m_jumpingUp && this.m_facing == direction.FACE_LEFT) {
            // Facing left
            if (!this.m_initialised) {
                this.m_offsetY = 206;
                this.m_frame = 16;
                this.m_initialised = true;
                this.m_jumpStarted = true;
                this.m_t = 0;
                this.m_amplitude = 100;
            }

            if (this.m_frame > 8) {
                if (this.m_animTimer > 0.4) {
                    this.m_frame -= 1;
                    this.m_animTimer = 0;
                    this.m_t += this.m_increment;
                    this.m_shift = this.m_amplitude * Math.sin(this.m_t);
                    this.m_y = this.m_startYPosition - this.m_shift;
                }
            }
            if (this.m_frame == 8 && this.m_jumpingUp) {
                this.m_offsetY = 0;
                this.m_frame = 0;
                this.m_initialised = false;
                this.m_y = this.m_startYPosition;
                // console.log("----- Jump Complete -----");
                this.m_jumpingUp = false;
                this.m_jumpStarted = false;
                this.m_t = 0;
            }
        }
    }

    private JumpRight(value: number) {
        if (value == 5 && this.m_jumpingUp && this.m_facing == direction.FACE_RIGHT) {
            // if (value == 4 && this.m_jumpingUp) {
            if (!this.m_initialised) {
                this.m_offsetY = 206;
                this.m_frame = 0;
                this.m_initialised = true;
                // this.m_jumpingUp = true;
                this.m_jumpStarted = true;
            }

            if (this.m_frame < 8) {
                if (this.m_animTimer > 0.4) {
                    this.m_frame += 1;
                    this.m_animTimer = 0;
                    //this.m_t += this.m_increment;
                    //this.m_shift = this.m_amplitude * Math.sin(this.m_t);
                    //this.m_y = this.m_startYPosition - this.m_shift;
                }
            }

            if (this.m_frame == 8 && this.m_jumpingUp) {
                this.m_jump = false;
                this.m_offsetY = 0;
                this.m_frame = 0;
                this.m_initialised = false;
                this.m_y = this.m_startYPosition;
                //console.log("----- Jump Complete -----");
                this.m_jumpingUp = false;
                this.m_jumpStarted = false;
                this.m_t = 0;
            }
        }
    }

    private UpdateSomersault(value: number): void {
        if (value == charliesState.SOMERSAULT_LEFT && this.m_somerSaultJump) {
            this.SomerSaultLeft();
        }
        if (value == charliesState.SOMERSAULT_RIGHT && this.m_somerSaultJump) {
            this.SomerSaultRight();
        }
    }

    private SomerSaultLeft(): void {
        if (!this.m_initialised) {
            this.m_offsetY = 138;
            this.m_facing = direction.FACE_LEFT;
            this.m_frame = 16;
            this.m_initialised = true;
            this.m_jumpStarted = true;
            this.m_amplitude = 125;
            // console.log("----SomerSaultJump------");
        }
        if (this.m_frame > 0) {
            if (this.m_animTimer > 0.2) {
                this.m_frame -= 1;
                this.m_animTimer = 0;
                this.m_t += this.m_increment;
                this.m_shift = this.m_amplitude * Math.sin(this.m_t);
                //this.m_y = this.m_startYPosition - this.m_shift;
                let test = this.m_startYPosition - this.m_shift;
                this.m_y = this.m_startYPosition - this.GetVelocityY(this.m_shift);
            }
            // this.m_x -= 4;
            this.m_x -= this.GetVelocityX(4);
        }
        if (this.m_frame == 0 && this.m_somerSaultJump) {
            this.m_somerSaultJump = false;
            this.m_offsetY = 0;
            //this.m_frame = 16;//0;
            this.m_initialised = false;
            this.m_y = this.m_startYPosition;
            //console.log("----- Jump Complete -----");
            this.m_jumpStarted = false;
            this.m_t = 0;
        }
    }

    private SomerSaultRight(): void {
        if (!this.m_initialised) {
            this.m_offsetY = 68;
            this.m_facing = direction.FACE_RIGHT;
            this.m_frame = 0;
            this.m_initialised = true;
            this.m_jumpStarted = true;
            this.m_amplitude = 125;
        }
        if (this.m_frame < 16) {
            if (this.m_animTimer > 0.2) {
                this.m_frame += 1;
                this.m_animTimer = 0;
                this.m_t += this.m_increment;
                this.m_shift = this.m_amplitude * Math.sin(this.m_t);
                this.m_y = this.m_startYPosition - this.m_shift;
            }
            // this.m_x += 5;
            this.m_x += this.GetVelocityX(4);
        }
        if (this.m_frame == 16 && this.m_somerSaultJump) {
            this.m_somerSaultJump = false;
            this.m_offsetY = 0;
            this.m_frame = 0;
            this.m_initialised = false;
            this.m_y = this.m_startYPosition;
            this.m_jumpStarted = false;
            this.m_t = 0;
            //console.log("----- Jump Complete -----");
        }
    }

    /**
    * This method wil return a velocity of either 0 if a collision is found,
    * else the original value passed to the method.
    *
    * @param speed - Walking speed
    */
    public GetVelocityX(speed: number): number {
        let pixelMovement: number = 0;
        let pixels: number = 0;
        if (speed != 0) {
            if (speed > 0) {
                for (let increment: number = 0; increment < speed; increment++) {
                    pixelMovement = this.CheckForHorizontalIntersections(++pixels);
                }
            }
            else if (speed < 0) {
                for (let increment: number = 0; increment > speed; increment--) {
                    pixelMovement = this.CheckForHorizontalIntersections(--pixels);
                }
            }
        }
        return pixelMovement;
    }

    /**
     * This method will return a velocity of 0 if a collision is found.
     *
     * @param increment - Falling speed
     */
    private CheckForHorizontalIntersections(increment: number): number {
        let testRect: Rectangle = this.UpdateBoundingRectangle(increment);
        // Fudge
        testRect.Height = -10;
        this.testingRect = testRect;
        let blocker: number = 1;
        this.plats.forEach((element: Rectangle) => {
            if (blocker != 0 && testRect.Intersects(element)) {
                blocker = 0;
            }
        });
        return blocker != 0 ? increment : blocker;
    }

    /**
     * This method wil return a velocity of either 0 if a collision is found,
     * else the original value passed to the method.
     *
     * @param speed - Falling speed
     */
    public GetVelocityY(speed: number): number {
        let pixelMovement: number = 0;
        let pixels: number = 0;
        if (speed != 0) {
            if (speed > 0) {
                for (let increment: number = 0; increment < speed; increment++) {
                    pixelMovement = this.CheckForVerticalIntersections(++pixels);
                }
            }
            else if (speed < 0) {
                for (let increment: number = 0; increment > speed; increment--) {
                    pixelMovement = this.CheckForVerticalIntersections(--pixels);
                }
            }
        }
        return pixelMovement;
    }

    private CheckForVerticalIntersections(increment: number): number {
        let charlieRectangle: Rectangle = this.UpdateBoundingRectangle(increment);
        this.testingRect = charlieRectangle;
        let blocker: number = 1;
        this.plats.forEach((platform: Rectangle) => {
            let v = charlieRectangle.Intersects(platform);
            if (v == true) {
                let stop = true;
            }

            if (blocker != 0 && charlieRectangle.Intersects(platform)) {
                blocker = 0;
                this.m_falling = false;
            }
        });
        return blocker != 0 ? increment : blocker;
    }

    private UpdateBoundingRectangle(increment: number): Rectangle {
        return new Rectangle(this.m_x + increment, this.m_y, this.m_width, this.m_height);
    }

    // private UpdateVerticalBoundingRectangle(increment: number): Rectangle {
    //     return new Rectangle(this.m_x, this.m_y + increment + 10, this.m_width, this.m_height);
    // }

    public Draw(ctx: CanvasRenderingContext2D): void {

        ctx.beginPath();

        // Draw Charlie facing left
        if (this.m_facing == direction.FACE_LEFT && !this.m_somerSaultJump) {
            ctx.drawImage(this.m_texture, this.m_frame * 64 + (11 * 64), this.m_offsetY, 64, 64, this.m_x, this.m_y, 64, 64);
        }
        if (this.m_facing == direction.FACE_LEFT && this.m_somerSaultJump) {
            ctx.drawImage(this.m_texture, this.m_frame * 64, this.m_offsetY, 64, 64, this.m_x, this.m_y, 64, 64);
        }
        if (this.m_facing == direction.FACE_LEFT && this.m_jumpingUp) {
            // ctx.drawImage(this.m_texture, this.m_frame * 64 + (11 * 64), this.m_offsetY, 64, 64, this.m_x, this.m_y, 64, 64);
            ctx.drawImage(this.m_texture, this.m_frame * 64, this.m_offsetY, 64, 64, this.m_x, this.m_y, 64, 64);
        }
        if (this.m_facing == direction.FACE_LEFT && this.m_sittingDown) {
            ctx.drawImage(this.m_texture, 0, 4 * 69, 64, 64, this.m_x, this.m_y, 64, 64);
        }

        // Draw Charlie facing right
        if (this.m_facing == direction.FACE_RIGHT && !this.m_somerSaultJump) {
            ctx.drawImage(this.m_texture, this.m_frame * 64, this.m_offsetY, 64, 64, this.m_x, this.m_y, 64, 64);
        }
        if (this.m_facing == direction.FACE_RIGHT && this.m_somerSaultJump) {
            ctx.drawImage(this.m_texture, this.m_frame * 64, this.m_offsetY, 64, 64, this.m_x, this.m_y, 64, 64);
        }
        if (this.m_facing == direction.FACE_RIGHT && this.m_jumpingUp) {
            ctx.drawImage(this.m_texture, this.m_frame * 64, this.m_offsetY, 64, 64, this.m_x, this.m_y, 64, 64);
        }
        if (this.m_facing == direction.FACE_RIGHT && this.m_sittingDown) {
            ctx.drawImage(this.m_texture, 64, 4 * 69, 64, 64, this.m_x, this.m_y, 64, 64);
        }

        if (this.m_debug) {
            ctx.lineWidth = 1;
            ctx.strokeStyle = "green";
            ctx.rect(this.testingRect.left, this.testingRect.top, this.testingRect.Width, this.testingRect.Height);
            ctx.stroke();
            ctx.font = "12px Arial";
            ctx.fillStyle = "yellow";
            ctx.fillText("X" + this.m_x, 10, 20);
            ctx.fillText("Y" + this.m_y, 10, 32);
            ctx.fillText("this.m_landingVal" + this.m_landingVal, 10, 44);
            //ctx.fillText("sine" + this.m_shift, 10, 70);
        }
        else {
            ctx.strokeStyle = "black";
        }
    }

    public NewCollisions(colliders: any): void {
        let drop = true;
        colliders.forEach((collider: Rectangle) => {
            if (this.BoundingRectangle.Intersects(collider)) {
                drop = false;
            }
        });
        this.m_falling = drop ? true : false;
    }

    public get X(): number { return this.m_x; }
    public set X(value: number) { this.m_x = value; }
    public get Y(): number { return this.m_y; }
    public set Y(value: number) { this.m_y = value; }
    public set ScreenCounter(value: number) { this.m_screenCounter = value; }
    public get ScreenCounter() { return this.m_screenCounter; }
    // public get BoundingRectangle(): Rectangle { return new Rectangle(this.m_x + 10, this.m_y, this.m_width, this.m_height); }
    public get BoundingRectangle(): Rectangle { return this.UpdateBoundingRectangle(0); }

    public set Walls(value: Array<Rectangle>) { this.m_walls = value; }
    public set EdibleWalls(value: Array<Rectangle>) { this.m_edibleWalls = value; }

    public set Plats(value: Array<Rectangle>) { this.plats = value; }

    public get BelowMoonSurface(): boolean { return this.m_belowSurface; }
    public get SittingDown(): boolean { return this.m_sittingDown; }
    public set SittingDown(value: boolean) { this.m_sittingDown = value; }
    public set SeatingFrame(value: number) { this.m_offsetY = value; }
    public get Falling(): boolean { return this.m_falling; }
    public set Falling(value: boolean) { this.m_falling = value; }
    public get Walking(): boolean { return this.m_walkingOnFloor; }
    public set Walking(value: boolean) { this.m_walkingOnFloor = value; }
    public set Somersault(value: boolean) { this.m_somerSaultJump = value; }
    public get Somersault(): boolean { return this.m_somerSaultJump; }

    public get Direction(): direction { return this.m_facing; }

    //public get Jump(): boolean { return this.m_jump; }
    //public set Jump(value: boolean) { this.m_jump = value; }
    public get JumpingUp(): boolean { return this.m_jumpingUp; }
    public set JumpingUp(value: boolean) { this.m_jumpingUp = value; }

    public set JumpVal(value: number) {
        if (!this.m_jumpStarted) {
            this.m_startYPosition = value;
        }
    }
}

export = Charlie;