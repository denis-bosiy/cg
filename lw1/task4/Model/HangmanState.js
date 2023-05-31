define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.HangmanState = void 0;
    var HangmanState = /** @class */ (function () {
        function HangmanState() {
            this.head = false;
            this.body = false;
            this.hands = [false, false];
            this.legs = [false, false];
        }
        return HangmanState;
    }());
    exports.HangmanState = HangmanState;
});
