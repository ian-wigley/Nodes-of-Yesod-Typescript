import BaseObject = require("BaseObject");
import Rectangle = require("Rectangle");

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
    private m_amplitude: number = 0;
    private m_shift: number = 0;
    private t: number = 6;

    private m_platforms: Array<Rectangle>;
    private m_walls: Array<Rectangle>;

    private m_holeRectangle1: Rectangle;
    private m_holeRectangle2: Rectangle;



    testJump: Array<number> = new Array();
    //https://csanyk.com/2012/10/game-maker-wave-motion-tutorial/

    constructor(xpos: number, ypos: number, speedx: number, texture: HTMLCanvasElement, walls: Array<Rectangle>, platforms: Array<Rectangle>, debug:boolean) {

        super(texture);
        this.m_x = xpos;
        this.m_y = ypos;
        this.m_width = 34;//64
        this.m_height = 64;
        this.m_frameX = 1;
        //this.m_resourceManager = resManager;
        this.m_walls = new Array<Rectangle>();
        this.m_platforms = new Array<Rectangle>();
        this.m_debug = debug;
    }

   public Update(value: number): void {
        this.m_animTimer += 0.1;

        // Walk Left
        if (value == 0 && !this.m_somerSaultJump) {
            this.m_x -= 4;
            this.m_direction = false;
            if (this.m_animTimer > 0.4) {
                this.m_frameX = (this.m_frameX + 1) % 8;
                this.m_animTimer = 0;
            }
        }
        // Walk Right
        else if (value == 1 && !this.m_somerSaultJump) {
            this.m_x += 4;
            this.m_direction = true;
            if (this.m_animTimer > 0.4) {
                this.m_frameX = (this.m_frameX + 1) % 8;
                this.m_animTimer = 0;
            }
        }
        // left somerSault
        if (value == 0 && this.m_somerSaultJump) {
            if (!this.m_initialised) {
                //this.summerSaultFrame = 138;// 3 * 64;
                this.m_frameY = 138;
                this.m_direction = false;
                this.m_frameX = 0;
                this.m_initialised = true;
            }
            if (this.m_frameX < 20) {
                //    this.m_y -= 5;
                //this.m_frameX -= 1;
                if (this.m_animTimer > 0.1) {
                    this.m_frameX += 1;
                    this.m_animTimer = 0;
                }
                this.m_amplitude += 0.025;
                this.m_y = (200 * -Math.abs(Math.sin(this.m_amplitude * Math.PI))) + 320;   //350 is the correct y height
                this.m_x -= 5;
            }
            if (this.m_frameX == 20 && this.m_somerSaultJump) {
                this.m_somerSaultJump = false;
                //this.summerSaultFrame = 0;
                this.m_frameY = 0;
                this.m_frameX = 0;
                this.m_initialised = false;
                this.m_y = 320;
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
                this.m_amplitude += 0.025;
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

        //this.collisions(false);


    }

    public Draw(ctx: CanvasRenderingContext2D): void {

        ctx.beginPath();

        // Draw Charlie facing left
        if (!this.m_direction && !this.m_somerSaultJump) {
            ctx.drawImage(this.m_texture, this.m_frameX * 64 + (11 * 64), this.m_frameY /*this.summerSaultFrame*/, 64, 64, this.m_x, this.m_y, 64, 64);
        }
        if (!this.m_direction && this.m_somerSaultJump) {
            ctx.drawImage(this.m_texture, this.m_frameX * 64, this.m_frameY /*this.summerSaultFrame*/, 64, 64, this.m_x, this.m_y, 64, 64);
        }

        if (this.m_direction && this.m_somerSaultJump) {
            ctx.drawImage(this.m_texture, this.m_frameX * 64, this.m_frameY /* this.summerSaultFrame*/, 64, 64, this.m_x, this.m_y, 64, 64);
        }

        // Draw Charlie facing right
        else if (this.m_direction && !this.m_somerSaultJump) {// || this.mDirection && this.m_somerSaultJump) {
            ctx.drawImage(this.m_texture, this.m_frameX * 64, this.m_frameY /*this.summerSaultFrame*/, 64, 64, this.m_x, this.m_y, 64, 64);
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
            //ctx.fillText("sine" + this.m_shift, 10, 70);
        }
    }

    public Collisions(belowMoon: boolean, screenChange: boolean): void {
        if (!belowMoon) {
            if (this.Rectangle.Intersects(this.m_holeRectangle1)) {// || this.Rectangle.Intersects(this.m_holeRectangle2)) {
                //Yesod.belowScreenCounter = Yesod.screenCounter;
                //Yesod.belowMoon = true;
                //this.Falling = true;
                this.m_falling = true;
                this.Y = 10;
                this.m_belowSurface = true;
            }
        }

        if (belowMoon) {
            //if (this.Falling && !this.m_somerSaultJump) {
            var charlieRect: Rectangle = this.Rectangle;
            if (this.m_falling && !this.m_somerSaultJump) {
                //var charlieRect: Rectangle = this.Rectangle;
                for (var i = 0; i < this.m_platforms.length; i++) {//  Rectangle platforms in mPlatforms) {
                    if (this.Rectangle.Intersects(this.m_platforms[i])) {

                        //this.Falling = false;
                        this.m_falling = false;

                        if (charlieRect.Bottom == this.m_platforms[i].Top ||
                            charlieRect.Bottom == this.m_platforms[i].Top + 1 ||
                            charlieRect.Bottom == this.m_platforms[i].Top + 2 ||
                            charlieRect.Bottom == this.m_platforms[i].Top + 3) {
                            //this.Falling = false;
                            this.m_falling = false;
                            break;
                        }
                    }
                }

                //foreach(Rectangle floor in mFloor)
                //    {
                //    if (charlieRect.Intersects(floor) == true) {
                //        mFalling = false;
                //        mWalking = true;
                //        mYPosition = 366;
                //        break;
                //    }
                //}
            }


            //if (!this.Falling && !this.m_somerSaultJump) {
            //    var charlieRect: Rectangle = this.Rectangle;
            //    for (var i = 0; i < this.m_platforms.length; i++) {
            //        if (!this.Rectangle.Intersects(this.m_platforms[i])) {

            //                               this.Falling = true;

            //        }
            //    }
            //}

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


            // Check to see if Charlie has walked over a gap in the floor
            if (!this.m_falling && !this.m_walkingOnFloor && !this.Somersault) {
                var platformCount = this.m_platforms.length;
                var checkCounter = 0;
                //var charlieRect: Rectangle = this.Rectangle;
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

            //if (mWalking) {
            //        int floorCount = mFloor.Count;
            //        int checkCounter = 0;
            //    foreach(Rectangle floor in mFloor)
            //        {
            //        if (charlieRect.Intersects(floor) == false) {
            //            checkCounter++;
            //        }
            //    }
            //    if (checkCounter == floorCount) {
            //        Falling = true;
            //        checkCounter = 0;
            //    }
            //}

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

            //if (mEdibleWalls.Count > 0) {
            //    foreach(Rectangle edible in mEdibleWalls)
            //        {
            //        if (edible.IsEmpty && XPosition < 50) {
            //            if (Yesod.screenCounter > 0) {
            //                Yesod.screenCounter -= 1;
            //                Yesod.belowScreenCounter -= 1;
            //                XPosition = 740;

            //            }
            //            else {
            //                Yesod.screenCounter = 15;
            //                Yesod.belowScreenCounter = 15;
            //                XPosition = 740;
            //            }
            //        }
            //        else if (charlieRect.Intersects(edible)) {
            //            if (mFacingLeft) {
            //                XPosition = edible.Right - 19;
            //                break;
            //            }
            //            else {
            //                XPosition = 680;
            //                break;
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
    public get Rectangle(): Rectangle { return new Rectangle(this.m_x + 10, this.m_y, this.m_width, this.m_height); }

    public set HoleRectangle1(value: Rectangle) { this.m_holeRectangle1 = value; }
    public set HoleRectangle2(value: Rectangle) { this.m_holeRectangle2 = value; }

    public set Ledges(value: Array<Rectangle>) { this.m_platforms = value; }
    public set Walls(value: Array<Rectangle>) { this.m_walls = value; }
    public get BelowMoonSurface(): boolean { return this.m_belowSurface; }

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
