define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CPoint = void 0;
    var CPoint = /** @class */ (function () {
        function CPoint(x, y, radius) {
            this.x = x;
            this.y = y;
            this.radius = radius;
        }
        CPoint.prototype.draw = function (ctx) {
            ctx.fillStyle = "black";
            ctx.beginPath();
            ctx.ellipse(this.x, this.y, this.radius, this.radius, 0, 0, 360);
            ctx.closePath();
            ctx.fill();
        };
        return CPoint;
    }());
    exports.CPoint = CPoint;
});
