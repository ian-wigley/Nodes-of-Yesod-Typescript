var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "BaseObject", "Rectangle"], function (require, exports, BaseObject, Rectangle) {
    "use strict";
    var Mole = (function (_super) {
        __extends(Mole, _super);
        function Mole(xpos, ypos, speedx, texture, walls, ediblewalls, platforms, levels, debug) {
            _super.call(this, texture);
            this.m_screenCounter = 0;
            this.m_belowScreenCounter = 0;
            this.m_undergroundScreenCounter = 0;
            this.m_debug = debug;
            this.m_walls = walls;
            this.m_edibleWalls = ediblewalls;
            this.m_levels = levels;
            this.m_offsetX = 0 * 64;
            this.m_offsetY = 11 * 69;
        }
        Mole.prototype.Update = function () {
            this.m_animTimer += 0.1;
            if (this.m_animTimer > 0.4) {
                this.m_frame = (this.m_frame + 1) % 8;
                this.m_animTimer = 0;
            }
        };
        Mole.prototype.UpdatePosition = function (value) {
            if (value == 0) {
                this.m_x -= 4;
                this.m_facingLeft = true;
            }
            if (value == 1) {
                this.m_x += 4;
                this.m_facingLeft = false;
            }
            var triggered = false;
            this.m_moleRect = new Rectangle(this.m_x + 10, this.m_y, this.m_width, this.m_height);
            for (var i = 0; i < this.m_walls.length; i++) {
                if (this.m_moleRect.Intersects(this.m_walls[i]) && !triggered) {
                    triggered = true;
                    if (this.m_facingLeft) {
                        this.m_x += 4;
                    }
                    else {
                        this.m_x -= 4;
                    }
                }
            }
            for (var i = 0; i < this.m_edibleWalls.length; i++) {
                if (this.m_moleRect.Intersects(this.m_edibleWalls[i]) && !triggered) {
                    triggered = true;
                    var span = this.m_belowScreenCounter * 10;
                    for (var i = span; i < span + 13; i++) {
                        if (this.m_x < 100) {
                            if (this.m_levels[i][1] == 15 || this.m_levels[i][1] == 17) {
                                // replace the edible walls with empty sections
                                this.m_levels[i][1] = 4;
                                if (this.m_screenCounter > 0) {
                                    this.m_levels[(i - 10)][12] = 4;
                                }
                                else {
                                    this.m_levels[(i + 150)][12] = 4;
                                }
                            }
                        }
                        else {
                            if (this.m_x > 650) {
                                if (this.m_levels[i][12] == 16 || this.m_levels[i][12] == 18) {
                                    this.m_levels[i][12] = 4;
                                }
                            }
                        }
                    }
                }
            }
        };
        Mole.prototype.Draw = function (ctx) {
            ctx.beginPath();
            if (!this.m_facingLeft) {
                ctx.drawImage(this.m_texture, this.m_frame * 64, this.m_offsetY, 68, 68, this.m_x, this.m_y, 64, 64);
            }
            else {
                ctx.drawImage(this.m_texture, this.m_frame * 64, this.m_offsetY + 69, 68, 68, this.m_x, this.m_y, 64, 64);
            }
            if (this.m_debug) {
                ctx.font = "12px SpaceAge";
                ctx.fillStyle = "yellow";
                ctx.fillText("Mole x : " + this.m_x, 10, 90);
            }
        };
        Object.defineProperty(Mole.prototype, "X", {
            set: function (value) { this.m_x = value; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Mole.prototype, "Y", {
            set: function (value) { this.m_y = value; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Mole.prototype, "ScreenCounter", {
            set: function (value) { this.m_screenCounter = value; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Mole.prototype, "BelowScreenCounter", {
            set: function (value) { this.m_belowScreenCounter = value; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Mole.prototype, "Walls", {
            set: function (value) { this.m_walls = value; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Mole.prototype, "EdibleWalls", {
            set: function (value) { this.m_edibleWalls = value; },
            enumerable: true,
            configurable: true
        });
        return Mole;
    }(BaseObject));
    return Mole;
});
//# sourceMappingURL=Mole.js.map