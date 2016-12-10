var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "Enemy", "Rectangle"], function (require, exports, Enemy, Rectangle) {
    "use strict";
    var Bird = (function (_super) {
        __extends(Bird, _super);
        function Bird(xpos, ypos, speedx, gamesprites, wall) {
            _super.call(this, xpos, ypos, speedx, gamesprites, wall);
            this.m_name = "Bird";
            this.m_x = 180;
            this.m_y = 420;
            this.m_width = 34; //64
            this.m_height = 64;
            this.m_speed = 1;
            this.m_facingLeft = false;
            this.m_offsetX = 4 * 64;
            this.m_offsetY = 9 * 69;
        }
        Bird.prototype.Update = function () {
            this.m_animTimer += 0.1;
            this.m_x += this.m_speed;
            if (this.m_animTimer > 0.4) {
                this.m_frame = (this.m_frame + 1) % 4;
                this.m_animTimer = 0;
            }
            var triggered = false;
            this.m_birdRect = new Rectangle(this.m_x + 10, this.m_y, this.m_width, this.m_height);
            for (var i = 0; i < this.m_walls.length; i++) {
                if (this.m_birdRect.Intersects(this.m_walls[i]) && !triggered) {
                    triggered = true;
                    if (this.m_speed > 0) {
                        this.m_x -= 5;
                        this.m_speed *= -1;
                        this.m_facingLeft = true;
                    }
                    else {
                        this.m_x += 5;
                        this.m_speed *= -1;
                        this.m_facingLeft = false;
                    }
                }
            }
            triggered = false;
            ////if (this.m_edibleWalls.length > 0 && !triggered) {
            for (var i = 0; i < this.m_edibleWalls.length; i++) {
                if (this.m_birdRect.Intersects(this.m_edibleWalls[i]) && !triggered) {
                    triggered = true;
                    if (this.m_speed > 0) {
                        this.m_x -= 5;
                        this.m_speed *= -1;
                        this.m_facingLeft = true;
                    }
                    else {
                        this.m_x += 5;
                        this.m_speed *= -1;
                        this.m_facingLeft = false;
                    }
                }
            }
            if (this.m_x >= 801) {
                this.m_x = 0;
            }
            else if (this.m_x < 0) {
                this.m_x = 800;
            }
        };
        Bird.prototype.Draw = function (ctx) {
            ctx.beginPath();
            if (!this.m_facingLeft) {
                ctx.drawImage(this.m_texture, (this.m_frame + 4) * 64, this.m_offsetY, 68, 68, this.m_x, this.m_y, 64, 64);
            }
            else {
                ctx.drawImage(this.m_texture, (this.m_frame + 8) * 64, this.m_offsetY, 68, 68, this.m_x, this.m_y, 64, 64);
            }
        };
        return Bird;
    }(Enemy));
    return Bird;
});
//# sourceMappingURL=Bird.js.map