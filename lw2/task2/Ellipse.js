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
            context.fillStyle = this.color;
            // TODO: Убрать обводку эллипсов. Сброс альфа-канала у strokeStyle не работает по-правильному
            context.strokeStyle = "rgba(0,0,0,0)";
            context.beginPath();
            context.ellipse(this.x, this.y, this.radiusX, this.radiusY, 0, 0, 360);
            context.closePath();
            context.fill();
        };
        return Ellipse;
    }());
    exports.Ellipse = Ellipse;
});
