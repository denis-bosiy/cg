define(["require", "exports", "../utils/StringUtil", "./HangmanState", "./ModelMessage", "./ModelMessageType", "./ScaffoldState"], function (require, exports, StringUtil_1, HangmanState_1, ModelMessage_1, ModelMessageType_1, ScaffoldState_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Model = void 0;
    var Model = /** @class */ (function () {
        function Model() {
            this.reset();
            this._observers = new Set();
        }
        Model.prototype.isManHanged = function () {
            var isHangmanDrawed = this.hangmanState.head && this.hangmanState.body && this.hangmanState.hands.filter(function (hand) { return !hand; }).length === 0 && this.hangmanState.legs.filter(function (leg) { return !leg; }).length === 0;
            var isScaffoldDrawed = this.scaffoldState.bars.filter(function (bar) { return !bar; }) && this.scaffoldState.rope;
            return isHangmanDrawed && isScaffoldDrawed;
        };
        Model.prototype.isManRescued = function () {
            var isHangmanDrawed = this.hangmanState.head && this.hangmanState.body && this.hangmanState.hands.filter(function (hand) { return !hand; }).length === 0 && this.hangmanState.legs.filter(function (leg) { return !leg; }).length === 0;
            var isScaffoldDrawed = this.scaffoldState.bars.filter(function (bar) { return !bar; }) && this.scaffoldState.rope;
            var isHiddenWordGuessed = this.hiddenWordGuessedLetters.filter(function (letter) { return !letter; }).length === 0;
            return isHiddenWordGuessed && !(isHangmanDrawed && isScaffoldDrawed);
        };
        Model.prototype.chooseLetter = function (letter) {
            if (this.unusedLetters.includes(letter)) {
                var unusedLetterIndex = this.unusedLetters.indexOf(letter);
                this.unusedLetters.splice(unusedLetterIndex, 1);
                this.usedLetters.push(letter);
                var letterOccurencesInHiddenWord_1 = StringUtil_1.StringUtil.findEachOccurencesOfSubstring(this.hiddenWord, letter);
                var previousHiddenWordGuessedLetters = this.hiddenWordGuessedLetters.map(function (letter) { return letter; });
                this.hiddenWordGuessedLetters = this.hiddenWordGuessedLetters.map(function (letter, index) { return letter || letterOccurencesInHiddenWord_1.includes(index); });
                var hasGuessedLetter = false;
                for (var i = 0; i < this.hiddenWordGuessedLetters.length; i++) {
                    if (this.hiddenWordGuessedLetters[i] !== previousHiddenWordGuessedLetters[i]) {
                        hasGuessedLetter = true;
                    }
                }
                if (!hasGuessedLetter) {
                    this.unhideNextPart();
                }
                if (this.isManHanged()) {
                    this.hiddenWordGuessedLetters = this.hiddenWordGuessedLetters.map(function () { return true; });
                }
                var modelMessageType = ModelMessageType_1.ModelMessageType.Continuation;
                if (this.isManHanged()) {
                    modelMessageType = ModelMessageType_1.ModelMessageType.Defeat;
                }
                if (this.isManRescued()) {
                    modelMessageType = ModelMessageType_1.ModelMessageType.Victory;
                }
                this.notifyObservers(new ModelMessage_1.ModelMessage(this, modelMessageType));
            }
        };
        Model.prototype.setHiddenWord = function (word) {
            this.reset();
            this.hiddenWord = word;
            this.hiddenWordGuessedLetters = [];
            for (var i = 0; i < word.length; i++) {
                this.hiddenWordGuessedLetters.push(false);
            }
            var modelMessageType = ModelMessageType_1.ModelMessageType.Continuation;
            if (this.isManHanged()) {
                modelMessageType = ModelMessageType_1.ModelMessageType.Defeat;
            }
            if (this.isManRescued()) {
                modelMessageType = ModelMessageType_1.ModelMessageType.Victory;
            }
            this.notifyObservers(new ModelMessage_1.ModelMessage(this, modelMessageType));
        };
        Model.prototype.addObserver = function (o) {
            this._observers.add(o);
        };
        Model.prototype.removeObserver = function (o) {
            this._observers.delete(o);
        };
        Model.prototype.notifyObservers = function (data) {
            var _a;
            (_a = this._observers) === null || _a === void 0 ? void 0 : _a.forEach(function (o) { return o.update(data); });
        };
        Model.prototype.unhideNextPart = function () {
            if (!this.scaffoldState.bars[0]) {
                this.scaffoldState.bars[0] = true;
                return;
            }
            if (!this.scaffoldState.bars[1]) {
                this.scaffoldState.bars[1] = true;
                return;
            }
            if (!this.scaffoldState.rope) {
                this.scaffoldState.rope = true;
                return;
            }
            if (!this.hangmanState.head) {
                this.hangmanState.head = true;
                return;
            }
            if (!this.hangmanState.body) {
                this.hangmanState.body = true;
                return;
            }
            if (!this.hangmanState.hands[0]) {
                this.hangmanState.hands[0] = true;
                return;
            }
            if (!this.hangmanState.hands[1]) {
                this.hangmanState.hands[1] = true;
                return;
            }
            if (!this.hangmanState.legs[0]) {
                this.hangmanState.legs[0] = true;
                return;
            }
            if (!this.hangmanState.legs[1]) {
                this.hangmanState.legs[1] = true;
                return;
            }
        };
        Model.prototype.reset = function () {
            this.hangmanState = new HangmanState_1.HangmanState();
            this.scaffoldState = new ScaffoldState_1.ScaffoldState();
            this.hiddenWord = "";
            this.usedLetters = [];
            this.unusedLetters = "а,б,в,г,д,е,ё,ж,з,и,й,к,л,м,н,о,п,р,с,т,у,ф,х,ц,ч,ш,щ,ъ,ы,ь,э,ю,я".split(",");
        };
        return Model;
    }());
    exports.Model = Model;
});
