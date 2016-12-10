var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "BaseObject", "Rectangle"], function (require, exports, BaseObject, Rectangle) {
    "use strict";
    var Charlie = (function (_super) {
        __extends(Charlie, _super);
        //https://csanyk.com/2012/10/game-maker-wave-motion-tutorial/
        function Charlie(xpos, ypos, speedx, texture, walls, ediblewalls, platforms, debug) {
            _super.call(this, texture);
            this.m_somerSaultJump = false;
            this.m_direction = false;
            this.m_falling = false;
            this.m_startFrame = 16;
            this.m_initialised = false;
            this.m_screenCounter = 0;
            this.m_walkingOnFloor = false;
            this.m_belowSurface = false;
            this.m_jump = false;
            this.m_sittingDown = false;
            this.m_amplitude = 0;
            this.m_shift = 0;
            this.t = 6;
            this.testJump = new Array();
            this.m_x = xpos;
            this.m_y = ypos;
            this.m_width = 34; //64
            this.m_height = 64;
            this.m_frame = 1;
            //this.m_resourceManager = resManager;
            this.m_walls = walls;
            this.m_edibleWalls = ediblewalls;
            this.m_platforms = new Array();
            this.m_debug = debug;
        }
        Charlie.prototype.Update = function (value) {
            this.m_animTimer += 0.1;
            // Walk Left
            if (value == 0 && !this.m_somerSaultJump) {
                this.m_x -= 4;
                this.m_direction = false;
                if (this.m_animTimer > 0.4) {
                    this.m_frame = (this.m_frame + 1) % 8;
                    this.m_animTimer = 0;
                }
            }
            else if (value == 1 && !this.m_somerSaultJump) {
                this.m_x += 4;
                this.m_direction = true;
                if (this.m_animTimer > 0.4) {
                    this.m_frame = (this.m_frame + 1) % 8;
                    this.m_animTimer = 0;
                }
            }
            // left somerSault
            if (value == 0 && this.m_somerSaultJump) {
                if (!this.m_initialised) {
                    //this.summerSaultFrame = 138;// 3 * 64;
                    this.m_offsetY = 138;
                    this.m_direction = false;
                    this.m_frame = 0;
                    this.m_initialised = true;
                }
                if (this.m_frame < 20) {
                    //    this.m_y -= 5;
                    //this.m_frameX -= 1;
                    if (this.m_animTimer > 0.1) {
                        this.m_frame += 1;
                        this.m_animTimer = 0;
                    }
                    this.m_amplitude += 0.025;
                    this.m_y = (200 * -Math.abs(Math.sin(this.m_amplitude * Math.PI))) + 320; //350 is the correct y height
                    this.m_x -= 5;
                }
                if (this.m_frame == 20 && this.m_somerSaultJump) {
                    this.m_somerSaultJump = false;
                    //this.summerSaultFrame = 0;
                    this.m_offsetY = 0;
                    this.m_frame = 0;
                    this.m_initialised = false;
                    this.m_y = 320;
                }
            }
            // right
            if (value == 1 && this.m_somerSaultJump) {
                if (!this.m_initialised) {
                    //this.summerSaultFrame = 68;// 3 * 64;
                    this.m_offsetY = 68;
                    this.m_direction = true;
                    this.m_frame = 0;
                    this.m_initialised = true;
                }
                if (this.m_frame < 20) {
                    //    this.m_y -= 5;
                    if (this.m_animTimer > 0.1) {
                        this.m_frame += 1;
                        this.m_animTimer = 0;
                    }
                    this.m_amplitude += 0.025;
                    this.m_y = (200 * -Math.abs(Math.sin(this.m_amplitude * Math.PI))) + 320; //350 is the correct y height
                    this.m_x += 5;
                    this.testJump.push(this.m_y);
                }
                if (this.m_frame == 20 && this.m_somerSaultJump) {
                    this.m_somerSaultJump = false;
                    //this.summerSaultFrame = 0;
                    this.m_offsetY = 0;
                    this.m_frame = 0;
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
        };
        Charlie.prototype.Draw = function (ctx) {
            ctx.beginPath();
            // Draw Charlie facing left
            if (!this.m_direction && !this.m_somerSaultJump) {
                ctx.drawImage(this.m_texture, this.m_frame * 64 + (11 * 64), this.m_offsetY /*this.summerSaultFrame*/, 64, 64, this.m_x, this.m_y, 64, 64);
            }
            if (!this.m_direction && this.m_somerSaultJump) {
                ctx.drawImage(this.m_texture, this.m_frame * 64, this.m_offsetY /*this.summerSaultFrame*/, 64, 64, this.m_x, this.m_y, 64, 64);
            }
            if (this.m_direction && this.m_somerSaultJump) {
                ctx.drawImage(this.m_texture, this.m_frame * 64, this.m_offsetY /* this.summerSaultFrame*/, 64, 64, this.m_x, this.m_y, 64, 64);
            }
            else if (this.m_direction && !this.m_somerSaultJump) {
                ctx.drawImage(this.m_texture, this.m_frame * 64, this.m_offsetY /*this.summerSaultFrame*/, 64, 64, this.m_x, this.m_y, 64, 64);
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
            }
        };
        Charlie.prototype.Collisions = function (belowMoon, screenChange) {
            if (!belowMoon) {
                if (this.Rectangle.Intersects(this.m_holeRectangle1) || this.Rectangle.Intersects(this.m_holeRectangle2)) {
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
                var charlieRect = this.Rectangle;
                if (this.m_falling && !this.m_somerSaultJump) {
                    //var charlieRect: Rectangle = this.Rectangle;
                    for (var i = 0; i < this.m_platforms.length; i++) {
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
                                this.m_x = this.m_walls[i].Width;
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
                                this.m_x = this.m_edibleWalls[i].Width;
                                break;
                            }
                            else {
                                this.m_x = 680;
                                break;
                            }
                        }
                    }
                }
            }
        };
        Object.defineProperty(Charlie.prototype, "X", {
            get: function () { return this.m_x; },
            set: function (value) { this.m_x = value; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Charlie.prototype, "Y", {
            get: function () { return this.m_y; },
            set: function (value) { this.m_y = value; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Charlie.prototype, "ScreenCounter", {
            get: function () { return this.m_screenCounter; },
            set: function (value) { this.m_screenCounter = value; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Charlie.prototype, "Rectangle", {
            get: function () { return new Rectangle(this.m_x + 10, this.m_y, this.m_width, this.m_height); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Charlie.prototype, "HoleRectangle1", {
            set: function (value) { this.m_holeRectangle1 = value; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Charlie.prototype, "HoleRectangle2", {
            set: function (value) { this.m_holeRectangle2 = value; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Charlie.prototype, "Ledges", {
            set: function (value) { this.m_platforms = value; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Charlie.prototype, "Walls", {
            set: function (value) { this.m_walls = value; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Charlie.prototype, "EdibleWalls", {
            set: function (value) { this.m_edibleWalls = value; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Charlie.prototype, "BelowMoonSurface", {
            get: function () { return this.m_belowSurface; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Charlie.prototype, "SittingDown", {
            get: function () { return this.m_sittingDown; },
            set: function (value) { this.m_sittingDown = value; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Charlie.prototype, "SeatingFrame", {
            set: function (value) { this.m_offsetY = value; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Charlie.prototype, "Falling", {
            get: function () { return this.m_falling; },
            set: function (value) { this.m_falling = value; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Charlie.prototype, "Walking", {
            get: function () { return this.m_walkingOnFloor; },
            set: function (value) { this.m_walkingOnFloor = value; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Charlie.prototype, "Somersault", {
            get: function () { return this.m_somerSaultJump; },
            set: function (value) { this.m_somerSaultJump = value; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Charlie.prototype, "Direction", {
            get: function () { return this.m_direction; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Charlie.prototype, "Jump", {
            get: function () { return this.m_jump; },
            set: function (value) { this.m_jump = value; },
            enumerable: true,
            configurable: true
        });
        return Charlie;
    }(BaseObject));
    return Charlie;
});
//# sourceMappingURL=Charlie.js.map