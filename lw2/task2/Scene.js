define(["require", "exports", "./Ellipse"], function (require, exports, Ellipse_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Scene = void 0;
    var Scene = /** @class */ (function () {
        function Scene() {
            this._images = [];
            this._ellipses = [];
        }
        Scene.prototype.addImage = function (image) {
            this._images.push(image);
        };
        Scene.prototype.draw = function (context) {
            this._images.forEach(function (image) { return image.draw(context); });
            this._ellipses.forEach(function (ellipse) { return ellipse.draw(context); });
        };
        Scene.prototype.clear = function (context) {
            context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        };
        Scene.prototype.makePaintable = function (context, penColor) {
            var _this = this;
            this._penColor = penColor;
            var isDragging = false;
            document.addEventListener("mousedown", function (event) {
                var canvasEventX = event.clientX - context.canvas.getBoundingClientRect().left;
                var canvasEventY = event.clientY - context.canvas.getBoundingClientRect().top;
                var isMouseAtCanvas = canvasEventX <= context.canvas.width && canvasEventY <= context.canvas.height;
                if (isMouseAtCanvas) {
                    isDragging = true;
                    var newEllipse = new Ellipse_1.Ellipse(canvasEventX, canvasEventY, 10, 10, 0, _this._penColor);
                    _this._ellipses.push(newEllipse);
                    newEllipse.draw(context);
                }
            });
            document.addEventListener("mousemove", function (event) {
                var canvasEventX = event.clientX - context.canvas.getBoundingClientRect().left;
                var canvasEventY = event.clientY - context.canvas.getBoundingClientRect().top;
                var isMouseAtCanvas = canvasEventX <= context.canvas.width && canvasEventY <= context.canvas.height;
                if (isMouseAtCanvas && isDragging) {
                    var DEFAULT_ELLIPSE_RADIUS = 10;
                    var newEllipse = new Ellipse_1.Ellipse(canvasEventX, canvasEventY, DEFAULT_ELLIPSE_RADIUS, DEFAULT_ELLIPSE_RADIUS, 0, _this._penColor);
                    _this._ellipses.push(newEllipse);
                    newEllipse.draw(context);
                }
            });
            document.addEventListener("mouseup", function (event) {
                var canvasEventX = event.clientX - context.canvas.getBoundingClientRect().left;
                var canvasEventY = event.clientY - context.canvas.getBoundingClientRect().top;
                var isMouseAtCanvas = canvasEventX <= context.canvas.width && canvasEventY <= context.canvas.height;
                if (isMouseAtCanvas) {
                    isDragging = false;
                }
            });
        };
        Scene.prototype.setPenColor = function (color) {
            this._penColor = color;
        };
        return Scene;
    }());
    exports.Scene = Scene;
});
