define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LetterDrawingSettings = void 0;
    var LetterDrawingSettings = /** @class */ (function () {
        function LetterDrawingSettings(lines, lineWidth, color) {
            this.lines = lines;
            this.lineWidth = lineWidth;
            this.color = color;
        }
        return LetterDrawingSettings;
    }());
    exports.LetterDrawingSettings = LetterDrawingSettings;
});
