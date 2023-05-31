define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.StringUtil = void 0;
    var StringUtil = /** @class */ (function () {
        function StringUtil() {
        }
        StringUtil.findEachOccurencesOfSubstring = function (str, subString) {
            var pos = 0;
            var result = [];
            var lowerCasedStr = str.toLowerCase();
            while (lowerCasedStr.indexOf(subString, pos) != -1) {
                result.push(lowerCasedStr.indexOf(subString, pos));
                pos = lowerCasedStr.indexOf(subString, pos) + 1;
            }
            return result;
        };
        return StringUtil;
    }());
    exports.StringUtil = StringUtil;
});
