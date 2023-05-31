define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Line = void 0;
    var Line = /** @class */ (function () {
        function Line(x0, y0, x1, y1, width, color) {
            this.x0 = x0;
            this.y0 = y0;
            this.x1 = x1;
            this.y1 = y1;
            this.width = width;
            this.color = color;
        }
        Line.prototype.draw = function (context) {
            context.beginPath();
            context.strokeStyle = this.color;
            context.lineWidth = this.width;
            context.moveTo(this.x0, this.y0);
            context.lineTo(this.x1, this.y1);
            context.stroke();
            context.closePath();
        };
        return Line;
    }());
    exports.Line = Line;
});
