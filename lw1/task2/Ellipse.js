define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Ellipse = void 0;
    var Ellipse = /** @class */ (function () {
        function Ellipse(x, y, radiusX, radiusY, rotation) {
            this.x = x;
            this.y = y;
            this.radiusX = radiusX;
            this.radiusY = radiusY;
            this.rotation = rotation;
        }
        return Ellipse;
    }());
    exports.Ellipse = Ellipse;
});
