define(["require", "exports", "./Ellipse", "./Frame", "./Hangman", "./Letter", "./Line", "./Scaffold", "./Scene"], function (require, exports, Ellipse_1, Frame_1, Hangman_1, Letter_1, Line_1, Scaffold_1, Scene_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SceneBuilder = void 0;
    var SceneBuilder = /** @class */ (function () {
        function SceneBuilder() {
        }
        SceneBuilder.prototype.buildHangman = function () {
            var head = new Ellipse_1.Ellipse(120, 200, 30, 30, 0, "black");
            var body = new Ellipse_1.Ellipse(120, 280, 20, 50, 0, "black");
            var hands = [new Line_1.Line(110, 250, 90, 310, 5, "black"), new Line_1.Line(130, 250, 150, 310, 5, "black")];
            var legs = [new Line_1.Line(120, 320, 110, 380, 5, "black"), new Line_1.Line(120, 320, 130, 380, 5, "black")];
            this._hangman = new Hangman_1.Hangman(head, body, hands, legs);
        };
        SceneBuilder.prototype.buildScaffold = function () {
            var bars = [new Line_1.Line(50, 100, 50, 500, 15, "brown"), new Line_1.Line(50, 100, 120, 100, 15, "brown")];
            var rope = new Line_1.Line(120, 100, 120, 170, 4, "brown");
            this._scaffold = new Scaffold_1.Scaffold(bars, rope);
        };
        SceneBuilder.prototype.buildHiddenWordOmissions = function (hiddenWord) {
            this._hiddenWordOmissions = [];
            var x0 = 400;
            for (var x = x0; x < x0 + hiddenWord.length * 60; x += 60) {
                this._hiddenWordOmissions.push(new Line_1.Line(x, 300, x + 50, 300, 15, "blue"));
            }
        };
        SceneBuilder.prototype.buildHiddenWordGuessedLetters = function (hiddenWord) {
            this._hiddenWordGuessedLetters = [];
            var x0 = 400;
            for (var x = x0, i = 0; i < hiddenWord.length; x += 60, i++) {
                this._hiddenWordGuessedLetters.push(new Letter_1.Letter(new Frame_1.Frame(x + 5, 270, 50, 30), x + 5, 270, hiddenWord[i], "green", 70));
            }
        };
        SceneBuilder.prototype.buildAlphabet = function () {
            this._alphabet = [];
            var russianAlphabet = "а,б,в,г,д,е,ё,ж,з,и,й,к,л,м,н,о,п,р,с,т,у,ф,х,ц,ч,ш,щ,ъ,ы,ь,э,ю,я".split(",");
            var x = 50;
            var y = 30;
            for (var i = 0; i < russianAlphabet.length; i++) {
                this._alphabet.push(new Letter_1.Letter(new Frame_1.Frame(x, y - 10, 10, 10), x, y, russianAlphabet[i], "green"));
                x += 20;
            }
        };
        SceneBuilder.prototype.build = function (hiddenWord) {
            this.buildHangman();
            this.buildScaffold();
            this.buildHiddenWordOmissions(hiddenWord);
            this.buildHiddenWordGuessedLetters(hiddenWord);
            this.buildAlphabet();
            return new Scene_1.Scene(this._hangman, this._scaffold, this._hiddenWordOmissions, this._hiddenWordGuessedLetters, this._alphabet);
        };
        return SceneBuilder;
    }());
    exports.SceneBuilder = SceneBuilder;
});
