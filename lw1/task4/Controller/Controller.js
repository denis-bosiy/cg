define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Controller = void 0;
    var Controller = /** @class */ (function () {
        function Controller(model) {
            this._model = model;
        }
        Controller.prototype.handleLetterClick = function (letter) {
            this._model.chooseLetter(letter);
        };
        Controller.prototype.setHiddenWord = function (word) {
            this._model.setHiddenWord(word);
        };
        Controller.prototype.getHiddenWord = function (words) {
            return words[Math.floor(Math.random() * words.length)];
        };
        return Controller;
    }());
    exports.Controller = Controller;
});
