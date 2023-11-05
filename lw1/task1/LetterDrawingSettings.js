define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LetterDrawingSettings = void 0;
    class LetterDrawingSettings {
        constructor(lines, lineWidth, color) {
            this.lines = lines;
            this.lineWidth = lineWidth;
            this.color = color;
        }
    }
    exports.LetterDrawingSettings = LetterDrawingSettings;
});
