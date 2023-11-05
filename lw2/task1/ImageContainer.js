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
        ImageContainer.prototype.makeDraggable = function (ctx, scene) {
            var _this = this;
            scene.clear(ctx);
            scene.draw(ctx);
            var lastEventPosition = { x: 0, y: 0 };
            var isDragging = false;
            // TODO: Добавлять обработку события mousedown на ctx.canvas
            document.addEventListener("mousedown", function (event) {
                var canvasEventX = event.clientX - ctx.canvas.getBoundingClientRect().left;
                var canvasEventY = event.clientY - ctx.canvas.getBoundingClientRect().top;
                var isMouseAtCanvas = canvasEventX <= ctx.canvas.width && canvasEventY <= ctx.canvas.height;
                var isMouseAtImage = canvasEventX >= _this._x && canvasEventX <= _this._x + _this._image.width && canvasEventY >= _this._y && canvasEventY <= _this._y + _this._image.height;
                if (isMouseAtCanvas && isMouseAtImage) {
                    isDragging = true;
                    lastEventPosition = { x: canvasEventX, y: canvasEventY };
                }
            });
            document.addEventListener("mousemove", function (event) {
                var canvasEventX = event.clientX - ctx.canvas.getBoundingClientRect().left;
                var canvasEventY = event.clientY - ctx.canvas.getBoundingClientRect().top;
                var isMouseAtCanvas = canvasEventX <= ctx.canvas.width && canvasEventY <= ctx.canvas.height;
                if (isMouseAtCanvas && isDragging) {
                    scene.clear(ctx);
                    _this._x = _this._x + canvasEventX - lastEventPosition.x;
                    _this._y = _this._y + canvasEventY - lastEventPosition.y;
                    scene.draw(ctx);
                    lastEventPosition = { x: canvasEventX, y: canvasEventY };
                }
            });
            document.addEventListener("mouseup", function (event) {
                var canvasEventX = event.clientX - ctx.canvas.getBoundingClientRect().left;
                var canvasEventY = event.clientY - ctx.canvas.getBoundingClientRect().top;
                var isMouseAtCanvas = canvasEventX <= ctx.canvas.width && canvasEventY <= ctx.canvas.height;
                var isMouseAtImage = canvasEventX >= _this._x && canvasEventX <= _this._x + _this._image.width && canvasEventY >= _this._y && canvasEventY <= _this._y + _this._image.height;
                if (isMouseAtCanvas && isMouseAtImage) {
                    isDragging = false;
                }
            });
        };
        return ImageContainer;
    }());
    exports.ImageContainer = ImageContainer;
});
