var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "Enemy"], function (require, exports, Enemy) {
    "use strict";
    var RedSpaceman = (function (_super) {
        __extends(RedSpaceman, _super);
        function RedSpaceman(xpos, ypos, speedx, gamesprites, wall) {
            _super.call(this, xpos, ypos, speedx, gamesprites, wall);
            this.m_name = "RedSpaceman";
            this.m_offsetX = 0 * 64;
            this.m_offsetY = 0 * 69;
        }
        RedSpaceman.prototype.Update = function () {
            this.m_animTimer += 0.1;
            this.m_x += this.m_speed;
            if (this.m_animTimer > 0.4) {
                this.m_frame = (this.m_frame + 1) % 4;
                this.m_animTimer = 0;
            }
        };
        RedSpaceman.prototype.Draw = function (ctx) {
            ctx.beginPath();
            ctx.drawImage(this.m_texture, this.m_frame * 64, 8 * 69, 68, 68, this.m_x, this.m_y, 64, 64);
        };
        return RedSpaceman;
    }(Enemy));
    return RedSpaceman;
});
//# sourceMappingURL=RedSpaceman.js.map