import Charlie = require("Charlie");
import Earth = require("Earth");
import Rectangle = require("Rectangle");
import ResourceManager = require("ResourceManager");

class Nodes {

    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;

    WIDTH: number = 800;
    HEIGHT: number = 600;

     ////----- Surface Arrays -----
    upperRocks: Array<number[]>;
    holes1: Array<number>;
    holes2: Array<number>;

    //// Enemies
    enemies: Array<number>;

    //// Floor textures
    floor: Array<number>;

    ////Platforms & Ledges
    platform: Array<number>;

    //// Standard Walls
    walls: Array<number>;

    //// Mole edible
    edibleWalls: Array<number>;

    //// Alcheims
    alchiems: Array<number>;

    //// Roof rocks
    roof: Array<number>;
    platformList: Array<number>;

    //// Images
    gameSprites: HTMLCanvasElement;
    panel: HTMLCanvasElement;
    moonRocks: HTMLCanvasElement;
    unGroundLedges: HTMLCanvasElement;
    frontScreen: HTMLCanvasElement;
    collisionTile: HTMLCanvasElement;
    //var collision = false;
    collision: HTMLCanvasElement;
    colRect: HTMLCanvasElement;

    ////        private SpriteFont hudFont;
    ////        Rectangle gameSpritesRect;
    ////        Rectangle mainSpritesRect;
    ////        Rectangle heartBeatRect;
    ////        Rectangle moonRocksRect;
    ////        Rectangle lowmoonRocksRect;
    ////        Rectangle moundRect;
    holeRect0: Rectangle;
    holeRect1: Rectangle;
    ////        Rectangle holeRect1;
    ////        Rectangle wallRect;
    ////        Rectangle groundRect;
    ////        Rectangle collisionRects;

    animTimer: number = 0;
    heartBeatTimer: number = 0;
    clockTimer: number = 0;
    elapsedClockSecs: number = 1.0;
    elapsedSecs: number = 0.1;

    //tempY;
    //platforms;

    spriteWidth: number = 64;
    spriteHeight: number = 69;
    currentFrame: number = 0;
    heartBeatFrame: number = 8;

    rockWidth: number = 100;
    rockHeight: number = 117;
    lowerRockWidth: number = 100;
    lowerRockHeight: number = 100;
    unGroTileHeight: number = 48;
    unGroTileWidth: number = 62;

    seconds: number = 0;
    minutes: number = 0;

    hole0X: number = 300;
    hole1X: number = 500;
    holesY: number = 350;//400;

    screenCounter: number = 0;
    belowScreenCounter: number = 0;

    moleManAlive: boolean = false;
    trip: boolean = false;
    gameOn: boolean = true; false;
    jumpRight: boolean = false;
    belowMoon: boolean = false;

    //var alchiem = 0;
    //var startTime = new Date().getTime();
    //var currentTime;

    //// Objects
    //var Alf;
    resourceManager: ResourceManager;
    charlie: Charlie;
    earth: Earth;
    //earth: Earth;

    //// Set the screen position for the Y-value
    //var yScreenPosition = 100;
    //var spacing = 30;


    //this.holeRect0 = {
    //    left: 0,
    //    top: 0,
    //    right: 69,
    //    bottom: 18
    //};

    //this.holeRect1 = {
    //    left: 0,
    //    top: 0,
    //    right: 69,
    //    bottom: 18
    //};

    //this.plats = {
    //    left: 0,
    //    top: 0,
    //    right: 69,
    //    bottom: 18
    //};

    constructor() {
        var construct = 0;
    }

    private rect(x: number, y: number, w: number, h: number): void {
        this.ctx.beginPath();
        this.ctx.rect(x, y, w, h);
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.stroke();
    }

    //var width = 62;
    //var height = 66; //77;
    ////var spacing = 10;

    sineCounter: number = 0;
    moveLeft: boolean = false;
    moveRight: boolean = false;
    somersault: boolean = false;


    private clear(): void {
        this.ctx.clearRect(0, 0, this.WIDTH, this.HEIGHT);
    }

    public Run(): void {
        this.Initialize();
    }

    private Initialize(): void {
        this.canvas = <HTMLCanvasElement>document.getElementById("canvas");
        this.ctx = this.canvas.getContext("2d");

        this.gameSprites = <HTMLCanvasElement>document.getElementById("Gamesprites");
        this.panel = <HTMLCanvasElement>document.getElementById("Panel");
        this.moonRocks = <HTMLCanvasElement>document.getElementById("MoonRocks");
        this.colRect = <HTMLCanvasElement>document.getElementById("ColRect");
        this.unGroundLedges = <HTMLCanvasElement>document.getElementById("UnGroundLedges");
        //    frontScreen = new Image;
        //    frontScreen.src = "images/nodes_front_Screen.png";

        this.resourceManager = new ResourceManager(this.gameSprites, this.enemies, this.walls, this.platform, this.ctx);
        this.upperRocks = this.resourceManager.mUpperRockArray;

        //    holes1 = ResourceManager.mHoleArray0;
        //    holes2 = ResourceManager.mHoleArray1;

        // Create the Actors
        this.charlie = new Charlie(150, 350, 3, this.gameSprites, this.walls);
        this.earth = new Earth(this.gameSprites);

        //    //    gameSprites = Content.Load < Texture2D > ("sprites");
        //    //    intface = new ResourceManager(gameSprites, enemies, walls, platform);
        //    //    //Debugging Image
        //    //    colRect = Content.Load < Texture2D > ("charlieBlock");
        //    //    man = new Charlie(150, 350, 3, gameSprites, colRect, walls, rects, platform, edibleWalls, alchiems, roof, intface.ToTheUnderGround);
        //    //    rocket = new Rocket(gameSprites);
        //    //    earth = new Earth(gameSprites);
        //    //    mole = new Mole(gameSprites, walls, edibleWalls, intface.ToTheUnderGround);
        //    //    panel = Content.Load < Texture2D > ("panel");
        //    //    moonRocks = Content.Load < Texture2D > ("aboverground_tiles");
        //    //    unGroundLedges = Content.Load < Texture2D > ("underground_tiles_small");
        //    //    collisionTile = Content.Load < Texture2D > ("collision_tile");
        //    //    frontScreen = Content.Load < Texture2D > ("nodes_front_Screen");
        //    //    hudFont = Content.Load < SpriteFont > ("Hud");
        //    //    intface.LoadLevels();
        this.AddHitListener(this.canvas);
        setInterval(() => this.update(), 10);
    }

    AddHitListener(element: HTMLElement) {
        window.addEventListener("keydown", (event) => {
            this.onKeyPress(event);
            return null;
        });

        window.addEventListener("keyup", (event) => {
            this.onKeyUp(event);
            return null;
        });
    }

    onKeyPress(event: KeyboardEvent) {
        event.preventDefault();
        this.onKeyboardPress(event, false);
    }

    onKeyUp(event: KeyboardEvent) {
        event.preventDefault();
        this.onKeyboardRelease(event, false);
    }

    onKeyboardPress(event: Event, touchDevice: boolean) {
        switch (((<number>(<KeyboardEvent>event).keyCode | 0))) {
            case 17:
                break;
            case 37:
                this.moveLeft = true;
                break;
            case 38:
                break;
            case 39:
                this.moveRight = true;
                break;
            case 40:
                break;
        }
    }

    onKeyboardRelease(event: Event, touchDevice: boolean) {
        switch (((<number>(<KeyboardEvent>event).keyCode | 0))) {
            case 17:
                break;
            case 37:
                this.moveLeft = false;
                break;
            case 38:
                break;
            case 39:
                this.moveRight = false;
                break;
            case 40:
                break;
            default:
                break;
        }
    }

    private update(): void {

        if (this.moveLeft) {// && !this.charlie.msomersaultJump) {
            this.charlie.Update(0);
        }
        if (this.moveRight) {// && !this.charlie.msomersaultJump) {
            this.charlie.Update(1);
        }
        //    //
        //    if (somersault) {
        //        Charlie.msomersaultJump = true;
        //        Charlie.mCurrentFrameX = 0;
        //        somersault = false;
        //    }
        //    if (Charlie.msomersaultJump) {
        //        //Charlie.update(0);
        //    }


        //    // Check for collisions
        //    Charlie.collisions(belowMoon, this.platformList, moveLeft, moveRight);

        //    // if(somersault)
        //    // {
        //    // Charlie.msomersaultJump = true;
        //    // }

        if (this.charlie.X < 50) {
            if (this.screenCounter > 0) {
                this.screenCounter = (this.screenCounter - 1) % 15;
                //belowScreenCounter -= 1;
                //belowScreenCounter = (belowScreenCounter - 1) % 15;
                //Charlie.mBelowScreenCounter -= 1;
                //Charlie.mBelowScreenCounter = (Charlie.mBelowScreenCounter - 1) % 15;
            }
            else {
                this.screenCounter = 15; //8
                //belowScreenCounter += 15;
                //Charlie.mBelowScreenCounter += 1;
            }

            this.charlie.X = 770;

            // Move the hole out of the way...
            //holeRect0.left = 0;
            //holeRect0.top = 0;
            //holeRect0.right = 0;
            //holeRect0.bottom = 0;
        }

        else if (this.charlie.X > 770) {
            if (this.screenCounter < 15) //8
            {
                this.screenCounter += 1;
                //belowScreenCounter += 1;
                //Charlie.mBelowScreenCounter += 1;
                this.charlie.X = 0;
            }
            else {
                this.screenCounter = 0;
                //belowScreenCounter -= 15;//0
                //Charlie.mBelowScreenCounter -= 15;
                this.charlie.X = 55;
            }

            //screenCounter = (screenCounter + 1) % 15;
            this.charlie.X = 51;
            //Charlie.mBelowScreenCounter = screenCounter;
            //belowScreenCounter = screenCounter;

            // Move the hole out of the way...		
            //holeRect0.left = 0;
            //holeRect0.top = 0;
            //holeRect0.right = 0;
            //holeRect0.bottom = 0;
        }



        if (!this.belowMoon) {

            if (this.resourceManager.mHoleArray0[this.screenCounter] == 1) {
                this.holeRect0 = new Rectangle(this.hole0X, this.holesY, 100, 40)

                if (this.charlie.Rectangle.Intersects(this.holeRect0)) {
                    this.belowMoon = true;
                    this.charlie.Falling = true;
                    //this.onGround = true;
                    //this.y -= 1;
                    //if (this.tripSwitch == false) {
                    //    this.currentFrame += 1;
                    //    this.tripSwitch = true;
                    //}
                }
            }

            //    if (Charlie.mFalling) {
            //        Charlie.updateFall();
            //        belowScreenCounter = Charlie.mBelowScreenCounter;
            //    }

            //    //belowScreenCounter = Charlie.mBelowScreenCounter//screenCounter;
            //    belowScreenCounter = screenCounter;

            //    upperRocks = ResourceManager.mUpperRockArray[screenCounter];

            this.earth.Update();
        }
        else {

        }
        this.draw();
    }


    private draw(): void {

        this.ctx.fillStyle = "black";
        this.rect(0, 0, this.WIDTH, this.HEIGHT);
        this.ctx.beginPath();

        if (!this.belowMoon) {

            this.earth.Draw(this.ctx);

            for (var j = 0; j < 8; j++) {

                var rock = this.upperRocks[this.screenCounter][j];
                var rocks = this.upperRocks[j];
                this.ctx.drawImage(this.moonRocks, (this.upperRocks[this.screenCounter][j] * this.rockWidth), 0, this.rockWidth, this.rockHeight, (j * this.rockWidth), 170, this.rockWidth, this.rockHeight);
                this.ctx.drawImage(this.moonRocks, (this.upperRocks[this.screenCounter][j] * this.rockWidth), this.rockHeight, this.rockWidth, this.rockHeight, (j * this.rockWidth), 400, this.rockWidth, this.rockHeight);
            }

            // Draw the holes
            if (this.resourceManager.mHoleArray0[this.screenCounter] == 1) {
                this.ctx.drawImage(this.moonRocks, 0, 300, this.rockWidth, this.rockHeight, this.hole0X, this.holesY, this.rockWidth, this.rockHeight);

                //draw the collisionTile
                //Not defined yet..                   this.ctx.drawImage(this.collisionTile, this.hole0X, this.holesY);
                //Update the rectangle used for collision
                //this.holeRect0.left = this.hole0X;
                //this.holeRect0.top = holesY;
                //this.holeRect0.right = hole0X + 69;
                //this.holeRect0.bottom = holesY + 18;

                // Blue rectangle
                this.ctx.beginPath();
                this.ctx.lineWidth = 2;
                this.ctx.strokeStyle = "blue";
                this.ctx.rect(this.hole0X, this.holesY, this.rockWidth, 30);
                this.ctx.stroke();

            }
            if (this.resourceManager.mHoleArray1[this.screenCounter] == 1) {
                this.ctx.drawImage(this.moonRocks, 0, 300, this.rockWidth, this.rockHeight, this.hole1X, this.holesY, this.rockWidth, this.rockHeight);
                //    //draw the collisionTile
                //    this.ctx.drawImage(this.collisionTile, this.hole1X, this.holesY);
                //    //this.holeRect1.left = hole1X;
                //    //this.holeRect1.top = holesY;
                //    //this.holeRect1.right = hole1X + 69;
                //    //this.holeRect1.bottom = holesY + 18;

                this.ctx.beginPath();
                this.ctx.lineWidth = 2;
                this.ctx.strokeStyle = "blue";
                this.ctx.rect(this.hole1X, this.holesY, this.rockWidth, 30);
                this.ctx.stroke();
            }
        }
        else {

            var width = 62;
            var height = 48;
            //var imagePosX = 0;
            //var imagePosY = 0;

            for (var ii = 0; ii < 10; ii++) {


                // Clear the array of ledges
                this.platformList = [];
                this.platform = [];
                var temp;

                // Get the repective level row
                //var platforms = (ResourceManager.levels[(belowScreenCounter * 10) + ii]);
                this.platform = (this.resourceManager.levels[(this.belowScreenCounter * 10) + ii]);
                //var platforms = (ResourceManager.ToTheUnderGround[(belowScreenCounter * 10) + ii]);
                ////var platforms = (ResourceManager.ToTheUnderGround[(screenCounter * 10) + ii]);

                for (var jj = 0; jj < 13; jj++) {

                    //var temp = [];

                    // Iterate through the array & point to the start position of the texture to be grabbed by the wallRect
                    //var platforms = (ResourceManager.levels[(belowScreenCounter * 10) + ii, jj]); 
                    //var platforms = (ResourceManager.ToTheUnderGround[(belowScreenCounter * 10) + ii, jj]); 

                    switch (this.platform[jj]) {
                        // Walls
                        case 0:
                            // this.ctx.drawImage(moonRocks, x, y, rockWidth, rockHeight, screenPositionX, screenPositionY, rockWidth, rockHeight);					
                            this.ctx.drawImage(this.unGroundLedges, 0 * width, 0, 60, 48, width * jj, 50 + (height * ii), 60, 48);
                            break;

                        case 1:
                            this.ctx.drawImage(this.unGroundLedges, 1 * width, 0, 60, 48, width * jj, 50 + (height * ii), 60, 48);
                            break;

                        case 2:
                            this.ctx.drawImage(this.unGroundLedges, 2 * width, 0, 60, 48, width * jj, 50 + (height * ii), 60, 48);
                            break;

                        case 3:
                            this.ctx.drawImage(this.unGroundLedges, 3 * width, 0, 60, 48, width * jj, 50 + (height * ii), 60, 48);
                            break;

                        //Empty space - no need to draw...
                        //                    case 4:

                        // Floor 
                        case 5:
                            this.ctx.drawImage(this.unGroundLedges, 5 * width, 0, 60, 48, width * jj, 50 + (height * ii), 60, 48);
                            temp = { left: width * jj, top: 50 + (height * ii), right: width * jj + width, bottom: height * ii + height };
                            this.platformList.push(temp);
                            // populate the pla
                            //this.plats.left = width * jj;
                            break

                        case 6:
                            this.ctx.drawImage(this.unGroundLedges, 6 * width, 0, 60, 48, width * jj, 50 + (height * ii), 60, 48);
                            temp = { left: width * jj, top: 50 + (height * ii), right: width, bottom: height };
                            this.platformList.push(temp);
                            break

                        case 7:
                            this.ctx.drawImage(this.unGroundLedges, 7 * width, 0, 60, 48, width * jj, 50 + (height * ii), 60, 48);
                            temp = { left: width * jj, top: 50 + (height * ii), right: width, bottom: height };
                            this.platformList.push(temp);
                            break

                        case 8:
                            this.ctx.drawImage(this.unGroundLedges, 8 * width, 0, 60, 48, width * jj, 50 + (height * ii), 60, 48);
                            temp = { left: width * jj, top: 50 + (height * ii), right: width, bottom: height };
                            this.platformList.push(temp);
                            break

                        // Ledges
                        case 9:
                            this.ctx.drawImage(this.unGroundLedges, 9 * width, 0, 60, 48, width * jj, 50 + (height * ii), 60, 48);
                            temp = { left: width * jj, top: 50 + (height * ii), right: width, bottom: height };
                            this.platformList.push(temp);
                            break;

                        case 10:
                            this.ctx.drawImage(this.unGroundLedges, 10 * width, 0, 60, 48, width * jj, 50 + (height * ii), 60, 48);
                            temp = { left: width * jj, top: 50 + (height * ii), right: width, bottom: height };
                            this.platformList.push(temp);
                            break;

                        case 11:
                            this.ctx.drawImage(this.unGroundLedges, 11 * width, 0, 60, 48, width * jj, 50 + (height * ii), 60, 48);
                            temp = { left: width * jj, top: 50 + (height * ii), right: width, bottom: height };
                            this.platformList.push(temp);
                            break;

                        case 12:
                            this.ctx.drawImage(this.unGroundLedges, 12 * width, 0, 60, 48, width * jj, 50 + (height * ii), 60, 48);
                            temp = { left: width * jj, top: 50 + (height * ii), right: width, bottom: height };
                            this.platformList.push(temp);
                            break;

                        case 16:
                            this.ctx.drawImage(this.unGroundLedges, 16 * width, 0, 60, 48, width * jj, 50 + (height * ii), 60, 48);
                            temp = { left: width * jj, top: 50 + (height * ii), right: width, bottom: height };
                            this.platformList.push(temp);
                            break;

                        case 17:
                            this.ctx.drawImage(this.unGroundLedges, 16 * width, 0, 60, 48, width * jj, 50 + (height * ii), 60, 48);
                            temp = { left: width * jj, top: 50 + (height * ii), right: width, bottom: height };
                            this.platformList.push(temp);
                            break;

                        case 18:
                            this.ctx.drawImage(this.unGroundLedges, 18 * width, 0, 60, 48, width * jj, 50 + (height * ii), 60, 48);
                            temp = { left: width * jj, top: 50 + (height * ii), right: width, bottom: height };
                            this.platformList.push(temp);
                            break;

                        case 19:
                            this.ctx.drawImage(this.unGroundLedges, 19 * width, 0, 60, 48, width * jj, 50 + (height * ii), 60, 48);
                            temp = { left: width * jj, top: 50 + (height * ii), right: width, bottom: height };
                            this.platformList.push(temp);
                            break;

                        // Orbs    
                        case 20:
                            this.ctx.drawImage(this.unGroundLedges, 0 * width, height, 60, 48, width * jj, 50 + (height * ii), 60, 48);
                            temp = { left: width * jj, top: 50 + (height * ii), right: width, bottom: height };
                            this.platformList.push(temp);
                            break;

                        case 21:
                            this.ctx.drawImage(this.unGroundLedges, 1 * width, height, 60, 48, width * jj, 50 + (height * ii), 60, 48);
                            temp = { left: width * jj, top: 50 + (height * ii), right: width, bottom: height };
                            this.platformList.push(temp);
                            break;

                        case 22:
                            this.ctx.drawImage(this.unGroundLedges, 2 * width, height, 60, 48, width * jj, 50 + (height * ii), 60, 48);
                            temp = { left: width * jj, top: 50 + (height * ii), right: width, bottom: height };
                            this.platformList.push(temp);
                            break;

                        case 23:
                            this.ctx.drawImage(this.unGroundLedges, 3 * width, height, 60, 48, width * jj, 50 + (height * ii), 60, 48);
                            temp = { left: width * jj, top: 50 + (height * ii), right: width, bottom: height };
                            this.platformList.push(temp);
                            break;

                        // Diamond ledges 
                        case 25:
                            this.ctx.drawImage(this.unGroundLedges, 5 * width, height, 60, 48, width * jj, 50 + (height * ii), 60, 48);
                            temp = { left: width * jj, top: 50 + (height * ii), right: width, bottom: height };
                            this.platformList.push(temp);
                            break;

                        case 26:
                            this.ctx.drawImage(this.unGroundLedges, 6 * width, height, 60, 48, width * jj, 50 + (height * ii), 60, 48);
                            temp = { left: width * jj, top: 50 + (height * ii), right: width, bottom: height };
                            this.platformList.push(temp);
                            break;
                    }
                }
            }
        }

        //    //    doCollision();
        this.charlie.Draw(this.ctx);

        //    //this.ctx.restore();
        //    this.ctx.drawImage(colRect, 100, 100);
        //    this.ctx.drawImage(panel, 40, 520);
        //    ctx.fillStyle = "Yellow";
        //    //this.ctx.font = "30px Arial";

        //    this.ctx.fillText("Charlie Collision Rectangle Pos x= " + Charlie.charlieRect.left.toString(), 10, 20);
        //    this.ctx.fillText("Charlie Collision Rectangle Pos Y= " + Charlie.charlieRect.top.toString(), 10, 30);
        //    this.ctx.fillText("Charlie X = " + Charlie.mPositionX.toString(), 10, 40);
        //    this.ctx.fillText("Charlie Y = " + Charlie.mPositionY.toString(), 10, 50);
        //    this.ctx.fillText("Screen Counter = " + screenCounter.toString(), 10, 60);
        //    this.ctx.fillText("Below Screen Counter = " + belowScreenCounter.toString(), 10, 70);
        //    this.ctx.fillText("somersault = " + somersault, 10, 80);
        //    //    this.ctx.fillText("Num of Ledges = " + this.platform.length.toString(), 10, 30);
        //    //    this.ctx.fillText("Collision = " + collision.toString(), 10, 80);

        //    this.ctx.fill();
    }


    //// Simple collsion detection
    doCollision() {
        //    if (Charlie.mPositionX == 160 && !belowMoon) {
        //        //collision = true;
        //        //belowMoon = true;
        //        //falling = true;
        //        Charlie.initFalling(screenCounter);
        //        belowMoon = true;
        //    }
        //    else {
        //        collision = false;
        //    }

        //    for (var i = 0; i < this.platform.length; i++) {

        //        var val1 = Charlie.mFeet;
        //        var val2 = this.platform[i].y;
        //        var val3 = Charlie.mPositionX + Charlie.mWidth;
        //        var val4 = this.platform[i].x;
        //        var val5 = this.platform[i].x + this.platform[i].rectWidth;

        //        //var meTest = this.platform[i].y;

        //        if (Charlie.mFeet == this.platform[i].y &&
        //            (Charlie.mPositionX + Charlie.mWidth) >= this.platform[i].x &&
        //            Charlie.mPositionX <= (this.platform[i].x + this.platform[i].rectWidth)) {

        //            Charlie.mFalling = false;
        //            //Charlie.mPositionY -= 30;
        //            break;
        //        }
        //        else {
        //            Charlie.mFalling = true;
        //        }
        //    }
    }

}
export = Nodes;