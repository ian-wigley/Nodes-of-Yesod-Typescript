var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "BaseObject"], function (require, exports, BaseObject) {
    "use strict";
    var Explosion = (function (_super) {
        __extends(Explosion, _super);
        function Explosion(texture) {
            _super.call(this, texture);
            this.m_name = "Explosion";
            this.m_offsetX = 3 * 64;
            this.m_offsetY = 10 * 69;
            this.m_active = false;
        }
        Explosion.prototype.Update = function () {
            this.m_animTimer += 0.1;
            if (this.m_animTimer > 0.7) {
                this.m_frame = (this.m_frame + 1) % 3;
                this.m_animTimer = 0;
            }
            if (this.m_frame == 2) {
                this.m_active = false;
                this.m_frame = 0;
            }
        };
        Explosion.prototype.Draw = function (ctx) {
            ctx.beginPath();
            this.m_x -= this.CharlieX;
            this.m_y -= this.CharlieY;
            ctx.drawImage(this.m_texture, this.m_frame * 64 + this.m_offsetX, this.m_offsetY, 68, 68, this.m_x, this.m_y, 64, 64);
        };
        Object.defineProperty(Explosion.prototype, "Actived", {
            get: function () { return this.m_active; },
            set: function (value) { this.m_active = value; },
            enumerable: true,
            configurable: true
        });
        return Explosion;
    }(BaseObject));
    return Explosion;
});
//# sourceMappingURL=Explosion.js.map