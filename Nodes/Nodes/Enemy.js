var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "BaseObject"], function (require, exports, BaseObject) {
    "use strict";
    var Enemy = (function (_super) {
        __extends(Enemy, _super);
        function Enemy(xpos, ypos, speedX, texture, walls) {
            _super.call(this, texture);
            this.m_speed = speedX;
            this.m_x = xpos;
            this.m_y = ypos;
            this.m_width = texture.width;
            this.m_height = texture.height;
            this.m_frame = 0;
            this.m_offsetX = 0;
            this.m_offsetY = 0;
            this.m_walls = walls;
            this.m_sheetSize = 8;
            this.m_timeSinceLastFrame = 0;
            this.m_millisecondsPerFrame = 100;
        }
        Enemy.prototype.Update = function () { };
        Object.defineProperty(Enemy.prototype, "Name", {
            get: function () { return this.m_name; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Enemy.prototype, "Walls", {
            set: function (value) { this.m_walls = value; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Enemy.prototype, "Ledges", {
            set: function (value) { this.m_platforms = value; },
            enumerable: true,
            configurable: true
        });
        return Enemy;
    }(BaseObject));
    return Enemy;
});
//# sourceMappingURL=Enemy.js.map