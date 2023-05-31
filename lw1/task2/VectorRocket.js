define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.VectorRocket = void 0;
    var VectorRocket = /** @class */ (function () {
        function VectorRocket() {
        }
        VectorRocket.prototype.draw = function (context) {
            var _a;
            this.instrumentCompartment.forEach(function (complexItem) { return complexItem.draw(context); });
            this.spaceShip.forEach(function (complexItem) { return complexItem.draw(context); });
            this.supplier.forEach(function (complexItem) { return complexItem.draw(context); });
            this.oxidizerTank.forEach(function (complexItem) { return complexItem.draw(context); });
            this.fuelTank.forEach(function (complexItem) { return complexItem.draw(context); });
            (_a = this.jetStream) === null || _a === void 0 ? void 0 : _a.forEach(function (complexItem) { return complexItem.draw(context); });
            this.wings.forEach(function (complexItem) { return complexItem.draw(context); });
        };
        VectorRocket.prototype.changePosition = function (deltaX, deltaY) {
            var _a;
            this.frame.x += deltaX;
            this.frame.y += deltaY;
            this.instrumentCompartment.forEach(function (complexItem) { return complexItem.changePosition(deltaX, deltaY); });
            this.spaceShip.forEach(function (complexItem) { return complexItem.changePosition(deltaX, deltaY); });
            this.supplier.forEach(function (complexItem) { return complexItem.changePosition(deltaX, deltaY); });
            this.oxidizerTank.forEach(function (complexItem) { return complexItem.changePosition(deltaX, deltaY); });
            this.fuelTank.forEach(function (complexItem) { return complexItem.changePosition(deltaX, deltaY); });
            this.wings.forEach(function (complexItem) { return complexItem.changePosition(deltaX, deltaY); });
            (_a = this.jetStream) === null || _a === void 0 ? void 0 : _a.forEach(function (complexItem) { return complexItem.changePosition(deltaX, deltaY); });
        };
        return VectorRocket;
    }());
    exports.VectorRocket = VectorRocket;
});
