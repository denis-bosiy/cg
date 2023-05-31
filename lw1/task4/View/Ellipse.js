define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Ellipse = void 0;
    var Ellipse = /** @class */ (function () {
        function Ellipse(x, y, radiusX, radiusY, rotation, color) {
            this.x = x;
            this.y = y;
            this.radiusX = radiusX;
            this.radiusY = radiusY;
            this.rotation = rotation;
            this.color = color;
        }
        Ellipse.prototype.draw = function (context) {
            context.beginPath();
            context.fillStyle = this.color;
            context.lineWidth = 1; // Default line width
            context.ellipse(this.x, this.y, this.radiusX, this.radiusY, 0, 0, 360);
            context.fill();
            context.closePath();
        };
        return Ellipse;
    }());
    exports.Ellipse = Ellipse;
});
