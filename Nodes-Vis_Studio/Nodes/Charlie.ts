﻿import BaseObject = require("BaseObject");
import Rectangle = require("Rectangle");
import ScreenInfo = require("ScreenInfo");

class Charlie extends BaseObject {

    private m_somerSaultJump: boolean = false;
    private m_direction: boolean = false;
    private m_falling: boolean = false;
    private m_startFrame: number = 16;
    private m_initialised: boolean = false;
    private m_screenCounter = 0;
    private m_walkingOnFloor: boolean = false;

    private m_belowSurface: boolean = false;
    private m_jump: boolean = false;
    private m_sittingDown: boolean = false;

    private m_amplitude: number = 185;//125
    private m_shift: number = 0;
    private m_t: number = 0;//6;
    private m_increment = 10 * Math.PI / 180;//12

    private m_floor: Array<Rectangle>;
    private m_platforms: Array<Rectangle>;
    //private m_walls: Array<Rectangle>;

    private m_holeRectangle1: Rectangle;
    private m_holeRectangle2: Rectangle;

    //https://csanyk.com/2012/10/game-maker-wave-motion-tutorial/
    private m_landingVal: number = 0;
    private m_startYPosition: number = 0;
    private m_jumpStarted: boolean = false;
    private m_jumpingUp: boolean = false;

    constructor(xpos: number, ypos: number, speedx: number, texture: HTMLCanvasElement, walls: Array<Rectangle>, ediblewalls: Array<Rectangle>, platforms: Array<Rectangle>, debug: boolean, screenInfo: ScreenInfo) {

        super(texture, screenInfo);
        this.m_x = xpos;
        this.m_y = ypos;
        this.m_width = 34;//64
        this.m_height = 64;
        this.m_frame = 1;
        //this.m_resourceManager = resManager;

        this.m_walls = walls;
        this.m_edibleWalls = ediblewalls;
        this.m_platforms = new Array<Rectangle>();
        this.m_floor = new Array<Rectangle>();
        this.m_debug = debug;
    }

    // Values:
    // 0 - nothing ! 1 - left ! 2 - right ! 3 - standard jump
    public Update(value: number): void {
        this.m_animTimer += 0.1;

        this.m_landingVal = !this.m_belowSurface ? 320 : this.m_y;

        // Walk Left
        if (value == 1 && !this.m_somerSaultJump) {
            this.m_x -= 4;
            this.m_direction = false;
            if (this.m_animTimer > 0.4) {
                this.m_frame = (this.m_frame + 1) % 8;
                this.m_animTimer = 0;
            }
        }
        // Walk Right
        else if (value == 2 && !this.m_somerSaultJump) {
            this.m_x += 4;
            this.m_direction = true;
            if (this.m_animTimer > 0.4) {
                this.m_frame = (this.m_frame + 1) % 8;
                this.m_animTimer = 0;
            }
        }

        // Jumping up 
        if (value == 3 && this.m_jumpingUp) {
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
                    //console.log("this.m_t = " + this.m_t);
                    //console.log("this.m_increment = " + this.m_increment);
                    this.m_shift = this.m_amplitude * Math.sin(this.m_t);
                    //console.log("this.m_shift = " + this.m_shift);
                    this.m_y = this.m_startYPosition - this.m_shift;
                    //console.log("this.m_startYPosition = " + this.m_startYPosition);
                    //console.log("this.m_y = " + this.m_y);
                    //console.log("----------");
                }
            }
            if (this.m_frame == 8 && this.m_jumpingUp) {
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

        // Jumping up 
        if (value == 4 && this.m_jumpingUp) {
            // Facing Right
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

        // left somerSault
        if (value == 1 && this.m_somerSaultJump) {
            if (!this.m_initialised) {
                this.m_offsetY = 138;
                this.m_direction = false;
                this.m_frame = 16;
                this.m_initialised = true;
                this.m_jumpStarted = true;
                this.m_amplitude = 125;
                console.log("----SomerSaultJump------");
            }
            if (this.m_frame > 0) {
                if (this.m_animTimer > 0.2) {
                    this.m_frame -= 1;
                    this.m_animTimer = 0;
                    this.m_t += this.m_increment;
                    console.log("this.m_t = " + this.m_t);
                    console.log("this.m_increment = " + this.m_increment);
                    this.m_shift = this.m_amplitude * Math.sin(this.m_t);
                    console.log("this.m_shift = " + this.m_shift);
                    this.m_y = this.m_startYPosition - this.m_shift;
                    console.log("this.m_startYPosition = " + this.m_startYPosition);
                    console.log("this.m_y = " + this.m_y);
                    console.log(this.m_y);
                    console.log("----------");
                }
                this.m_x -= 4;
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

        // right
        if (value == 2 && this.m_somerSaultJump) {
            if (!this.m_initialised) {
                this.m_offsetY = 68;
                this.m_direction = true;
                this.m_frame = 0;
                this.m_initialised = true;
                this.m_jumpStarted = true;
                this.m_amplitude = 125;
            }
            if (this.m_frame < 16) { //20
                if (this.m_animTimer > 0.2) {
                    this.m_frame += 1;
                    this.m_animTimer = 0;
                    this.m_t += this.m_increment;
                    this.m_shift = this.m_amplitude * Math.sin(this.m_t);
                    this.m_y = this.m_startYPosition - this.m_shift;
                }
                this.m_x += 5;
                //console.log(this.m_y);
            }
            if (this.m_frame == 16 && this.m_somerSaultJump) { //20
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
    }

    public Draw(ctx: CanvasRenderingContext2D): void {

        ctx.beginPath();

        // Draw Charlie facing left
        if (!this.m_direction && !this.m_somerSaultJump) {
            ctx.drawImage(this.m_texture, this.m_frame * 64 + (11 * 64), this.m_offsetY, 64, 64, this.m_x, this.m_y, 64, 64);
        }
        if (!this.m_direction && this.m_somerSaultJump) {
            ctx.drawImage(this.m_texture, this.m_frame * 64, this.m_offsetY, 64, 64, this.m_x, this.m_y, 64, 64);
        }

        if (!this.m_direction && this.m_jumpingUp) {//m_jump) {
            ctx.drawImage(this.m_texture, this.m_frame * 64 + (11 * 64), this.m_offsetY, 64, 64, this.m_x, this.m_y, 64, 64);
        }

        // Draw Charlie facing right
        if (this.m_direction && this.m_somerSaultJump) {
            ctx.drawImage(this.m_texture, this.m_frame * 64, this.m_offsetY, 64, 64, this.m_x, this.m_y, 64, 64);
        }

        if (!this.m_direction && this.m_jumpingUp) {//.m_jump) {
            ctx.drawImage(this.m_texture, this.m_frame * 64, this.m_offsetY, 64, 64, this.m_x, this.m_y, 64, 64);
        }

        if (this.m_direction && !this.m_somerSaultJump) {// || this.mDirection && this.m_somerSaultJump) {
            ctx.drawImage(this.m_texture, this.m_frame * 64, this.m_offsetY, 64, 64, this.m_x, this.m_y, 64, 64);
        }

        if (this.m_direction && this.m_sittingDown) {
            ctx.drawImage(this.m_texture, /*this.m_frame*/ 15 * 64, this.m_offsetY, 64, 64, this.m_x, this.m_y, 64, 64);
        }
        if (!this.m_direction && this.m_sittingDown) {
            ctx.drawImage(this.m_texture, /*this.m_frame*/ 1 * 64, this.m_offsetY, 64, 64, this.m_x, this.m_y, 64, 64);
        }

        ctx.fill();

        if (this.m_debug) {
            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.strokeStyle = "green";
            ctx.rect(this.m_x + 10, this.m_y, this.m_width, this.m_height);
            ctx.stroke();
            ctx.font = "20px SpaceAge";
            ctx.fillStyle = "yellow";
            ctx.fillText("X" + this.m_x, 10, 50);
            ctx.fillText("Y" + this.m_y, 10, 70);
            ctx.fillText("this.m_landingVal" + this.m_landingVal, 10, 90);
            //ctx.fillText("sine" + this.m_shift, 10, 70);
        }
    }

    public Collisions(belowMoon: boolean, screenChange: boolean): void {
        if (!belowMoon) {
            if (this.Rectangle.Intersects(this.m_holeRectangle1) || this.Rectangle.Intersects(this.m_holeRectangle2)) {
                this.m_falling = true;
                this.Y = 10;
                this.m_belowSurface = true;
            }
        }

        if (belowMoon) {

            var charlieRect: Rectangle = this.Rectangle;
            if (this.m_falling && !this.m_somerSaultJump) {
                for (var i = 0; i < this.m_floor.length; i++) {
                    if (this.Rectangle.Intersects(this.m_floor[i])) {
                        this.m_falling = false;
                        this.m_walkingOnFloor = true;
                        console.log(">>>>> Landed on floor = " + i + "Y : " + this.m_y + "<<<<<");
                        this.m_startYPosition = this.m_y;
                    }
                }

                for (var i = 0; i < this.m_platforms.length; i++) {
                    if (this.Rectangle.Intersects(this.m_platforms[i])) {
                        this.m_falling = false;
                        console.log(">>>>> Landed on platform = " + i + "Y : " + this.m_y + "<<<<<");
                        this.m_startYPosition = this.m_y;
                    }
                }
            }

            if (!this.m_falling && this.m_somerSaultJump) {
                for (var i = 0; i < this.m_platforms.length; i++) {
                    if (this.Rectangle.Intersects(this.m_platforms[i])) {
                        console.log(">>>>> Somersault onto platform = " + i + "Y : " +  this.m_y + "<<<<<");
                        if (charlieRect.Height == this.m_platforms[i].Top ||
                            charlieRect.Height == this.m_platforms[i].Top + 1 ||
                            charlieRect.Height == this.m_platforms[i].Top + 2 ||
                            charlieRect.Height == this.m_platforms[i].Top + 3) {
                            this.m_somerSaultJump = false;
                            break;
                        }
                    }
                }
            }

            // Check to see if Charlie has walked over a gap in the floor
            if (!this.m_falling && !this.m_walkingOnFloor && !this.Somersault) {
                var platformCount = this.m_platforms.length;
                var checkCounter = 0;
                for (var i = 0; i < platformCount; i++) {
                    if (!charlieRect.Intersects(this.m_platforms[i])) {
                        checkCounter++;
                    }
                }
                if (checkCounter == platformCount) {
                    this.m_falling = true;
                    checkCounter = 0;
                }
            }

            if (this.m_walkingOnFloor) {
                var floorCount = this.m_floor.length;
                var checkCounter = 0;
                for (var i = 0; i < floorCount; i++) {
                    if (!charlieRect.Intersects(this.m_floor[i])) {
                        checkCounter++;
                    }
                }
                if (checkCounter == floorCount) {
                    this.m_falling = true;
                    checkCounter = 0;
                }
            }

            // Check to see if Charlie walks into the walls
            if (this.m_walls.length > 0 && !screenChange) {
                for (var i = 0; i < this.m_walls.length; i++) {
                    if (charlieRect.Intersects(this.m_walls[i])) {
                        var yes = true;
                        if (!this.m_direction) {
                            this.m_x = this.m_walls[i].Width
                            break;
                        }
                        else {
                            this.m_x = 680;
                            break;
                        }
                    }
                }
            }

            if (this.m_edibleWalls.length > 0 && !screenChange) {
                for (var i = 0; i < this.m_edibleWalls.length; i++) {
                    if (charlieRect.Intersects(this.m_edibleWalls[i])) {
                        var yes = true;
                        if (!this.m_direction) {
                            this.m_x = this.m_edibleWalls[i].Width
                            break;
                        }
                        else {
                            this.m_x = 680;
                            break;
                        }
                    }
                }
            }

            //// Check to see if Charlie hits a ledge when summersault jumping
            //if (summerSaultJump && mTrip && mPlatforms.Count > 0) {
            //    foreach(Rectangle platforms in mPlatforms)
            //        {
            //        if (charlieRect.Intersects(platforms) == true) {
            //                int charBottom = platforms.Top - charlieRect.Height;
            //            if (charlieRect.Top <= platforms.Top) {
            //                YPosition = charBottom - 5;
            //            }

            //            if (charlieRect.Top >= platforms.Bottom - 15 ||
            //                charlieRect.Top >= platforms.Bottom - 5) {
            //                YPosition += 1;
            //                Jump = false;
            //                Falling = true;// false;
            //                mTrip = false;
            //                Yesod.trip = false;
            //            }
            //            //if (charlieRect.Right >= platforms.Left && charlieRect.Left <= platforms.Right)
            //            //{
            //            //if (mFacingLeft)
            //            //{
            //            //XPosition += 5;
            //            //}
            //            //else
            //            //{
            //            //XPosition -= 5;
            //            //}
            //            //}
            //        }
            //    }
            //}

            //// Check to see if Charlie is jumping and hits a ledge from 
            //// underneath
            //if (mJump) {
            //    if (mPlatforms.Count > 0) {
            //        foreach(Rectangle platforms in mPlatforms)
            //            {
            //            if (charlieRect.Intersects(platforms) == true) {
            //                if (charlieRect.Top >= platforms.Bottom - 16 &&
            //                    charlieRect.Top <= platforms.Bottom - 10)
            //                //if (charlieRect.Top <= platforms.Bottom - 16 )
            //                {
            //                    mYPosition += 2;
            //                    mJump = false;
            //                    break;
            //                }
            //            }
            //        }
            //    }
            //}

            //if (mRoof.Count > 0) {
            //    foreach(Rectangle roof in mRoof)
            //        {
            //        if (charlieRect.Intersects(roof)) {
            //            YPosition += 5;
            //            Jump = false;
            //        }
            //    }
            //}

            //if (mAlchiems.Count > 0) {
            //    foreach(Rectangle alchiem in mAlchiems)
            //            {
            //        if (charlieRect.Intersects(alchiem)) {
            //                    int span = mBelowScreenCounter * 10;
            //                    for (int i = span; i < span + 13; i++)
            //                    {
            //                        for (int j = 1; j < 10; j++)
            //                        {
            //                    if (mtoTheUndergound[i, j] == 22) {
            //                        // replace the alchiems with space
            //                        mtoTheUndergound[i, j] = 4;
            //                        Yesod.alchiem += 1;
            //                    }
            //                }
            //            }
            //        }
            //    }
            //}
        }
    }

    public get X(): number { return this.m_x; }
    public set X(value: number) { this.m_x = value; }
    public get Y(): number { return this.m_y; }
    public set Y(value: number) { this.m_y = value; }
    public set ScreenCounter(value: number) { this.m_screenCounter = value; }
    public get ScreenCounter() { return this.m_screenCounter; }
    public get Rectangle(): Rectangle { return new Rectangle(this.m_x + 10, this.m_y, this.m_width, this.m_height, "charlieRectangle"); }

    public set HoleRectangle1(value: Rectangle) { this.m_holeRectangle1 = value; }
    public set HoleRectangle2(value: Rectangle) { this.m_holeRectangle2 = value; }

    public set Floor(value: Array<Rectangle>) { this.m_floor = value; }
    public set Ledges(value: Array<Rectangle>) { this.m_platforms = value; }
    public set Walls(value: Array<Rectangle>) { this.m_walls = value; }
    public set EdibleWalls(value: Array<Rectangle>) { this.m_edibleWalls = value; }
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
    public get Direction(): boolean { return this.m_direction; }
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