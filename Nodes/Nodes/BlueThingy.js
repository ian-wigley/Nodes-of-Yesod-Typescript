var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "Enemy", "Rectangle"], function (require, exports, Enemy, Rectangle) {
    "use strict";
    var BlueThingy = (function (_super) {
        __extends(BlueThingy, _super);
        function BlueThingy(xpos, ypos, speedx, gamesprites, wall) {
            _super.call(this, xpos, ypos, speedx, gamesprites, wall);
            this.m_name = "BlueThingy";
            this.m_offsetX = 12 * 64;
            this.m_offsetY = 6 * 69;
            this.m_width = 34; //64
            this.m_height = 64;
        }
        BlueThingy.prototype.Update = function () {
            this.m_animTimer += 0.1;
            if (this.m_animTimer > 0.4) {
                this.m_frame = (this.m_frame + 1) % 7;
                this.m_animTimer = 0;
            }
            this.m_x += this.m_speedX;
            this.m_y += this.m_speedY;
            if (this.m_y > 400 ||
                this.m_y < 0) {
                this.m_speedY *= -1;
            }
            var triggered = false;
            this.m_blueThingRect = new Rectangle(this.m_x + 10, this.m_y, 64, 64);
            for (var i = 0; i < this.m_walls.length; i++) {
                if (this.m_blueThingRect.Intersects(this.m_walls[i]) && !triggered) {
                    triggered = true;
                    if (this.m_speedX > 0) {
                        this.m_x -= 5;
                        this.m_speedX *= -1;
                    }
                    else {
                        this.m_x += 5;
                        this.m_speedX *= -1;
                    }
                }
            }
        };
        BlueThingy.prototype.Draw = function (ctx) {
            ctx.beginPath();
            ctx.drawImage(this.m_texture, this.m_frame * 64 + this.m_offsetX, this.m_offsetY, 68, 68, this.m_x, this.m_y, 64, 64);
        };
        return BlueThingy;
    }(Enemy));
    return BlueThingy;
});
//# sourceMappingURL=BlueThingy.js.map