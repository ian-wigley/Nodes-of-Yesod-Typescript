import Charlie = require("Charlie");
import Earth = require("Earth");
import Enemy = require("Enemy");
import Explosion = require("Explosion");
import KeyBoard = require("Input");
import Mole = require("Mole");
import Rectangle = require("Rectangle");
import ResourceManager = require("ResourceManager");
import Rocket = require("Rocket");
import ScreenInfo = require("ScreenInfo");
import Star = require("Star");
import Tile = require("./Tile");
import { charliesState } from "./CharliesState";
import { gameMode } from "./GameState";
import { moleState } from "./MoleState";
import { direction } from "./Direction";

class Nodes {

    private canvas!: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private width: number = 800;
    private height: number = 600;

    // Enemies
    private walkingEnemies!: Array<Enemy>;

    // Mole edible
    private edibleWalls: Array<Rectangle> = new Array<Rectangle>();

    // Alcheims
    private alchiems: Array<number> = [];

    private stars: Array<Star> = [];

    // Images
    private gameSprites!: HTMLCanvasElement;
    private panel!: HTMLCanvasElement;
    private tiles!: HTMLCanvasElement;
    private frontScreen!: HTMLCanvasElement;
    private gameInstructions !: HTMLCanvasElement;

    private animTimer: number = 0;
    private heartBeatTimer: number = 0;
    private clockTimer: number = 0;
    private elapsedClockSecs: number = 1.0;
    private elapsedSecs: number = 0.1;
    private percentage: number = 0;

    private screenCounter: number = 0;

    // private screen: any;
    private screen: Tile;
    private rects: any;

    private charlieState: charliesState = charliesState.IDLE;

    private immune: boolean = false;

    private moleAlive: boolean = false;
    private molestate: moleState = moleState.Free;

    private gameState: gameMode;
    private gamePaused: boolean = false;

    private startTime = new Date();
    private seconds: number = 0;
    private minutes: number = 0;
    private originalSeconds = new Date().getSeconds();
    private originalMinutes: number;// = new Date().getMinutes();
    private m_animTimer: number = 0;

    private currentTime: number = 0;
    private seatedTime: number = 0;
    private elapsedSeatedTime: number = 0;
    private immunityTime: number = 0;
    private enemyCollidedWith: number = 0;
    private numberOfScreensFell: number = 0;

    // Objects
    private resourceManager!: ResourceManager;
    private charlie!: Charlie;
    private earth!: Earth;
    private explosion!: Explosion;
    private mole!: Mole;
    private rocket!: Rocket;
    private keyboard!: KeyBoard;
    private screenInfo!: ScreenInfo;
    private gravityStick: number = 0;
    private sineCounter: number = 0;

    private scrollText: string = "NODES OF YESOD REMAKE        CATCH A MOLE,  FIND A HOLE,  JUMP RIGHT DOWN,  AND START TO ROLL.  WHAT YOU DO IS FIND A CLUE,  OF RED, MAGENTA, GREEN OR BLUE.  TAKE SOME TIME,  DESCEND AND CLIMB,  GO AND FIND THE RÿGHT ALCHIEMS.  THE TASK IS PLAIN,  WITH EÿGHT THE SAME,  SEEK THE MONOLITH AND THATS THE GAME.      CTRL TO ABORT GAME      RETURN TO PAUSE THE GAME   ";

    private debug: boolean = true;
    private upScreen: boolean = false;
    private screenChange: boolean = false;

    private row: number = 0;
    private column: number = 0;

    constructor() {
        this.canvas = <HTMLCanvasElement>document.getElementById("canvas");
        const ctx = this.canvas.getContext('2d');
        if (!ctx) {
            throw new Error("getContext('2d') failed");
        }
        this.ctx = ctx;
        this.gameState = gameMode.DISPLAY_MENU;
        this.originalMinutes = Math.floor(new Date().getMinutes());
        this.screen = new Tile();
    }

    private Rect(x: number, y: number, w: number, h: number): void {
        this.ctx.beginPath();
        this.ctx.rect(x, y, w, h);
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.stroke();
    }

    public Run(): void {
        this.Initialize();
        this.Update();
    }

    private Initialize(): void {
        if (this.debug) {
            this.gameSprites = <HTMLCanvasElement>document.getElementById("GameSpritesDebug");
        } else {
            this.gameSprites = <HTMLCanvasElement>document.getElementById("GameSprites");
        }
        this.panel = <HTMLCanvasElement>document.getElementById("Panel");
        this.tiles = <HTMLCanvasElement>document.getElementById("GameTiles");
        this.frontScreen = <HTMLCanvasElement>document.getElementById("FrontScreen");
        this.gameInstructions = <HTMLCanvasElement>document.getElementById("Instructions");

        this.keyboard = new KeyBoard();
        this.screenInfo = new ScreenInfo(this.canvas.width, this.canvas.height);

        this.resourceManager = new ResourceManager(this.gameSprites, this.screenInfo);
        this.resourceManager.Init();

        // Create the Actors
        this.charlie = new Charlie(150, 320, this.gameSprites, this.screenInfo);
        this.mole = new Mole(this.gameSprites, this.screenInfo, this.resourceManager);
        this.earth = new Earth(this.gameSprites, this.screenInfo);
        this.rocket = new Rocket(this.gameSprites, this.screenInfo);
        this.explosion = new Explosion(this.gameSprites, this.screenInfo);

        this.stars = new Array<Star>();
        for (let j = 0; j < 40; j++) {
            this.stars.push(new Star());
        }

        if (this.debug) {
            this.charlie.Debug = true;
            this.mole.Debug = true;
        }

        this.AddHitListener();
    }

    private AddHitListener() {
        window.addEventListener("keydown", (event) => {
            this.onKeyPress(event);
            return null;
        });

        window.addEventListener("keyup", (event) => {
            this.onKeyUp(event);
            return null;
        });
    }

    private onKeyPress(event: KeyboardEvent) {
        event.preventDefault();
        this.onKeyboardPress(event, false);
    }

    private onKeyUp(event: KeyboardEvent) {
        event.preventDefault();
        this.onKeyboardRelease(event, false);
    }

    private onKeyboardPress(event: KeyboardEvent, touchDevice: boolean) {
        switch (event.key) {
            case "Control":
                this.keyboard.jump = true;
                this.upScreen = false;
                break;
            case "ArrowLeft":
                this.keyboard.left = true;
                break;
            case "ArrowUp":
                this.keyboard.up = true;
                break;
            case "ArrowRight":
                this.keyboard.right = true;
                break;
            case "ArrowDown":
                this.keyboard.down = true;
                break;
            case "f":
            case "F":
                this.charlie.Falling = !this.charlie.Falling;
                break;
            case "m":
            case "M":
                if (this.screen.name.includes("BelowMoon") &&
                    this.molestate != moleState.Active &&
                    // this.molestate == moleState.NonActive &&
                    !this.charlie.Falling) {
                    this.moleAlive = !this.moleAlive;
                    this.mole.X = this.charlie.X;
                    this.mole.Y = this.charlie.Y;
                    this.mole.Walls = this.rects;
                    this.mole.EdibleWalls = this.edibleWalls;
                    this.mole.ScreenCounter = this.screenCounter;
                }
                break;
            case "p":
            case "P":
                if (!this.charlie.Falling &&
                    !this.charlie.JumpingUp) {
                    this.gamePaused = !this.gamePaused;
                    this.gameState = this.gamePaused ? gameMode.GAME_PAUSED : gameMode.GAME_ON;
                    this.charlie.SittingDown = this.gamePaused;
                }
                break;
            case "x":
            case "X":
                this.gameState = gameMode.GAME_ON;
                break;
            case "i":
            case "I":
                if (this.gameState != gameMode.GAME_ON) {
                    this.gameState = gameMode.DISPLAY_HELP;
                }
                break;
            case "F1":
                this.charlie.Y = 320;
                this.row = 0;
                this.column = 0;
                this.screenCounter = 0;
                this.charlie.Falling = false;
                this.clearAll();
                break;
            case "F2":
                this.debug = !this.debug;
                this.charlie.Debug = this.debug;
                this.earth.Debug = this.debug;
                this.mole.Debug = this.debug;
                break;
            case "a":
            case "A":
                if (this.screenCounter > 0) {
                    this.row -= 1;
                }
                this.charlie.Falling = false;
                break;
            case "d":
            case "D":
                if (this.screenCounter < 256) {
                    this.row += 1;
                }
                this.charlie.Falling = false;
                break;
            case "w":
            case "W":
                if (this.column >= 16) {
                    this.column -= 16;
                }
                this.charlie.Falling = false;
                break;
            case "z":
            case "Z":
                this.column = (this.column + 16) % 256;
                this.charlie.Falling = false;
                break;
        }
    }

    private onKeyboardRelease(event: KeyboardEvent, touchDevice: boolean) {
        switch (event.key) {
            case "Control":
                this.keyboard.jump = false;
                break;
            case "ArrowLeft":
                this.keyboard.left = false;
                break;
            case "ArrowUp":
                this.keyboard.up = false;
                break;
            case "ArrowRight":
                this.keyboard.right = false;
                break;
            case "ArrowDown":
                this.keyboard.down = false;
                break;
            default:
                break;
        }
    }

    private Update(): void {

        requestAnimationFrame(this.Update.bind(this));

        if (this.gameState == gameMode.GAME_ON) {
            this.UpdateCharlie();
            this.UpdateHorizontalScreens();
            this.UpdateVerticalScreens();
            this.UpdateScreenCounter();

            this.screen = this.resourceManager.GetScreenTiles(this.screenCounter);
            if (this.screenChange && this.screen.name.includes("BelowMoon")) {
                this.walkingEnemies = this.screen.enemies;
                this.edibleWalls = this.screen.edibleWall;
                this.rects = this.screen.rectangleList;
                this.resourceManager.ConfigureEnemies(this.rects, this.walkingEnemies, this.edibleWalls);
                this.screenChange = false;
            }

            if (this.screen != undefined) {
                this.rects = this.screen.rectangleList;
                this.walkingEnemies = this.screen.enemies;
                this.edibleWalls = this.screen.edibleWall;
                // To-do rename this !!
                this.charlie.Plats = this.rects;

                if (this.screen.name.includes("AboveMoon")) {
                    if (this.charlie.Falling) {
                        this.charlie.Y += this.charlie.GetVelocityY(2);
                        // Charlie is falling through a hole in the moon surface.
                        if (this.charlie.Y > 400) {
                            this.mole.Underground = true;
                        }
                    }
                    this.earth.Update();
                    this.CheckIfMoleIsCaught();
                }
                else if (this.screen.name.includes("BelowMoon")) {
                    this.UpdateVerticalScreens();
                    this.UpdateEnemies();
                    if (this.explosion.Active) {
                        this.explosion.Update();
                    }
                }

                this.rocket.Update();
                this.UpdateGameTimer();
                this.UpdateCharlieSeated();
                this.UpdateCharlieImmune();
            }
            this.UpdateHeartBeatTimer();
        }
        this.Draw();
    }

    // TODO update logic to utilse charlieState enum
    private UpdateCharlie() {
        let charlieValue: number = charliesState.IDLE;

        if (!this.charlie.SittingDown) {
            charlieValue = this.UpdateCharlieWithUserInput(charlieValue);
        }

        if (this.charlie.Somersault && this.charlie.Direction == direction.FACE_LEFT) {
            charlieValue = charliesState.SOMERSAULT_LEFT;
        }

        if (this.charlie.Somersault && this.charlie.Direction == direction.FACE_RIGHT) {
            charlieValue = charliesState.SOMERSAULT_RIGHT;
        }

        if (!this.charlie.Somersault && this.charlie.JumpingUp && this.charlie.Direction == direction.FACE_LEFT) {
            charlieValue = charliesState.JUMP_UP;
        }

        if (!this.charlie.Somersault && this.charlie.JumpingUp && this.charlie.Direction == direction.FACE_RIGHT) {
            charlieValue = charliesState.JUMP_UP;
        }

        this.charlie.Update(charlieValue);
    }

    /**
     * Update the screen depending upon Charlie's X position.
    */
    private UpdateVerticalScreens(): void {
        if (this.charlie.Falling) {
            this.charlie.Y += this.charlie.GetVelocityY(2);
            if (this.charlie.Y >= 430 && !this.charlie.JumpingUp) {
                this.charlie.Y = 20;
                this.charlie.Walking = false;
                this.column += 16;
                this.clearAll();
                // Recalculate the screen counter & get the screen & walking enemies
                this.UpdateScreenCounter();
                this.screen = this.resourceManager.GetScreenTiles(this.screenCounter);
                this.rects = this.screen.rectangleList;
                this.edibleWalls = this.screen.edibleWall;
                this.walkingEnemies = this.screen.enemies;
                this.resourceManager.ConfigureEnemies(this.rects, this.walkingEnemies, this.edibleWalls);
            }

            // To-do Fix ! It gets triggered throughout the entire somersault
            if (this.charlie.Y <= 15 && !this.upScreen) {
                // this.charlie.Y = 400;
                this.column -= 16;
                this.upScreen = true;
                // this.clearAll();
            }

            // if (this.charlie.Y <= 15 && this.column > 15) {
            //     this.charlie.Y = 400;
            //     this.column -= 16;
            //     this.clearAll();
            // }
        }
    }

    /**
     * Update the screen depending upon Charlie's X position.
     */
    private UpdateScreenCounter(): void {
        this.screenCounter = this.row + this.column;
    }

    private UpdateEnemies(): void {
        for (const enemy of this.resourceManager.EnemyList) {
            enemy.Update();

            if (enemy.Name == "ChasingEnemy") {
                enemy.CharlieX = this.charlie.X;
                enemy.CharlieY = this.charlie.Y;
            }

            if (!this.charlie.SittingDown && !this.charlie.Falling && !this.immune) {
                //if (charlieRect.Intersects(this.resourceManager.EnemyLists.resourceManager.EnemyList[i].Rectangle)) {
                //    if (this.resourceManager.EnemyList[i].Name == "ChasingEnemy") {
                //        this.charlie.SittingDown = true;
                //        this.seatedTime = new Date().getTime();
                //        this.enemyCollidedWith = i;
                //        if (this.charlie.Direction) {
                //            this.charlie.SeatingFrame = 69;
                //        }
                //        else if (!this.charlie.Direction) {
                //            this.charlie.SeatingFrame = 138;
                //        }
                //    }
                //    this.explosion.Actived = true;
                //    //this.resourceManager.EnemyList[i].Reset();
                //}
            }
        }
    }

    private UpdateCharlieImmune(): void {
        if (this.immune) {
            if ((this.currentTime - this.immunityTime) / 1000 > 2) {
                this.immune = false;
                this.immunityTime = 0;
                this.resourceManager.EnemyList[this.enemyCollidedWith].Reset();
            }
        }
    }

    private UpdateCharlieSeated(): void {
        if (this.charlie.SittingDown) {
            if ((this.currentTime - this.seatedTime) / 1000 > 5) {
                this.charlie.SittingDown = false;
                this.charlie.SeatingFrame = 0; //138;
                this.seatedTime = 0;
                this.immunityTime = new Date().getTime();
                this.immune = true;
            }
        }
    }

    private UpdateGameTimer(): void {
        this.currentTime = new Date().getTime();
        this.seconds = Math.floor((this.currentTime - this.startTime.getTime()) / 1000) % 60;
        let mins = new Date().getMinutes();
        this.minutes = Math.floor(mins - this.originalMinutes);
    }

    /**
     * Update the screen depending upon Charlie's X position.
     */
    private UpdateHorizontalScreens(): void {
        if (this.charlie.X < 5) {
            if (this.row > 0) {
                this.row = (this.row - 1) % 15;
            }
            else {
                this.row = 15;
            }
            this.charlie.X = 680;
            this.screenChange = true;
        }
        if (this.charlie.X > 750) {
            if (this.row < 15) {
                this.row += 1;
            }
            else {
                this.row = 0;
            }
            this.charlie.X = 10;
            this.screenChange = true;
        }
    }

    private UpdateCharlieWithUserInput(charlieValue: number): number {
        if (this.keyboard.left) {
            if (!this.moleAlive && !this.charlie.Falling) {
                charlieValue = 1;
            }
            else if (this.moleAlive && !this.charlie.Falling) {
                this.mole.UpdatePosition(0);
                this.mole.Update();
            }
        }

        if (this.keyboard.right) {
            if (!this.moleAlive && !this.charlie.Falling) {
                charlieValue = 2;
            }
            else if (this.moleAlive && !this.charlie.Falling) {
                this.mole.UpdatePosition(1);
                this.mole.Update();
            }
        }

        if (this.keyboard.left && this.keyboard.jump || this.keyboard.right && this.keyboard.jump) {
            this.charlie.JumpVal = this.charlie.Y;
            this.charlie.Somersault = true;
            this.charlie.Falling = true;
        }

        // Normal jump !
        if (!this.keyboard.left && !this.keyboard.right && this.keyboard.jump && this.screen.name.includes("BelowMoon") && !this.charlie.Somersault) {
            this.charlie.JumpVal = this.charlie.Y;
            this.charlie.JumpingUp = true;
        }

        if (this.keyboard.up && this.moleAlive && !this.charlie.Falling) {
            this.mole.UpdatePosition(2);
        }

        if (this.keyboard.down && this.moleAlive && !this.charlie.Falling) {
            this.mole.UpdatePosition(3);
        }

        if (this.moleAlive) {
            this.mole.Update();
        }
        return charlieValue;
    }

    private CheckIfMoleIsCaught(): void {
        if (this.molestate == moleState.Free && this.mole.MoleScreen == this.screenCounter) {
            let moley: any = { left: this.mole.X, top: this.mole.X, right: 64, bottom: 64, Name: "Mole" };
            if (this.charlie.BoundingRectangle.Intersects(moley)) {
                this.molestate = moleState.Caught;
            }
            this.mole.Update();
        }
    }

    private Draw(): void {

        this.ctx.fillStyle = "black";
        this.Rect(0, 0, this.width, this.height);
        this.ctx.beginPath();

        if (this.gameState == gameMode.GAME_OVER) { this.DisplayGameOver(); }
        if (this.gameState == gameMode.DISPLAY_MENU) { this.DisplayMainMenu(); }
        if (this.gameState == gameMode.DISPLAY_HELP) { this.DisplayMenuInformation(); }
        if (this.gameState == gameMode.GAME_ON || this.gameState == gameMode.GAME_PAUSED) {
            if (this.screen != undefined) {
                this.screen.tiles.forEach((a: { _drawable?: boolean, sx: number; sy: number; sw: number; sh: number; dx: number; dy: number; dw: number; dh: number; }) => {
                    if (a._drawable == undefined || a._drawable) {
                        this.ctx.drawImage(this.tiles, a.sx, a.sy, a.sw, a.sh, a.dx, a.dy, a.dw, a.dh)
                    }
                });
                if (this.screen.name.includes("AboveMoon")) {
                    this.stars.forEach((star: Star) => { star.Draw(this.ctx) });
                    if (this.rocket.RocketScreen == this.screenCounter) {
                        this.rocket.Draw(this.ctx);
                    }
                    this.earth.Draw(this.ctx);
                    if (this.molestate == moleState.Free && this.mole.MoleScreen == this.screenCounter) {
                        // if (!this.moleCaught) {
                        this.mole.Draw(this.ctx);
                    }
                }
                if (this.debug) {
                    this.rects.forEach((element: Rectangle) => {
                        this.DrawDebugRectangles(element.left, element.top, element.right, element.bottom);
                    });
                    this.edibleWalls.forEach((element: Rectangle) => {
                        this.DrawDebugRectangles(element.left, element.top, element.right, element.bottom);
                    });
                }
            }
            else { alert("No Tiles defined for screen : " + this.screenCounter); }

            this.ctx.drawImage(this.gameSprites, (this.heartBeatTimer + 9) * 64, 16 * 69, 68, 68, 420, 520, 64, 64);
            this.ctx.drawImage(this.panel, 50, 530);

            this.DrawHud();
            this.charlie.Draw(this.ctx);

            if (this.moleAlive) {
                this.mole.Draw(this.ctx);
            }

            this.resourceManager.EnemyList.forEach((enemy) => {
                enemy.Draw(this.ctx);
            });


            if (this.explosion.Active) {
                this.explosion.Draw(this.ctx);
            }

            if (this.debug) {
                this.DisplayDebugText()
            }

            this.DisplayTimer();
        }
    }

    private DrawHud(): void {
        if (this.moleAlive) {
            // Draw Moles image on the panel
            this.ctx.drawImage(this.gameSprites, 15 * 64, 13 * 69, 68, 68, 50, 520, 64, 64);
        }
        else {
            this.ctx.drawImage(this.gameSprites, 16 * 64, 13 * 69, 68, 68, 50, 520, 64, 64);
        }
    }

    private DisplayGameOver(): void {
        this.ctx.font = "20px SpaceAge";
        this.ctx.fillStyle = "yellow";
        this.ctx.fillText("GAME OVER", 400, 80);
        this.ctx.fillText("YOU HAVE COMPLETED", 400, 100);
        this.ctx.fillText(this.percentage + " PERCENT", 400, 120);
        this.ctx.fillText("OF THE ADVENTURE", 400, 140);
        this.ctx.fillText("PRESS SPACE FOR MENU", 400, 160);
    }

    private DisplayMainMenu(): void {
        this.ctx.font = "36px SpaceAge";
        this.ctx.fillStyle = "yellow";
        this.ctx.drawImage(this.frontScreen, 0, 0);
        this.ctx.fillText("NODES OF YESOD REMAKE", 160, 20);
        this.ctx.font = "20px SpaceAge";
        this.ctx.fillText("Press I to see the Instructions", 330, 210);
        this.ctx.fillText("Press X to Start the game", 330, 240);
    }

    private DisplayMenuInformation(): void {
        this.ctx.font = "36px SpaceAge";
        this.ctx.fillStyle = "yellow";
        this.ctx.fillText("Game Instructions", 160, 20);
        this.ctx.drawImage(this.gameInstructions, 140, 40);
        this.ctx.font = "20px SpaceAge";
        // this.ctx.fillText("ONCE THE MASTER ALCHIEM IS FOUND, YOU MUST START", 100, 100);
        // this.ctx.fillText("COLLECTING THE ALCHIEMS OF THE SAME SHAPE.", 100, 120);
        // this.ctx.fillText("WHEN YOU HAVE FOUND THE 8 SAME - SHAPED ALCHIEMS,", 100, 140);
        // this.ctx.fillText("YOU MUST RETURN TO THE MASTER ALCHIEM TO COMPLETE", 100, 160);
        // this.ctx.fillText("THE GAME.", 100, 180);
        this.ctx.fillText("Press X to Start the game", 230, 540);
    }

    private DisplayDebugText(): void {
        this.ctx.font = "12px Arial";
        this.ctx.fillStyle = "yellow";
        this.ctx.fillText("Falling : " + this.charlie.Falling, 10, 80);
        this.ctx.fillText("Seated Time : " + this.seatedTime, 10, 92);
        this.ctx.fillText("Current Time : " + this.currentTime, 10, 104);
        this.ctx.fillText("Delta seated Time : " + (this.currentTime - this.seatedTime), 10, 116);
        this.ctx.fillText("Screen Number : " + this.screenCounter, 10, 140);
    }

    private UpdateHeartBeatTimer(): void {
        this.animTimer += 0.1;
        if (this.animTimer > 1.0) {
            this.heartBeatTimer = (this.heartBeatTimer + 1) % 7;
            this.animTimer = 0;
        }
    }

    private DisplayTimer(): void {
        this.ctx.font = "20px SpaceAge";
        this.ctx.fillStyle = "white";
        this.ctx.fillText("3", 415, 554);
        let secondString = this.seconds < 10 ? ":0" + this.seconds : ":" + this.seconds;
        let minuteString = "0" + (this.minutes < 10 ? ":0" + this.minutes : ":" + this.minutes);
        this.ctx.fillText(minuteString + secondString, 635, 554);
    }

    private DrawDebugRectangles(x: number, y: number, w: number, h: number): void {
        this.ctx.beginPath();
        this.ctx.lineWidth = 1;
        this.ctx.strokeStyle = "blue";
        this.ctx.rect(x, y, w, h);
        this.ctx.stroke();
    }

    private clearAll(): void {
        this.resourceManager.ClearEnemies();
        this.edibleWalls = [];
        this.alchiems = [];
        this.rects = [];
    }
}
export = Nodes;