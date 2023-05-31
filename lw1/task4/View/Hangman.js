define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Hangman = void 0;
    var Hangman = /** @class */ (function () {
        function Hangman(head, body, hands, legs) {
            this.head = head;
            this.body = body;
            this.hands = hands;
            this.legs = legs;
        }
        Hangman.prototype.draw = function (context) {
            this.head.draw(context);
            this.body.draw(context);
            this.hands.forEach(function (hand) { return hand.draw(context); });
            this.legs.forEach(function (leg) { return leg.draw(context); });
        };
        return Hangman;
    }());
    exports.Hangman = Hangman;
});
