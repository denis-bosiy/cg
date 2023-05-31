define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Scene = void 0;
    var Scene = /** @class */ (function () {
        function Scene() {
            this._images = [];
        }
        Scene.prototype.addImage = function (image) {
            this._images.push(image);
        };
        Scene.prototype.draw = function (context) {
            this._images.forEach(function (image) { return image.draw(context); });
        };
        Scene.prototype.clear = function (context) {
            var TEST_RECT_SIZE = 20;
            context.clearRect(0, 0, context.canvas.width, context.canvas.height);
            // Draw rect to show png's transparency
            context.rect(0, 0, TEST_RECT_SIZE, TEST_RECT_SIZE);
            context.fill();
        };
        return Scene;
    }());
    exports.Scene = Scene;
});
