define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BezierCurve = void 0;
    var BezierCurve = /** @class */ (function () {
        function BezierCurve(firstControlPoint, secondControlPoint, endPoint) {
            this.firstControlPoint = firstControlPoint;
            this.secondControlPoint = secondControlPoint;
            this.endPoint = endPoint;
        }
        return BezierCurve;
    }());
    exports.BezierCurve = BezierCurve;
});
