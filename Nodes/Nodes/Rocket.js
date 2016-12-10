var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "BaseObject"], function (require, exports, BaseObject) {
    "use strict";
    var Rocket = (function (_super) {
        __extends(Rocket, _super);
        function Rocket(texture) {
            _super.call(this, texture);
            this.m_rocketScreen = 0;
            this.m_y = 100;
            this.m_offsetX = 17 * 64;
            this.m_offsetY = 11 * 68;
        }
        Rocket.prototype.Update = function () {
            if (this.m_x >= 0 && this.m_x <= 800) {
                this.m_x += 1;
            }
            if (this.m_x >= 801) {
                this.m_x = 0;
                this.m_rocketScreen = (this.m_rocketScreen + 1) % 15;
            }
        };
        Rocket.prototype.Draw = function (ctx) {
            ctx.beginPath();
            ctx.drawImage(this.m_texture, this.m_offsetX, this.m_offsetY, 64, 64, this.m_x, this.m_y, 64, 64);
        };
        Object.defineProperty(Rocket.prototype, "RocketScreen", {
            get: function () {
                return this.m_rocketScreen;
            },
            enumerable: true,
            configurable: true
        });
        return Rocket;
    }(BaseObject));
    return Rocket;
});
//# sourceMappingURL=Rocket.js.map