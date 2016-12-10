var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "Enemy"], function (require, exports, Enemy) {
    "use strict";
    var Caterpillar = (function (_super) {
        __extends(Caterpillar, _super);
        function Caterpillar(xpos, ypos, speedx, gamesprites, wall) {
            _super.call(this, xpos, ypos, speedx, gamesprites, wall);
            this.m_name = "Caterpillar";
            this.m_offsetX = 0 * 64;
            this.m_offsetY = 0 * 69;
        }
        Caterpillar.prototype.Update = function () {
            this.m_animTimer += 0.1;
            if (this.m_animTimer > 0.4) {
                this.m_frame = (this.m_frame + 1) % 7;
                this.m_animTimer = 0;
            }
        };
        Caterpillar.prototype.Draw = function (ctx) {
            ctx.beginPath();
            ctx.drawImage(this.m_texture, this.m_frame * 64 + (15 * 64), 5 * 69, 68, 68, this.m_x, this.m_y, 64, 64);
        };
        Object.defineProperty(Caterpillar.prototype, "Ledges", {
            set: function (value) { this.m_platforms = value; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Caterpillar.prototype, "Walls", {
            set: function (value) { this.m_walls = value; },
            enumerable: true,
            configurable: true
        });
        return Caterpillar;
    }(Enemy));
    return Caterpillar;
});
//# sourceMappingURL=Caterpillar.js.map