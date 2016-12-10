define(["require", "exports", "Bird", "Charlie", "Earth", "Explosion", "Mole", "Rectangle", "ResourceManager", "Rocket"], function (require, exports, Bird, Charlie, Earth, Explosion, Mole, Rectangle, ResourceManager, Rocket) {
    "use strict";
    var Nodes = (function () {
        function Nodes() {
            this.width = 800;
            this.height = 600;
            this.walkingEnemies = new Array();
            ////Platforms & Ledges
            this.platformz = new Array();
            //// Standard Walls
            this.walls = new Array();
            //// Mole edible
            this.edibleWalls = new Array();
            ////        Rectangle holeRect1;
            ////        Rectangle wallRect;
            ////        Rectangle groundRect;
            ////        Rectangle collisionRects;
            this.animTimer = 0;
            this.heartBeatTimer = 0;
            this.clockTimer = 0;
            this.elapsedClockSecs = 1.0;
            this.elapsedSecs = 0.1;
            this.spriteWidth = 64;
            this.spriteHeight = 69;
            this.currentFrame = 0;
            this.heartBeatFrame = 8;
            this.rockWidth = 100;
            this.rockHeight = 117;
            this.lowerRockWidth = 100;
            this.lowerRockHeight = 100;
            this.unGroTileHeight = 48;
            this.unGroTileWidth = 62;
            this.seconds = 0;
            this.minutes = 0;
            this.hole0X = 300;
            this.hole1X = 500;
            this.holesY = 350; //400;
            this.screenCounter = 0;
            this.belowScreenCounter = 0;
            this.debug = true; //false;
            this.immune = false;
            this.moleAlive = false;
            this.trip = false;
            this.gameOn = false; //true;
            this.jumpRight = false;
            this.belowMoon = false;
            this.screenChange = false;
            //var alchiem = 0;
            this.startTime = new Date().getTime();
            this.currentTime = 0;
            this.seatedTime = 0;
            this.elapsedSeatedTime = 0;
            this.immunityTime = 0;
            this.gravityStick = 0;
            this.sineCounter = 0;
            this.moveLeft = false;
            this.moveRight = false;
            this.somersault = false;
            this.moleMoveLeft = false;
            this.moleMoveRight = false;
            this.scrollText = "NODES OF YESOD REMAKE        CATCH A MOLE,  FIND A HOLE,  JUMP RIGHT DOWN,  AND START TO ROLL.  WHAT YOU DO IS FIND A CLUE,  OF RED, MAGENTA, GREEN OR BLUE.  TAKE SOME TIME,  DESCEND AND CLIMB,  GO AND FIND THE RÿGHT ALCHIEMS.  THE TASK IS PLAIN,  WITH EÿGHT THE SAME,  SEEK THE MONOLITH AND THATS THE GAME.      CTRL TO ABORT GAME      RETURN TO PAUSE THE GAME   ";
            var construct = 0;
        }
        Nodes.prototype.rect = function (x, y, w, h) {
            this.ctx.beginPath();
            this.ctx.rect(x, y, w, h);
            this.ctx.closePath();
            this.ctx.fill();
            this.ctx.stroke();
        };
        Nodes.prototype.clear = function () {
            this.ctx.clearRect(0, 0, this.width, this.height);
        };
        Nodes.prototype.Run = function () {
            this.Initialize();
        };
        Nodes.prototype.Initialize = function () {
            var _this = this;
            this.canvas = document.getElementById("canvas");
            this.ctx = this.canvas.getContext("2d");
            this.gameSprites = document.getElementById("Gamesprites");
            this.panel = document.getElementById("Panel");
            this.moonRocks = document.getElementById("MoonRocks");
            this.colRect = document.getElementById("ColRect");
            this.unGroundLedges = document.getElementById("UnGroundLedges");
            this.frontScreen = document.getElementById("FrontScreen");
            this.resourceManager = new ResourceManager(this.gameSprites, this.enemies, this.walls, this.platformz, this.ctx);
            this.upperRocks = this.resourceManager.UpperRocks;
            //    holes1 = ResourceManager.mHoleArray0;
            //    holes2 = ResourceManager.mHoleArray1;
            // Create the Actors
            this.charlie = new Charlie(150, 320, 3, this.gameSprites, this.walls, this.edibleWalls, this.platformz, this.debug);
            this.earth = new Earth(this.gameSprites);
            this.rocket = new Rocket(this.gameSprites);
            this.mole = new Mole(150, 320, 3, this.gameSprites, this.walls, this.edibleWalls, this.platformz, this.resourceManager.Levels, this.debug);
            this.explosion = new Explosion(this.gameSprites);
            var bird = new Bird(300, 366, 1, this.gameSprites, this.walls);
            this.walkingEnemies.push(bird);
            //       this.resourceManager.AddToEnemyList(bird);
            this.AddHitListener(this.canvas);
            setInterval(function () { return _this.update(); }, 10);
        };
        Nodes.prototype.AddHitListener = function (element) {
            var _this = this;
            window.addEventListener("keydown", function (event) {
                _this.onKeyPress(event);
                return null;
            });
            window.addEventListener("keyup", function (event) {
                _this.onKeyUp(event);
                return null;
            });
        };
        Nodes.prototype.onKeyPress = function (event) {
            event.preventDefault();
            this.onKeyboardPress(event, false);
        };
        Nodes.prototype.onKeyUp = function (event) {
            event.preventDefault();
            this.onKeyboardRelease(event, false);
        };
        Nodes.prototype.onKeyboardPress = function (event, touchDevice) {
            switch (((event.keyCode | 0))) {
                case 17:
                    this.somersault = true;
                    break;
                case 37:
                    if (!this.charlie.SittingDown) {
                        if (!this.moleAlive) {
                            this.moveLeft = true;
                        }
                        else {
                            this.moleMoveLeft = true;
                            this.moleMoveRight = false;
                        }
                    }
                    break;
                case 38:
                    break;
                case 39:
                    if (!this.charlie.SittingDown) {
                        if (!this.moleAlive) {
                            this.moveRight = true;
                        }
                        else {
                            this.moleMoveRight = true;
                            this.moleMoveLeft = false;
                        }
                    }
                    break;
                case 40:
                    break;
                case 77:
                    if (this.belowMoon) {
                        this.moleAlive = true;
                        this.mole.X = this.charlie.X;
                        this.mole.Y = this.charlie.Y;
                    }
                    break;
                case 78:
                    this.moleAlive = false;
                    break;
                case 88:
                    this.gameOn = true;
                    break;
                case 113:
                    this.belowMoon = false;
                    this.charlie.Y = 320;
                    this.belowScreenCounter = 0;
                    this.screenCounter = 0;
                    break;
            }
        };
        Nodes.prototype.onKeyboardRelease = function (event, touchDevice) {
            switch (((event.keyCode | 0))) {
                case 17:
                    this.somersault = false;
                    break;
                case 37:
                    this.moveLeft = false;
                    this.moleMoveLeft = false;
                    break;
                case 38:
                    break;
                case 39:
                    this.moveRight = false;
                    this.moleMoveRight = false;
                    break;
                case 40:
                    break;
                default:
                    break;
            }
        };
        Nodes.prototype.update = function () {
            this.screenChange = false;
            if (this.moveLeft && !this.charlie.Falling) {
                this.charlie.Update(0);
            }
            if (this.moveRight && !this.charlie.Falling) {
                this.charlie.Update(1);
            }
            // Trigger the somersault
            if (this.somersault) {
                this.charlie.Somersault = true;
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
                }
                else {
                    this.screenCounter = 15; //8
                    this.belowScreenCounter += 15;
                }
                this.charlie.X = 680;
                this.screenChange = true;
            }
            else if (this.charlie.X > 770) {
                if (this.screenCounter < 15) {
                    this.screenCounter += 1;
                    this.belowScreenCounter += 1;
                }
                else {
                    this.screenCounter = 0;
                    this.belowScreenCounter -= 15;
                }
                //screenCounter = (screenCounter + 1) % 15;
                this.charlie.X = 100;
                this.screenChange = true;
            }
            if (!this.belowMoon) {
                // if there is a hole position the rectangle 
                if (this.resourceManager.Hole1[this.screenCounter] == 1) {
                    this.charlie.HoleRectangle1 = new Rectangle(this.hole0X + 20, this.holesY + 20, 60, this.holesY + 40);
                }
                else {
                    this.charlie.HoleRectangle1 = new Rectangle(0, 0, 0, 0);
                }
                // if there is a hole position the rectangle 
                if (this.resourceManager.Hole2[this.screenCounter] == 1) {
                    this.charlie.HoleRectangle2 = new Rectangle(this.hole1X + 20, this.holesY + 20, 60, this.holesY + 40);
                }
                else {
                    this.charlie.HoleRectangle2 = new Rectangle(0, 0, 0, 0);
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
                        this.resourceManager.ConfigureEnemies(this.screenCounter);
                    }
                    this.charlie.Y += 2;
                    if (this.charlie.Y >= 425) {
                        this.charlie.Y = 20;
                        this.charlie.Walking = false;
                        this.belowScreenCounter += 16;
                        this.clearAll();
                        this.resourceManager.ConfigureEnemies(this.belowScreenCounter);
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
                        this.resourceManager.ConfigureEnemies(this.belowScreenCounter);
                    }
                    if (this.charlie.Y <= 15 && this.belowScreenCounter > 15) {
                        this.charlie.Y = 400;
                        this.belowScreenCounter -= 16;
                        this.charlie.Jump = false;
                        this.clearAll();
                    }
                }
                var charlieRect = this.charlie.Rectangle;
                for (var i = 0; i < this.resourceManager.EnemyList.length; i++) {
                    this.resourceManager.EnemyList[i].Update();
                    this.resourceManager.EnemyList[i].Walls = this.walls;
                    if (this.resourceManager.EnemyList[i].Name == "ChasingEnemy") {
                        this.resourceManager.EnemyList[i].CharlieX = this.charlie.X;
                        this.resourceManager.EnemyList[i].CharlieY = this.charlie.Y;
                    }
                    if (!this.charlie.SittingDown && !this.charlie.Falling && !this.immune) {
                        if (charlieRect.Intersects(this.resourceManager.EnemyList[i].Rectangle)) {
                            if (this.resourceManager.EnemyList[i].Name == "ChasingEnemy") {
                                this.charlie.SittingDown = true;
                                this.seatedTime = new Date().getTime();
                                if (this.charlie.Direction) {
                                    this.charlie.SeatingFrame = 69;
                                }
                                else if (!this.charlie.Direction) {
                                    this.charlie.SeatingFrame = 138;
                                }
                            }
                            this.explosion.Actived = true;
                            this.resourceManager.EnemyList[i].Reset();
                        }
                    }
                }
                if (this.explosion.Actived) {
                    this.explosion.Update();
                }
                if (this.moleAlive) {
                    if (this.moleMoveLeft) {
                        this.mole.UpdatePosition(0);
                    }
                    if (this.moleMoveRight) {
                        this.mole.UpdatePosition(1);
                    }
                    //this.moleMoveLeft = false;
                    //this.moleMoveRight = false;
                    this.mole.Update();
                }
            }
            this.rocket.Update();
            this.charlie.Collisions(this.belowMoon, this.screenChange);
            this.currentTime = new Date().getTime();
            if (this.charlie.SittingDown) {
                if ((this.currentTime - this.seatedTime) / 1000 > 5) {
                    this.charlie.SittingDown = false;
                    this.charlie.SeatingFrame = 0; //138;
                    this.seatedTime = 0;
                    this.immunityTime = new Date().getTime();
                    this.immune = true;
                }
            }
            if (this.immune) {
                if ((this.currentTime - this.immunityTime) / 1000 > 2) {
                    this.immune = false;
                    this.immunityTime = 0;
                }
            }
            this.Draw();
        };
        Nodes.prototype.Draw = function () {
            this.ctx.fillStyle = "black";
            this.rect(0, 0, this.width, this.height);
            this.ctx.beginPath();
            if (!this.gameOn) {
                this.ctx.font = "36px SpaceAge";
                this.ctx.fillStyle = "yellow";
                this.ctx.drawImage(this.frontScreen, 0, 0);
                this.ctx.fillText("NODES OF YESOD REMAKE", 160, 20);
                this.ctx.font = "20px SpaceAge";
                //this.ctx.fillText("Start", 480.0, 100.0);
                //this.ctx.fillText("Instructions", 480.0, 120.0);
                //this.ctx.fillText("Define Keys ", 480.0, 140.0);
                this.ctx.fillText("Press X to Start the game", 400, 240);
            }
            else {
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
                    if (this.resourceManager.Hole1[this.screenCounter] == 1) {
                        this.ctx.drawImage(this.moonRocks, 0, 300, this.rockWidth, this.rockHeight, this.hole0X, this.holesY, this.rockWidth, this.rockHeight);
                        if (this.debug) {
                            this.DrawDebugRectangles(this.hole0X + 20, this.holesY + 20, 60, this.holesY + 40);
                        }
                    }
                    if (this.resourceManager.Hole2[this.screenCounter] == 1) {
                        this.ctx.drawImage(this.moonRocks, 0, 300, this.rockWidth, this.rockHeight, this.hole1X, this.holesY, this.rockWidth, this.rockHeight);
                        if (this.debug) {
                            this.DrawDebugRectangles(this.hole1X, this.holesY, this.rockWidth, 30);
                        }
                    }
                }
                else {
                    var width = 62;
                    var height = 48;
                    this.platformz = [];
                    this.walls = [];
                    this.edibleWalls = [];
                    for (var ii = 0; ii < 10; ii++) {
                        // Clear the array of ledges
                        this.platformList = [];
                        this.platforms = [];
                        var temp;
                        // Get the repective level row
                        this.platforms = (this.resourceManager.Levels[(this.belowScreenCounter * 10) + ii]);
                        for (var jj = 0; jj < 13; jj++) {
                            // Iterate through the array & point to the start position of the texture to be grabbed by the wallRect
                            switch (this.platforms[jj]) {
                                // Walls
                                case 0:
                                    this.ctx.drawImage(this.unGroundLedges, 0 * width, 0, 60, 48, width * jj, 50 + (height * ii), 60, 48);
                                    this.walls.push(new Rectangle(width * jj, 50 + (height * ii), width, height));
                                    if (this.debug) {
                                        this.DrawDebugRectangles(width * jj, 50 + (height * ii), width, height);
                                    }
                                    break;
                                case 1:
                                    this.ctx.drawImage(this.unGroundLedges, 1 * width, 0, 60, 48, width * jj, 50 + (height * ii), 60, 48);
                                    this.walls.push(new Rectangle(width * jj, 50 + (height * ii), width, height));
                                    if (this.debug) {
                                        this.DrawDebugRectangles(width * jj, 50 + (height * ii), width, height);
                                    }
                                    break;
                                case 2:
                                    this.ctx.drawImage(this.unGroundLedges, 2 * width, 0, 60, 48, width * jj, 50 + (height * ii), 60, 48);
                                    this.walls.push(new Rectangle(width * jj, 50 + (height * ii), width, height));
                                    if (this.debug) {
                                        this.DrawDebugRectangles(width * jj, 50 + (height * ii), width, height);
                                    }
                                    break;
                                case 3:
                                    this.ctx.drawImage(this.unGroundLedges, 3 * width, 0, 60, 48, width * jj, 50 + (height * ii), 60, 48);
                                    this.walls.push(new Rectangle(width * jj, 50 + (height * ii), width, height));
                                    if (this.debug) {
                                        this.DrawDebugRectangles(width * jj, 50 + (height * ii), width, height);
                                    }
                                    break;
                                //Empty space - no need to draw...
                                //                    case 4:
                                // Floor 
                                case 5:
                                    this.ctx.drawImage(this.unGroundLedges, 5 * width, 0, 60, 48, width * jj, 50 + (height * ii), 60, 48);
                                    this.platformz.push(new Rectangle(width * jj, 50 + (height * ii), width, height));
                                    if (this.debug) {
                                        this.DrawDebugRectangles(width * jj, 50 + (height * ii), width, height);
                                    }
                                    break;
                                case 6:
                                    this.ctx.drawImage(this.unGroundLedges, 6 * width, 0, 60, 48, width * jj, 50 + (height * ii), 60, 48);
                                    this.platformz.push(new Rectangle(width * jj, 50 + (height * ii), width, height));
                                    if (this.debug) {
                                        this.DrawDebugRectangles(width * jj, 50 + (height * ii), width, height);
                                    }
                                    break;
                                case 7:
                                    this.ctx.drawImage(this.unGroundLedges, 7 * width, 0, 60, 48, width * jj, 50 + (height * ii), 60, 48);
                                    this.platformz.push(new Rectangle(width * jj, 50 + (height * ii), width, height));
                                    if (this.debug) {
                                        this.DrawDebugRectangles(width * jj, 50 + (height * ii), width, height);
                                    }
                                    break;
                                case 8:
                                    this.ctx.drawImage(this.unGroundLedges, 8 * width, 0, 60, 48, width * jj, 50 + (height * ii), 60, 48);
                                    this.platformz.push(new Rectangle(width * jj, 50 + (height * ii), width, height));
                                    if (this.debug) {
                                        this.DrawDebugRectangles(width * jj, 50 + (height * ii), width, height);
                                    }
                                    break;
                                // Ledges
                                case 9:
                                    this.ctx.drawImage(this.unGroundLedges, 9 * width, 0, 60, 48, width * jj, 50 + (height * ii), 60, 48);
                                    this.platformz.push(new Rectangle(width * jj, 50 + (height * ii), width, height));
                                    if (this.debug) {
                                        this.DrawDebugRectangles(width * jj, 50 + (height * ii), width, height);
                                    }
                                    break;
                                case 10:
                                    this.ctx.drawImage(this.unGroundLedges, 10 * width, 0, 60, 48, width * jj, 50 + (height * ii), 60, 48);
                                    this.platformz.push(new Rectangle(width * jj, 50 + (height * ii), width, height));
                                    if (this.debug) {
                                        this.DrawDebugRectangles(width * jj, 50 + (height * ii), width, height);
                                    }
                                    break;
                                case 11:
                                    this.ctx.drawImage(this.unGroundLedges, 11 * width, 0, 60, 48, width * jj, 50 + (height * ii), 60, 48);
                                    break;
                                case 12:
                                    this.ctx.drawImage(this.unGroundLedges, 12 * width, 0, 60, 48, width * jj, 50 + (height * ii), 60, 48);
                                    break;
                                // edible walls
                                case 15:
                                    this.ctx.drawImage(this.unGroundLedges, 15 * width, 0, 60, 48, width * jj, 50 + (height * ii), 60, 48);
                                    //this.walls.push(new Rectangle(width * jj, 50 + (height * ii), width, height));
                                    this.edibleWalls.push(new Rectangle(width * jj, 50 + (height * ii), width, height));
                                    if (this.debug) {
                                        this.DrawDebugRectangles(width * jj, 50 + (height * ii), width, height);
                                    }
                                    break;
                                case 16:
                                    this.ctx.drawImage(this.unGroundLedges, 16 * width, 0, 60, 48, width * jj, 50 + (height * ii), 60, 48);
                                    //this.walls.push(new Rectangle(width * jj, 50 + (height * ii), width, height));
                                    this.edibleWalls.push(new Rectangle(width * jj, 50 + (height * ii), width, height));
                                    if (this.debug) {
                                        this.DrawDebugRectangles(width * jj, 50 + (height * ii), width, height);
                                    }
                                    break;
                                case 17:
                                    this.ctx.drawImage(this.unGroundLedges, 17 * width, 0, 60, 48, width * jj, 50 + (height * ii), 60, 48);
                                    //this.walls.push(new Rectangle(width * jj, 50 + (height * ii), width, height));
                                    this.edibleWalls.push(new Rectangle(width * jj, 50 + (height * ii), width, height));
                                    if (this.debug) {
                                        this.DrawDebugRectangles(width * jj, 50 + (height * ii), width, height);
                                    }
                                    break;
                                case 18:
                                    this.ctx.drawImage(this.unGroundLedges, 18 * width, 0, 60, 48, width * jj, 50 + (height * ii), 60, 48);
                                    //this.walls.push(new Rectangle(width * jj, 50 + (height * ii), width, height));
                                    this.edibleWalls.push(new Rectangle(width * jj, 50 + (height * ii), width, height));
                                    if (this.debug) {
                                        this.DrawDebugRectangles(width * jj, 50 + (height * ii), width, height);
                                    }
                                    break;
                                // Alchiems
                                case 20:
                                    this.ctx.drawImage(this.unGroundLedges, 0 * width, height, 60, 48, width * jj, 50 + (height * ii), 60, 48);
                                    //temp = { left: width * jj, top: 50 + (height * ii), right: width, bottom: height };
                                    //this.platformList.push(temp);
                                    break;
                                case 21:
                                    this.ctx.drawImage(this.unGroundLedges, 1 * width, height, 60, 48, width * jj, 50 + (height * ii), 60, 48);
                                    //temp = { left: width * jj, top: 50 + (height * ii), right: width, bottom: height };
                                    //this.platformList.push(temp);
                                    break;
                                case 22:
                                    this.ctx.drawImage(this.unGroundLedges, 2 * width, height, 60, 48, width * jj, 50 + (height * ii), 60, 48);
                                    //temp = { left: width * jj, top: 50 + (height * ii), right: width, bottom: height };
                                    //this.platformList.push(temp);
                                    break;
                                case 23:
                                    this.ctx.drawImage(this.unGroundLedges, 3 * width, height, 60, 48, width * jj, 50 + (height * ii), 60, 48);
                                    //temp = { left: width * jj, top: 50 + (height * ii), right: width, bottom: height };
                                    //this.platformList.push(temp);
                                    break;
                                // Diamond ledges 
                                case 25:
                                    this.ctx.drawImage(this.unGroundLedges, 5 * width, height, 60, 48, width * jj, 50 + (height * ii), 60, 48);
                                    this.platformz.push(new Rectangle(width * jj, 50 + (height * ii), width, height));
                                    if (this.debug) {
                                        this.DrawDebugRectangles(width * jj, 50 + (height * ii), width, height);
                                    }
                                    break;
                                case 26:
                                    this.ctx.drawImage(this.unGroundLedges, 6 * width, height, 60, 48, width * jj, 50 + (height * ii), 60, 48);
                                    this.platformz.push(new Rectangle(width * jj, 50 + (height * ii), width, height));
                                    if (this.debug) {
                                        this.DrawDebugRectangles(width * jj, 50 + (height * ii), width, height);
                                    }
                                    break;
                                // Bird
                                case 81:
                                    this.walkingEnemies[0].Walls = this.walls;
                                    this.walkingEnemies[0].EdibleWalls = this.edibleWalls;
                                    this.walkingEnemies[0].Update();
                                    this.walkingEnemies[0].Draw(this.ctx);
                                    break;
                            }
                        }
                    }
                    for (var i = 0; i < this.resourceManager.EnemyList.length; i++) {
                        this.resourceManager.EnemyList[i].Draw(this.ctx);
                    }
                    this.charlie.Ledges = this.platformz;
                    this.charlie.Walls = this.walls;
                    this.charlie.EdibleWalls = this.edibleWalls;
                }
                this.ctx.drawImage(this.gameSprites, (this.heartBeatTimer + 9) * 64, 15 * 69, 68, 68, 420, 520, 64, 64);
                this.ctx.drawImage(this.panel, 50, 530);
                this.ctx.drawImage(this.gameSprites, 16 * 64, 12 * 69, 68, 68, 50, 520, 64, 64);
                if (this.moleAlive) {
                    this.mole.Walls = this.walls;
                    this.mole.EdibleWalls = this.edibleWalls;
                    this.mole.ScreenCounter = this.screenCounter;
                    this.mole.BelowScreenCounter = this.belowScreenCounter;
                    this.mole.Draw(this.ctx);
                    this.ctx.drawImage(this.gameSprites, 15 * 64, 12 * 69, 68, 68, 50, 520, 64, 64);
                }
                this.charlie.Draw(this.ctx);
                if (this.explosion.Actived) {
                    this.explosion.Draw(this.ctx);
                }
                if (this.debug) {
                    this.ctx.font = "12px SpaceAge";
                    this.ctx.fillStyle = "yellow";
                    this.ctx.fillText("Screen Number : " + this.screenCounter, 10, 90);
                    this.ctx.fillText("Below Surface Screen Number : " + this.belowScreenCounter, 10, 110);
                    this.ctx.fillText("Changing screen : " + this.screenChange, 10, 130);
                    this.ctx.fillText("Seated Time : " + this.seatedTime, 10, 150);
                    this.ctx.fillText("Current Time : " + this.currentTime, 10, 170);
                    this.ctx.fillText("Delta seated Time : " + (this.currentTime - this.seatedTime), 10, 190);
                }
                this.animTimer += 0.1;
                if (this.animTimer > 1.0) {
                    this.heartBeatTimer = (this.heartBeatTimer + 1) % 7;
                    this.animTimer = 0;
                }
                this.ctx.font = "20px SpaceAge";
                this.ctx.fillStyle = "white";
                this.ctx.fillText("3", 415, 554);
                this.ctx.fillText("0:00:00", 635, 554);
            }
        };
        Nodes.prototype.DrawDebugRectangles = function (x, y, w, h) {
            this.ctx.beginPath();
            this.ctx.lineWidth = 1;
            this.ctx.strokeStyle = "blue";
            this.ctx.rect(x, y, w, h);
            this.ctx.stroke();
        };
        Nodes.prototype.clearAll = function () {
            this.enemies = [];
            this.walls = [];
            this.platformz = [];
            this.edibleWalls = [];
            this.alchiems = [];
            //this.testList = [];
            //if (this.roof.length > 0) {
            //    this.roof = [];
            //}
        };
        return Nodes;
    }());
    return Nodes;
});
//# sourceMappingURL=Nodes.js.map