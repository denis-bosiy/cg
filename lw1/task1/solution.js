define(["require", "exports", "./LetterDrawingSettings", "./LetterValue", "./Line"], function (require, exports, LetterDrawingSettings_1, LetterValue_1, Line_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.main = void 0;
    var LETTER_SIZE_COEF = 12;
    var START_VELOCITY = 40;
    var ACCELERATION = 10;
    var LETTERS_HORIZONTAL_OFFSET = 15 * LETTER_SIZE_COEF;
    var DELTA = 20;
    var VELOCITY_DECREASING_VALUE = 9;
    var availableLetters = new Map();
    availableLetters.set("Б", new LetterDrawingSettings_1.LetterDrawingSettings([new Line_1.Line(0, 0, 10, 0), new Line_1.Line(0, 0, 0, 20), new Line_1.Line(0, 10, 10, 10), new Line_1.Line(10, 10, 10, 20), new Line_1.Line(10, 20, 0, 20)], 5, "blue"));
    availableLetters.set("Д", new LetterDrawingSettings_1.LetterDrawingSettings([new Line_1.Line(3, 0, 7, 0), new Line_1.Line(3, 0, 3, 15), new Line_1.Line(7, 0, 7, 15), new Line_1.Line(0, 15, 10, 15), new Line_1.Line(0, 15, 0, 20), new Line_1.Line(10, 15, 10, 20)], 5, "red"));
    availableLetters.set("В", new LetterDrawingSettings_1.LetterDrawingSettings([new Line_1.Line(0, 0, 9, 0), new Line_1.Line(0, 0, 0, 20), new Line_1.Line(0, 10, 6, 10), new Line_1.Line(6, 10, 9, 20), new Line_1.Line(9, 20, 0, 20), new Line_1.Line(9, 0, 6, 10)], 5, "yellow"));
    var drawLetter = function (context, letterDrawingSettings, horizontalOffset, verticalOffset) {
        context.beginPath();
        context.strokeStyle = letterDrawingSettings.color;
        context.lineWidth = letterDrawingSettings.lineWidth * LETTER_SIZE_COEF / 3;
        letterDrawingSettings.lines.forEach(function (line) {
            context.moveTo(line.x0 * LETTER_SIZE_COEF + horizontalOffset + context.lineWidth, line.y0 * LETTER_SIZE_COEF + verticalOffset + context.lineWidth);
            context.lineTo(line.x1 * LETTER_SIZE_COEF + horizontalOffset + context.lineWidth, line.y1 * LETTER_SIZE_COEF + verticalOffset + context.lineWidth);
        });
        context.closePath();
        context.stroke();
    };
    var getMaxHeight = function (velocity) {
        return velocity * velocity / 2 / ACCELERATION;
    };
    var getChangeDirectionTime = function (velocity) {
        return velocity / ACCELERATION;
    };
    var runLetterAnimation = function (context, index, letterDrawingSettings) {
        var t = 0;
        var isGoingUp = true;
        var currentVelocity = START_VELOCITY;
        var changeDirectionTime = getChangeDirectionTime(START_VELOCITY);
        var interval = setInterval(function () {
            t += DELTA;
            if (t % (changeDirectionTime * 1000) === 0) {
                t = 0;
                if (!isGoingUp) {
                    currentVelocity -= VELOCITY_DECREASING_VALUE;
                    changeDirectionTime = getChangeDirectionTime(currentVelocity);
                }
                if (currentVelocity <= 0) {
                    clearInterval(interval);
                }
                isGoingUp = !isGoingUp;
            }
            var verticalOffset = -200;
            var maxHeight = getMaxHeight(currentVelocity);
            // y = y0 + Vot + (a*t^2)/2
            if (isGoingUp) {
                verticalOffset += -ACCELERATION / 2 * t * t / 1000000 + currentVelocity * t / 1000;
            }
            else {
                verticalOffset += maxHeight - ACCELERATION / 2 * t * t / 1000000;
            }
            verticalOffset *= -1;
            context.clearRect(index * LETTERS_HORIZONTAL_OFFSET, verticalOffset, (index + 1) * LETTERS_HORIZONTAL_OFFSET, verticalOffset + 20 * LETTER_SIZE_COEF);
            drawLetter(context, letterDrawingSettings, index * LETTERS_HORIZONTAL_OFFSET, verticalOffset);
        }, DELTA);
    };
    var main = function () {
        var letterValues = [new LetterValue_1.LetterValue("Б", 0), new LetterValue_1.LetterValue("Д", 1000), new LetterValue_1.LetterValue("В", 2000)];
        var canvas = document.getElementById("canvas");
        if (!canvas) {
            return;
        }
        var context = canvas.getContext("2d");
        if (!context) {
            return;
        }
        letterValues.forEach(function (value, index) {
            if (!availableLetters.has(value.value)) {
                return;
            }
            var letterDrawingSettings = availableLetters.get(value.value);
            if (!letterDrawingSettings) {
                return;
            }
            drawLetter(context, letterDrawingSettings, index * LETTERS_HORIZONTAL_OFFSET, 200);
        });
        letterValues.forEach(function (value, index) {
            if (!availableLetters.has(value.value)) {
                return;
            }
            var letterDrawingSettings = availableLetters.get(value.value);
            if (!letterDrawingSettings) {
                return;
            }
            setTimeout(function () {
                runLetterAnimation(context, index, letterDrawingSettings);
            }, value.phaseShift);
        });
    };
    exports.main = main;
});
