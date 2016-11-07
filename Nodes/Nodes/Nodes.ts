import Charlie = require("Charlie");
import Earth = require("Earth");
import Rectangle = require("Rectangle");
import ResourceManager = require("ResourceManager");
import Rocket = require("Rocket");

class Nodes {

    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private width: number = 800;
    private height: number = 600;

    ////----- Surface Arrays -----
    private upperRocks: Array<number[]>;
    private holes1: Array<number>;
    private holes2: Array<number>;

    //private List<Enemy> enemies = new List<Enemy>();
    //// Floor textures
    //private List<Rectangle> rects = new List<Rectangle>();
    //// Platforms & Ledges
    //private List<Rectangle> platform = new List<Rectangle>();
    //// Standard Walls
    //private List<Rectangle> walls = new List<Rectangle>();
    //// Mole edible
    //private List<Rectangle> edibleWalls = new List<Rectangle>();
    //// Alcheims
    //private List<Rectangle> alchiems = new List<Rectangle>();
    //// Roof rocks
    //private List<Rectangle> roof = new List<Rectangle>();

    //// Enemies
    enemies: Array<number>;

    //// Floor textures
    floor: Array<number>;

    ////Platforms & Ledges
    platformz: Array<Rectangle> = new Array<Rectangle>();//number>;

    //// Standard Walls
    walls: Array<Rectangle> = new Array<Rectangle>();    //walls: Array<number>;

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
    platforms: Array<number>;// = 0;

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


    private screenChange: boolean = false;

    //var alchiem = 0;
    //var startTime = new Date().getTime();
    //var currentTime;

    //// Objects
    //var Alf;
    private resourceManager: ResourceManager;
    private charlie: Charlie;
    private earth: Earth;
    private rocket: Rocket;
    //// Set the screen position for the Y-value
    //var yScreenPosition = 100;
    //var spacing = 30;

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
        this.ctx.clearRect(0, 0, this.width, this.height);
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

        this.resourceManager = new ResourceManager(this.gameSprites, this.enemies, this.walls, this.platformz, this.ctx);
        this.upperRocks = this.resourceManager.mUpperRockArray;

        //    holes1 = ResourceManager.mHoleArray0;
        //    holes2 = ResourceManager.mHoleArray1;

        // Create the Actors
        this.charlie = new Charlie(150, 320, 3, this.gameSprites, this.walls, this.platformz);//350
        this.earth = new Earth(this.gameSprites);
        this.rocket = new Rocket(this.gameSprites);
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
                this.somersault = true;
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
            case 113:
                this.belowMoon = false;
                this.charlie.Y = 320;
                this.belowScreenCounter = 0;
                this.screenCounter = 0;
                break;
        }
    }

    onKeyboardRelease(event: Event, touchDevice: boolean) {
        switch (((<number>(<KeyboardEvent>event).keyCode | 0))) {
            case 17:
                this.somersault = false;
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


        this.screenChange = false;

        if (this.moveLeft && !this.charlie.Falling) {// && !this.charlie.msomersaultJump) {
            this.charlie.Update(0);
        }

        if (this.moveRight && !this.charlie.Falling) {// && !this.charlie.msomersaultJump) {
            this.charlie.Update(1);
        }

        // Trigger the somersault
        if (this.somersault) {
            this.charlie.Somersault = true;
            //this.charlie.Update(1);
            //this.somersault = false;
            //this.charlie.Summersault = false;
        }

        if (this.charlie.Somersault && !this.charlie.Direction) {
            this.charlie.Update(0);
        }

        if (this.charlie.Somersault && this.charlie.Direction) {
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
                this.belowScreenCounter -= 1;
                //this.belowScreenCounter = (this.belowScreenCounter - 1) % 15;
                //Charlie.mBelowScreenCounter -= 1;
                //Charlie.mBelowScreenCounter = (Charlie.mBelowScreenCounter - 1) % 15;
            }
            else {
                this.screenCounter = 15; //8
                this.belowScreenCounter += 15;
                //Charlie.mBelowScreenCounter += 1;
            }

            this.charlie.X = 680;
            this.screenChange = true;
        }

        else if (this.charlie.X > 770) {
            if (this.screenCounter < 15) //8
            {
                this.screenCounter += 1;
                this.belowScreenCounter += 1;
                //Charlie.mBelowScreenCounter += 1;
                //this.charlie.X = 0;
            }
            else {
                this.screenCounter = 0;
                this.belowScreenCounter -= 15;
                //Charlie.mBelowScreenCounter -= 15;
                //this.charlie.X = 55;
            }

            //screenCounter = (screenCounter + 1) % 15;
            this.charlie.X = 100;
            this.screenChange = true;
            //Charlie.mBelowScreenCounter = screenCounter;
            //belowScreenCounter = screenCounter;
        }



        if (!this.belowMoon) {

            // if there is a hole position the rectangle 
            if (this.resourceManager.mHoleArray0[this.screenCounter] == 1) {
                this.charlie.HoleRectangle1 = new Rectangle(this.hole0X + 20, this.holesY + 20, 60, this.holesY + 40);
            }

            // other wise move it out of the way...
            else {
                this.charlie.HoleRectangle1 = new Rectangle(0, 0, 0, 0);
            }

            if (this.charlie.Falling) {
                this.belowMoon = true;
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

            if (this.charlie.Falling) {
                if (this.charlie.Y < 12) {
                    //graphicsMan.configureEnemies(belowScreenCounter);
                    this.resourceManager.configureEnemies(this.screenCounter);
                }
                this.charlie.Y += 2;
                if (this.charlie.Y >= 425) {
                    this.charlie.Y = 20; //man.YPosition = 20;
                    this.charlie.Walking = false;
                    this.belowScreenCounter += 16;
                    this.clearAll();
                    this.resourceManager.configureEnemies(this.belowScreenCounter);
                }
                if (this.charlie.Y <= 15 && this.belowScreenCounter > 15) {
                    this.charlie.Y = 400;
                    this.belowScreenCounter -= 16;
                    this.charlie.Jump = false;
                    this.clearAll();
                }
            }
            if (!this.charlie.Falling) {
                // Allow us to jump out from under the moon surface....
                if (this.charlie.Y <= 30 && this.belowScreenCounter < 15) {
                    this.charlie.Falling = false;
                    this.charlie.Walking = false;
                    this.belowMoon = false;
                    this.charlie.Y = 250;
                    this.clearAll();
                    this.belowScreenCounter = 0;
                    this.resourceManager.configureEnemies(this.belowScreenCounter);
                }
                if (this.charlie.Y <= 15 && this.belowScreenCounter > 15) {
                    this.charlie.Y = 400;
                    this.belowScreenCounter -= 16;
                    this.charlie.Jump = false;
                    this.clearAll();
                }
            }
        }
        this.rocket.Update();
        this.charlie.Collisions(this.belowMoon, this.screenChange);
        //var test = this.charlie.BelowMoonSurface;

        this.draw();
    }


    private draw(): void {

        this.ctx.fillStyle = "black";
        this.rect(0, 0, this.width, this.height);
        this.ctx.beginPath();

        if (!this.belowMoon) {

            if (this.rocket.RocketScreen == this.screenCounter) {
                this.rocket.Draw(this.ctx);
            }

            this.earth.Draw(this.ctx);

            for (var j = 0; j < 8; j++) {

                var rock = this.upperRocks[this.screenCounter][j];
                var rocks = this.upperRocks[j];
                this.ctx.drawImage(this.moonRocks, (this.upperRocks[this.screenCounter][j] * this.rockWidth), 0, this.rockWidth, this.rockHeight, (j * this.rockWidth), 170, this.rockWidth, this.rockHeight);
                this.ctx.drawImage(this.moonRocks, (this.upperRocks[this.screenCounter][j] * this.rockWidth), this.rockHeight, this.rockWidth, this.rockHeight, (j * this.rockWidth), 400, this.rockWidth, this.rockHeight);
            }

            // Draw the holes
            if (this.resourceManager.mHoleArray0[this.screenCounter] == 1) {
                ////               this.ctx.drawImage(this.moonRocks, 0, 300, this.rockWidth, this.rockHeight, this.hole0X, this.holesY, this.rockWidth, this.rockHeight);

                // Blue rectangle
                this.ctx.beginPath();
                this.ctx.lineWidth = 2;
                this.ctx.strokeStyle = "blue";
                //this.ctx.rect(this.hole0X, this.holesY, this.rockWidth, 30);
                this.ctx.rect(this.hole0X + 20, this.holesY + 20, 60, this.holesY + 40);
                this.ctx.stroke();

            }
            if (this.resourceManager.mHoleArray1[this.screenCounter] == 1) {
                ////               this.ctx.drawImage(this.moonRocks, 0, 300, this.rockWidth, this.rockHeight, this.hole1X, this.holesY, this.rockWidth, this.rockHeight);

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


            this.platformz = [];
            this.walls = [];

            for (var ii = 0; ii < 10; ii++) {


                // Clear the array of ledges
                this.platformList = [];
                this.platforms = [];
                var temp;

                // Get the repective level row
                this.platforms = (this.resourceManager.levels[(this.belowScreenCounter * 10) + ii]);

                for (var jj = 0; jj < 13; jj++) {

                    //var temp = [];

                    // Iterate through the array & point to the start position of the texture to be grabbed by the wallRect
                    //var platforms = (ResourceManager.levels[(belowScreenCounter * 10) + ii, jj]); 
                    //var platforms = (ResourceManager.ToTheUnderGround[(belowScreenCounter * 10) + ii, jj]); 

                    switch (this.platforms[jj]) {
                        // Walls
                        case 0:
                            // this.ctx.drawImage(moonRocks, x, y, rockWidth, rockHeight, screenPositionX, screenPositionY, rockWidth, rockHeight);                             
                            this.ctx.drawImage(this.unGroundLedges, 0 * width, 0, 60, 48, width * jj, 50 + (height * ii), 60, 48);
                            this.walls.push(new Rectangle(width * jj, 50 + (height * ii), width, height));
                            this.ctx.beginPath();
                            this.ctx.lineWidth = 1;
                            this.ctx.strokeStyle = "yellow";
                            this.ctx.rect(width * jj, 50 + (height * ii), width, height);
                            this.ctx.stroke();
                            break;

                        case 1:
                            this.ctx.drawImage(this.unGroundLedges, 1 * width, 0, 60, 48, width * jj, 50 + (height * ii), 60, 48);
                            this.walls.push(new Rectangle(width * jj, 50 + (height * ii), width, height));
                            this.ctx.beginPath();
                            this.ctx.lineWidth = 1;
                            this.ctx.strokeStyle = "yellow";
                            this.ctx.rect(width * jj, 50 + (height * ii), width, height);
                            this.ctx.stroke();
                            break;

                        case 2:
                            this.ctx.drawImage(this.unGroundLedges, 2 * width, 0, 60, 48, width * jj, 50 + (height * ii), 60, 48);
                            this.walls.push(new Rectangle(width * jj, 50 + (height * ii), width, height));
                            this.ctx.beginPath();
                            this.ctx.lineWidth = 1;
                            this.ctx.strokeStyle = "yellow";
                            this.ctx.rect(width * jj, 50 + (height * ii), width, height);
                            this.ctx.stroke();
                            break;

                        case 3:
                            this.ctx.drawImage(this.unGroundLedges, 3 * width, 0, 60, 48, width * jj, 50 + (height * ii), 60, 48);
                            this.walls.push(new Rectangle(width * jj, 50 + (height * ii), width, height));
                            this.ctx.beginPath();
                            this.ctx.lineWidth = 1;
                            this.ctx.strokeStyle = "yellow";
                            this.ctx.rect(width * jj, 50 + (height * ii), width, height);
                            this.ctx.stroke();
                            break;

                        //Empty space - no need to draw...
                        //                    case 4:

                        // Floor 
                        case 5:
                            this.ctx.drawImage(this.unGroundLedges, 5 * width, 0, 60, 48, width * jj, 50 + (height * ii), 60, 48);
                            //temp = { left: width * jj, top: 50 + (height * ii), right: width * jj + width, bottom: height * ii + height };
                            //this.platformList.push(temp);
                            this.platformz.push(new Rectangle(width * jj, 50 + (height * ii), width, height));
                            this.ctx.beginPath();
                            this.ctx.lineWidth = 1;
                            this.ctx.strokeStyle = "blue";
                            this.ctx.rect(width * jj, 50 + (height * ii), width, height);
                            this.ctx.stroke();

                            break

                        case 6:
                            this.ctx.drawImage(this.unGroundLedges, 6 * width, 0, 60, 48, width * jj, 50 + (height * ii), 60, 48);
                            //temp = { left: width * jj, top: 50 + (height * ii), right: width, bottom: height };
                            //this.platformList.push(temp);
                            this.platformz.push(new Rectangle(width * jj, 50 + (height * ii), width, height));
                            this.ctx.beginPath();
                            this.ctx.lineWidth = 1;
                            this.ctx.strokeStyle = "blue";
                            this.ctx.rect(width * jj, 50 + (height * ii), width, height);
                            this.ctx.stroke();
                            break

                        case 7:
                            this.ctx.drawImage(this.unGroundLedges, 7 * width, 0, 60, 48, width * jj, 50 + (height * ii), 60, 48);
                            //temp = { left: width * jj, top: 50 + (height * ii), right: width, bottom: height };
                            //this.platformList.push(temp);
                            this.platformz.push(new Rectangle(width * jj, 50 + (height * ii), width, height));
                            this.ctx.beginPath();
                            this.ctx.lineWidth = 1;
                            this.ctx.strokeStyle = "blue";
                            this.ctx.rect(width * jj, 50 + (height * ii), width, height);
                            this.ctx.stroke();
                            break

                        case 8:
                            this.ctx.drawImage(this.unGroundLedges, 8 * width, 0, 60, 48, width * jj, 50 + (height * ii), 60, 48);
                            //temp = { left: width * jj, top: 50 + (height * ii), right: width, bottom: height };
                            //this.platformList.push(temp);
                            this.platformz.push(new Rectangle(width * jj, 50 + (height * ii), width, height));
                            this.ctx.beginPath();
                            this.ctx.lineWidth = 1;
                            this.ctx.strokeStyle = "green";
                            this.ctx.rect(width * jj, 50 + (height * ii), width, height);
                            this.ctx.stroke();
                            break

                        // Ledges
                        case 9:
                            this.ctx.drawImage(this.unGroundLedges, 9 * width, 0, 60, 48, width * jj, 50 + (height * ii), 60, 48);
                            //temp = { left: width * jj, top: 50 + (height * ii), right: width, bottom: height };
                            //temp = new Rectangle(width * jj, 50 + (height * ii), width, height);
                            //this.platformList.push(temp);
                            this.platformz.push(new Rectangle(width * jj, 50 + (height * ii), width, height));
                            this.ctx.beginPath();
                            this.ctx.lineWidth = 1;
                            this.ctx.strokeStyle = "green";
                            this.ctx.rect(width * jj, 50 + (height * ii), width, height);
                            this.ctx.stroke();
                            break;

                        case 10:
                            this.ctx.drawImage(this.unGroundLedges, 10 * width, 0, 60, 48, width * jj, 50 + (height * ii), 60, 48);
                            //temp = { left: width * jj, top: 50 + (height * ii), right: width, bottom: height };
                            //this.platformList.push(temp);
                            this.platformz.push(new Rectangle(width * jj, 50 + (height * ii), width, height));
                            this.ctx.beginPath();
                            this.ctx.lineWidth = 1;
                            this.ctx.strokeStyle = "green";
                            this.ctx.rect(width * jj, 50 + (height * ii), width, height);
                            this.ctx.stroke();
                            break;

                        case 11:
                            this.ctx.drawImage(this.unGroundLedges, 11 * width, 0, 60, 48, width * jj, 50 + (height * ii), 60, 48);
                            //temp = { left: width * jj, top: 50 + (height * ii), right: width, bottom: height };
                            //this.platformList.push(temp);

                            break;

                        case 12:
                            this.ctx.drawImage(this.unGroundLedges, 12 * width, 0, 60, 48, width * jj, 50 + (height * ii), 60, 48);
                            temp = { left: width * jj, top: 50 + (height * ii), right: width, bottom: height };
                            this.platformList.push(temp);
                            break;

                        // edible walls
                        case 16:
                            this.ctx.drawImage(this.unGroundLedges, 16 * width, 0, 60, 48, width * jj, 50 + (height * ii), 60, 48);
                            //temp = { left: width * jj, top: 50 + (height * ii), right: width, bottom: height };
                            //this.platformList.push(temp);
                            this.walls.push(new Rectangle(width * jj, 50 + (height * ii), width, height));
                            this.ctx.beginPath();
                            this.ctx.lineWidth = 2;
                            this.ctx.strokeStyle = "orange";
                            this.ctx.rect(width * jj, 50 + (height * ii), width, height);
                            this.ctx.stroke();
                            break;

                        case 17:
                            this.ctx.drawImage(this.unGroundLedges, 17 * width, 0, 60, 48, width * jj, 50 + (height * ii), 60, 48);
                            //temp = { left: width * jj, top: 50 + (height * ii), right: width, bottom: height };
                            //this.platformList.push(temp);
                            this.walls.push(new Rectangle(width * jj, 50 + (height * ii), width, height));
                            this.ctx.beginPath();
                            this.ctx.lineWidth = 2;
                            this.ctx.strokeStyle = "blue";
                            this.ctx.rect(width * jj, 50 + (height * ii), width, height);
                            this.ctx.stroke();

                            break;

                        case 15://18
                            //this.ctx.drawImage(this.unGroundLedges, 18 * width, 0, 60, 48, width * jj, 50 + (height * ii), 60, 48);
                            this.ctx.drawImage(this.unGroundLedges, 15 * width, 0, 60, 48, width * jj, 50 + (height * ii), 60, 48);
                            //temp = { left: width * jj, top: 50 + (height * ii), right: width, bottom: height };
                            //this.platformList.push(temp);
                            this.walls.push(new Rectangle(width * jj, 50 + (height * ii), width, height));
                            this.ctx.beginPath();
                            this.ctx.lineWidth = 2;
                            this.ctx.strokeStyle = "pink";
                            this.ctx.rect(width * jj, 50 + (height * ii), width, height);
                            this.ctx.stroke();
                            break;

                        case 18:
                            this.ctx.drawImage(this.unGroundLedges, 18 * width, 0, 60, 48, width * jj, 50 + (height * ii), 60, 48);
                            //temp = { left: width * jj, top: 50 + (height * ii), right: width, bottom: height };
                            //this.platformList.push(temp);
                            this.walls.push(new Rectangle(width * jj, 50 + (height * ii), width, height));
                            this.ctx.beginPath();
                            this.ctx.lineWidth = 2;
                            this.ctx.strokeStyle = "yellow";
                            this.ctx.rect(width * jj, 50 + (height * ii), width, height);
                            this.ctx.stroke();
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

            this.charlie.Ledges = this.platformz;
            this.charlie.Walls = this.walls;

        }

        this.charlie.Draw(this.ctx);





        this.ctx.font = "12px Arial";
        this.ctx.fillStyle = "yellow";

        this.ctx.fillText("Screen Number : " + this.screenCounter, 10, 90);
        this.ctx.fillText("Below Surface Screen Number : " + this.belowScreenCounter, 10, 110);
        this.ctx.fillText("Changing screen : " + this.screenChange, 10, 130);
        this.ctx.drawImage(this.panel, 40, 520);

    }

    private clearAll(): void {
        this.enemies = [];//  .Clear();
        //this.rects = [];//.Clear();
        this.walls = [];//.Clear();
        this.platformz = [];//.Clear();
        this.edibleWalls = [];//.Clear();
        this.alchiems = [];//.Clear();
        //this.testList = [];//.Clear();
        //if (this.roof.length > 0) {
        //    this.roof = [];//.Clear();
        //}
    }
}
export = Nodes;