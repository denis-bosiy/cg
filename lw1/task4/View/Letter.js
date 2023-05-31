define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Letter = void 0;
    var Letter = /** @class */ (function () {
        function Letter(frame, x, y, value, color, size) {
            if (size === void 0) { size = 18; }
            this.frame = frame;
            this.x = x;
            this.y = y;
            this.value = value;
            this.color = color;
            this.size = size;
        }
        Letter.prototype.draw = function (context) {
            context.fillStyle = this.color;
            context.font = "".concat(this.size, "px Serif");
            context.fillText(this.value, this.x, this.y);
        };
        return Letter;
    }());
    exports.Letter = Letter;
});
