var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "Enemy"], function (require, exports, Enemy) {
    "use strict";
    var Fire = (function (_super) {
        __extends(Fire, _super);
        function Fire(xpos, ypos, speedx, gamesprites, wall) {
            _super.call(this, xpos, ypos, speedx, gamesprites, wall);
            this.m_name = "Fire";
            this.m_offsetX = 6 * 64;
            this.m_offsetY = 10 * 69;
        }
        Fire.prototype.Update = function () {
            this.m_animTimer += 0.1;
            //       this.m_x += this.m_speed;
            if (this.m_animTimer > 0.4) {
                this.m_frame = (this.m_frame + 1) % 4;
                this.m_animTimer = 0;
            }
        };
        Fire.prototype.Draw = function (ctx) {
            ctx.beginPath();
            ctx.drawImage(this.m_texture, this.m_frame * 64 + this.m_offsetX, this.m_offsetY, 68, 68, this.m_x, this.m_y, 64, 64);
        };
        return Fire;
    }(Enemy));
    return Fire;
});
//# sourceMappingURL=Fire.js.map