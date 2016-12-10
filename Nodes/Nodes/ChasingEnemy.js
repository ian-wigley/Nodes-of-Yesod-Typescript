var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "Enemy"], function (require, exports, Enemy) {
    "use strict";
    var ChasingEnemy = (function (_super) {
        __extends(ChasingEnemy, _super);
        function ChasingEnemy(xpos, ypos, speedx, gamesprites, wall) {
            _super.call(this, xpos, ypos, speedx, gamesprites, wall);
            this.m_name = "ChasingEnemy";
            this.m_offsetX = 0 * 64;
            this.m_offsetY = 10 * 69;
            this.m_width = 34; //64
            this.m_height = 64;
        }
        ChasingEnemy.prototype.Update = function () {
            this.m_animTimer += 0.1;
            if (this.m_animTimer > 0.4) {
                this.m_frame = (this.m_frame + 1) % 3;
                this.m_animTimer = 0;
            }
            if (this.m_charlieX < this.m_x) {
                this.m_x -= this.m_speedX;
            }
            else if (this.m_charlieX > this.m_x) {
                this.m_x += this.m_speedX;
            }
            if (this.m_charlieY < this.m_y) {
                this.m_y -= this.m_speedY;
            }
            else if (this.m_charlieY > this.m_y) {
                this.m_y += this.m_speedY;
            }
        };
        ChasingEnemy.prototype.Draw = function (ctx) {
            ctx.beginPath();
            ctx.drawImage(this.m_texture, this.m_frame * 64, this.m_offsetY, 68, 68, this.m_x, this.m_y, 64, 64);
            if (this.m_debug) {
                ctx.beginPath();
                ctx.lineWidth = 1;
                ctx.strokeStyle = "green";
                ctx.rect(this.m_x + 10, this.m_y, this.m_width, this.m_height);
                ctx.stroke();
            }
        };
        return ChasingEnemy;
    }(Enemy));
    return ChasingEnemy;
});
//# sourceMappingURL=ChasingEnemy.js.map