import BaseObject = require("BaseObject");
import Rectangle = require("Rectangle");
//import ResourceManager = require("ResourceManager");

class Charlie extends BaseObject {

    private m_somerSaultJump: boolean = false;
    private m_direction: boolean = false;
    //private m_resourceManager: ResourceManager;
    private m_falling: boolean = false;
    private m_startFrame: number = 16;
    private m_initialised: boolean = false;
    private m_screenCounter = 0;
    private m_walkingOnFloor: boolean = false;
    private m_jump: boolean = false;
    private m_amplitude: number = 0;
    private m_shift: number = 0;
    private t: number = 6;

    testJump: Array<number> = new Array();
    //https://csanyk.com/2012/10/game-maker-wave-motion-tutorial/

    constructor(xpos: number, ypos: number, speedx: number, texture: HTMLCanvasElement, wall: number[]) {

        super(texture);
        this.m_x = xpos;
        this.m_y = ypos;
        this.m_width = 64;//texture.width;
        this.m_height = 64;//texture.height;
        this.m_frameX = 1;
        //this.m_resourceManager = resManager;
    }

    Update(value: number): void {
        this.m_animTimer += 0.1;

        // Walk Left
        if (value == 0 && !this.m_somerSaultJump) {
            this.m_x -= 5;
            this.m_direction = false;
            if (this.m_animTimer > 0.4) {
                this.m_frameX = (this.m_frameX + 1) % 8;
                this.m_animTimer = 0;
            }
        }
        // Walk Right
        else if (value == 1 && !this.m_somerSaultJump) {
            this.m_x += 5;
            this.m_direction = true;
            if (this.m_animTimer > 0.4) {
                this.m_frameX = (this.m_frameX + 1) % 8;
                this.m_animTimer = 0;
            }
        }
        // left
        if (value == 0 && this.m_somerSaultJump) {
            if (!this.m_initialised) {
                //this.summerSaultFrame = 138;// 3 * 64;
                this.m_frameY = 138;
                this.m_direction = false;
                this.m_frameX = 17;
                this.m_initialised = true;
            }
            if (this.m_frameX > 0) {
                //    this.m_y -= 5;
                this.m_frameX -= 1;
            }
            if (this.m_frameX == 0 && this.m_somerSaultJump) {
                this.m_somerSaultJump = false;
                //this.summerSaultFrame = 0;
                this.m_frameY = 0;
                this.m_initialised = false;
            }
        }

        // right
        if (value == 1 && this.m_somerSaultJump) {
            if (!this.m_initialised) {
                //this.summerSaultFrame = 68;// 3 * 64;
                this.m_frameY = 68;
                this.m_direction = true;
                this.m_frameX = 0;
                this.m_initialised = true;
            }
            if (this.m_frameX < 20) { //17
                //    this.m_y -= 5;

                if (this.m_animTimer > 0.1) {

                    this.m_frameX += 1;
                    this.m_animTimer = 0;
                }

                //this.m_amplitude += 0.1;
                //this.m_shift = Math.abs(this.m_amplitude * Math.sin(this.t));
                //    //shift = abs(amplitude * sin(t))
                //this.m_y -= this.m_shift;
                //numberOfTicks++;

                this.m_amplitude += 0.025;
                //ufo.y = (250 * sin(numberOfTicks * 0.5 * pi)) + 350;
                //this.m_y = (250 * -Math.abs(Math.sin(this.m_amplitude * Math.PI))) + 350;   //350 is the correct y height
                this.m_y = (200 * -Math.abs(Math.sin(this.m_amplitude * Math.PI))) + 320;   //350 is the correct y height
                this.m_x += 5;
                this.testJump.push(this.m_y);
            }
            if (this.m_frameX == 20 && this.m_somerSaultJump) { //17
                this.m_somerSaultJump = false;
                //this.summerSaultFrame = 0;
                this.m_frameY = 0;
                this.m_frameX = 0;
                this.m_initialised = false;
                this.m_y = 320;
            }
            if (this.testJump.length == 39) {
                var breakHere = true;
            }
        }

        //else if (this.m_frameX > 7)// && this.m_frame < 16)
        //{
        //    this.m_y += 5;
        //}
        //// Somersault jump left 
        //if (this.mDirection && this.m_frameX < 16) {
        //    this.m_x += 1;
        //    this.summerSaultFrame = 70;
        //    this.m_frameX += 1;
        //}
        //// Somersault jump right
        //else if (!this.mDirection && this.m_frameX < 16) {
        //    this.m_x -= 1;
        //    this.summerSaultFrame = 70 + 69;
        //    this.m_frameX += 1;
        //}
        //if (this.m_frameX == 15) {
        //    this.mSummerSaultJump = false;
        //    this.summerSaultFrame = 0;
        //    this.m_frameX = 0;
        //}
        //if (this.m_falling) {
        //    this.m_y += 1;
        //}
        //// if (this.mJumpright) {
        //// this.m_x  += 2;
        //// }
        //// else {
        //// this.m_x  -= 2;
        //// }
        //// if (this.summerSaultFrame < 8 && !this.mTrip) {
        //// this.m_y -= 10;
        //// }
        //// else if (this.summerSaultFrame >= 8 && this.summerSaultFrame < 16 && this.mTrip) {
        //// this.m_y += 10;
        //// }
        //// animTimer += elapsedSecs;
        //// if (animTimer > 0.2) {
        //// animTimer = 0;
        //// this.summerSaultFrame++;
        //// }
        ////        summerSaultRect = new Rectangle((int)summerSaultFrame * spriteWidth, (int)1 * spriteHeight, spriteWidth, spriteHeight);
        //// if (this.summerSaultFrame >= 16) {
        //// this.summerSaultFrame = 0;
        //// this.mSummerSaultJump = false;
        //// if (this.belowMoon) {
        //// //                       YPosition = 366;
        //// }
        ////}
    }

    public Draw(ctx: CanvasRenderingContext2D): void {

        ctx.beginPath();

        // Draw Charlie facing left
        if (!this.m_direction && !this.m_somerSaultJump) {
            ctx.drawImage(this.m_texture, this.m_frameX * 64 + (11 * 64), this.m_frameY /*this.summerSaultFrame*/, 64, 64, this.m_x, this.m_y, 64, 64);
            //ctx.fill();
        }
        if (!this.m_direction && this.m_somerSaultJump) {
            ctx.drawImage(this.m_texture, this.m_frameX * 64, this.m_frameY /*this.summerSaultFrame*/, 64, 64, this.m_x, this.m_y, 64, 64);
            //ctx.fill();
        }

        if (this.m_direction && this.m_somerSaultJump) {
            ctx.drawImage(this.m_texture, this.m_frameX * 64, this.m_frameY /* this.summerSaultFrame*/, 64, 64, this.m_x, this.m_y, 64, 64);
            //ctx.fill();
        }

        // Draw Charlie facing right
        else if (this.m_direction && !this.m_somerSaultJump) {// || this.mDirection && this.m_somerSaultJump) {
            // ctx.drawImage(this.m_texture, this.m_frameX * 64 + (11 * 64), this.summerSaultFrame, 64, 64, this.m_x, this.m_y, 64, 64);
            ctx.drawImage(this.m_texture, this.m_frameX * 64, this.m_frameY /*this.summerSaultFrame*/, 64, 64, this.m_x, this.m_y, 64, 64);
            //ctx.fill();
        }
        ctx.fill();

        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "green";
        ctx.rect(this.m_x, this.m_y, this.m_width, this.m_height);
        ctx.stroke();

        ctx.font = "12px Arial";
        ctx.fillStyle = "yellow";

        ctx.fillText("X" + this.m_x, 10, 50);
        ctx.fillText("Y" + this.m_y, 10, 70);
        //ctx.fillText("sine" + this.m_shift, 10, 70);
    }

    public get X(): number { return this.m_x; }
    public set X(value: number) { this.m_x = value; }
    public get Y(): number { return this.m_y; }
    public set Y(value: number) { this.m_y = value; }
    public set ScreenCounter(value: number) { this.m_screenCounter = value; }
    public get ScreenCounter() { return this.m_screenCounter; }
    public get Rectangle(): Rectangle { return new Rectangle(this.m_x, this.m_y, 64, 64); }
    public get Falling(): boolean { return this.m_falling; }
    public set Falling(value: boolean) { this.m_falling = value; }
    public get Walking(): boolean { return this.m_walkingOnFloor; }
    public set Walking(value: boolean) { this.m_walkingOnFloor = value; }
    public set Somersault(value: boolean) { this.m_somerSaultJump = value; }
    public get Somersault(): boolean { return this.m_somerSaultJump; }
    public get Direction(): boolean { return this.m_direction; }
    public get Jump(): boolean { return this.m_jump; }
    public set Jump(value: boolean) { this.m_jump = value; }
}

export = Charlie;
