define(["require", "exports"], function (require, exports) {
    "use strict";
    var Rectangle = (function () {
        function Rectangle(left, top, right, bottom) {
            this.m_left = left;
            this.m_top = top;
            this.m_right = right;
            this.m_bottom = bottom;
            this.m_width = right + left;
            this.m_height = bottom + top;
        }
        Object.defineProperty(Rectangle.prototype, "Left", {
            get: function () {
                return this.m_left;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Rectangle.prototype, "Top", {
            get: function () {
                return this.m_top;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Rectangle.prototype, "Right", {
            get: function () {
                return this.m_right;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Rectangle.prototype, "Bottom", {
            get: function () {
                return this.m_bottom;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Rectangle.prototype, "Width", {
            get: function () {
                return this.m_width;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Rectangle.prototype, "Height", {
            get: function () {
                return this.m_height;
            },
            enumerable: true,
            configurable: true
        });
        Rectangle.prototype.Intersects = function (rect) {
            var wtf = this.FromLTRB(this.Left, this.Top, this.Right, this.Bottom);
            var wtf1 = this.FromLTRB(rect.Left, rect.Top, rect.Right, rect.Bottom);
            var result1 = (wtf.Left < wtf1.Right &&
                wtf.Right > wtf1.Left &&
                wtf.Top < wtf1.Bottom &&
                wtf.Bottom > wtf1.Top);
            return result1;
        };
        Rectangle.prototype.FromLTRB = function (left, top, right, bottom) {
            //return new Rectangle(left, top, right, bottom);
            return new Rectangle(left, top, right + left, bottom + top);
        };
        return Rectangle;
    }());
    return Rectangle;
});
//# sourceMappingURL=Rectangle.js.map