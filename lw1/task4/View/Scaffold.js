define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Scaffold = void 0;
    var Scaffold = /** @class */ (function () {
        function Scaffold(bars, rope) {
            this.bars = bars;
            this.rope = rope;
        }
        Scaffold.prototype.draw = function (context) {
            this.bars.forEach(function (bar) { return bar.draw(context); });
            this.rope.draw(context);
        };
        return Scaffold;
    }());
    exports.Scaffold = Scaffold;
});
