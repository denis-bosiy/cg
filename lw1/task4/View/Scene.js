define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Scene = void 0;
    var Scene = /** @class */ (function () {
        function Scene(hangman, scaffold, hiddenWordOmissions, hiddenWordGuessedLetters, alphabet) {
            this._hangman = hangman;
            this._scaffold = scaffold;
            this._hiddenWordOmissions = hiddenWordOmissions;
            this._hiddenWordGuessedLetters = hiddenWordGuessedLetters;
            this._alphabet = alphabet;
        }
        Scene.prototype.setState = function (state) {
            this._state = state;
        };
        Scene.prototype.draw = function (context) {
            var _this = this;
            if (this._state.hangmanState.head) {
                this._hangman.head.draw(context);
            }
            if (this._state.hangmanState.body) {
                this._hangman.body.draw(context);
            }
            for (var i = 0; i < this._state.hangmanState.hands.length; i++) {
                if (this._state.hangmanState.hands[i]) {
                    this._hangman.hands[i].draw(context);
                }
            }
            for (var i = 0; i < this._state.hangmanState.legs.length; i++) {
                if (this._state.hangmanState.legs[i]) {
                    this._hangman.legs[i].draw(context);
                }
            }
            for (var i = 0; i < this._state.scaffoldState.bars.length; i++) {
                if (this._state.scaffoldState.bars[i]) {
                    this._scaffold.bars[i].draw(context);
                }
            }
            if (this._state.scaffoldState.rope) {
                this._scaffold.rope.draw(context);
            }
            this._hiddenWordOmissions.forEach(function (omission) { return omission.draw(context); });
            for (var i = 0; i < this._state.hiddenWordGuessedLetters.length; i++) {
                if (this._state.isManHanged()) {
                    this._hiddenWordGuessedLetters[i].color = "red";
                }
            }
            for (var i = 0; i < this._state.hiddenWordGuessedLetters.length; i++) {
                if (this._state.hiddenWordGuessedLetters[i]) {
                    this._hiddenWordGuessedLetters[i].draw(context);
                }
            }
            this._alphabet.forEach(function (letter) {
                if (_this._state.usedLetters.includes(letter.value)) {
                    letter.color = "red";
                }
            });
            this._alphabet.forEach(function (letter) { return letter.draw(context); });
        };
        Scene.prototype.clear = function (context) {
            context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        };
        Scene.prototype.getAlphabet = function () {
            return this._alphabet;
        };
        return Scene;
    }());
    exports.Scene = Scene;
});
