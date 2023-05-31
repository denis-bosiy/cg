define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ImageContainer = void 0;
    var ImageContainer = /** @class */ (function () {
        function ImageContainer(image, x, y) {
            this._image = image;
            this._x = x;
            this._y = y;
        }
        ImageContainer.prototype.draw = function (context) {
            context.drawImage(this._image, this._x, this._y);
        };
        ImageContainer.prototype.setPositionX = function (x) {
            this._x = x;
        };
        ImageContainer.prototype.setPositionY = function (y) {
            this._y = y;
        };
        return ImageContainer;
    }());
    exports.ImageContainer = ImageContainer;
});
