var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "BaseObject"], function (require, exports, BaseObject) {
    "use strict";
    var Earth = (function (_super) {
        __extends(Earth, _super);
        function Earth(texture) {
            _super.call(this, texture);
            this.m_x = 600;
            this.m_y = 20;
            this.m_width = 64;
            this.m_height = 64;
            this.m_offsetX = 0 * 64;
            this.m_offsetY = 14 * 69;
        }
        Earth.prototype.Update = function (value) {
            if (value === void 0) { value = 0; }
            this.m_animTimer += 0.1;
            if (this.m_animTimer > 0.4) {
                this.m_frame = (this.m_frame + 1) % 15;
                this.m_animTimer = 0;
            }
        };
        Earth.prototype.Draw = function (ctx) {
            ctx.beginPath();
            ctx.drawImage(this.m_texture, this.m_frame * 64, this.m_offsetY, 64, 64, this.m_x, this.m_y, 64, 64);
            ctx.fill();
            //ctx.beginPath();
            //ctx.lineWidth = 1;
            //ctx.strokeStyle = "green";
            //ctx.rect(this.m_x, this.m_y, this.m_width, this.m_height);
            //ctx.stroke();
        };
        return Earth;
    }(BaseObject));
    return Earth;
});
//# sourceMappingURL=Earth.js.map