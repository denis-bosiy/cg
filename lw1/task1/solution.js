define(["require", "exports", "./LetterDrawingSettings", "./LetterValue", "./Line"], function (require, exports, LetterDrawingSettings_1, LetterValue_1, Line_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.main = void 0;
    const LETTER_SIZE_COEF = 12;
    const START_VELOCITY = 40;
    const ACCELERATION = 10;
    const LETTERS_HORIZONTAL_OFFSET = 15 * LETTER_SIZE_COEF;
    const DELTA = 20;
    const VELOCITY_DECREASING_VALUE = 9;
    const availableLetters = new Map();
    availableLetters.set("Б", new LetterDrawingSettings_1.LetterDrawingSettings([new Line_1.Line(0, 0, 10, 0), new Line_1.Line(0, 0, 0, 20), new Line_1.Line(0, 10, 10, 10), new Line_1.Line(10, 10, 10, 20), new Line_1.Line(10, 20, 0, 20)], 5, "blue"));
    availableLetters.set("Д", new LetterDrawingSettings_1.LetterDrawingSettings([new Line_1.Line(3, 0, 7, 0), new Line_1.Line(3, 0, 3, 15), new Line_1.Line(7, 0, 7, 15), new Line_1.Line(0, 15, 10, 15), new Line_1.Line(0, 15, 0, 20), new Line_1.Line(10, 15, 10, 20)], 5, "red"));
    availableLetters.set("В", new LetterDrawingSettings_1.LetterDrawingSettings([new Line_1.Line(0, 0, 9, 0), new Line_1.Line(0, 0, 0, 20), new Line_1.Line(0, 10, 6, 10), new Line_1.Line(6, 10, 9, 20), new Line_1.Line(9, 20, 0, 20), new Line_1.Line(9, 0, 6, 10)], 5, "yellow"));
    const drawLetter = (context, letterDrawingSettings, horizontalOffset, verticalOffset) => {
        context.beginPath();
        context.strokeStyle = letterDrawingSettings.color;
        context.lineWidth = letterDrawingSettings.lineWidth * LETTER_SIZE_COEF / 3;
        letterDrawingSettings.lines.forEach((line) => {
            context.moveTo(line.x0 * LETTER_SIZE_COEF + horizontalOffset + context.lineWidth, line.y0 * LETTER_SIZE_COEF + verticalOffset + context.lineWidth);
            context.lineTo(line.x1 * LETTER_SIZE_COEF + horizontalOffset + context.lineWidth, line.y1 * LETTER_SIZE_COEF + verticalOffset + context.lineWidth);
        });
        context.closePath();
        context.stroke();
    };
    const getMaxHeight = (velocity) => {
        return velocity * velocity / 2 / ACCELERATION;
    };
    const getChangeDirectionTime = (velocity) => {
        // Derivative of y = y0 + V0*t - (a*t^2)/2 by t
        // V0 - a*t = 0
        // a/t=V0
        // t=V0/a
        return velocity / ACCELERATION;
    };
    const runLetterAnimation = (context, index, letterDrawingSettings) => {
        let t = 0;
        let isGoingUp = true;
        let currentVelocity = START_VELOCITY;
        let changeDirectionTime = getChangeDirectionTime(START_VELOCITY);
        const interval = setInterval(() => {
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
            let verticalOffset = -200;
            const maxHeight = getMaxHeight(currentVelocity);
            // y = y0 + V0*t + (a*t^2)/2
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
    const main = () => {
        const letterValues = [new LetterValue_1.LetterValue("Б", 0), new LetterValue_1.LetterValue("Д", 1000), new LetterValue_1.LetterValue("В", 2000)];
        const canvas = document.getElementById("canvas");
        if (!canvas) {
            return;
        }
        const context = canvas.getContext("2d");
        if (!context) {
            return;
        }
        letterValues.forEach((value, index) => {
            if (!availableLetters.has(value.value)) {
                return;
            }
            const letterDrawingSettings = availableLetters.get(value.value);
            if (!letterDrawingSettings) {
                return;
            }
            drawLetter(context, letterDrawingSettings, index * LETTERS_HORIZONTAL_OFFSET, 200);
        });
        letterValues.forEach((value, index) => {
            if (!availableLetters.has(value.value)) {
                return;
            }
            const letterDrawingSettings = availableLetters.get(value.value);
            if (!letterDrawingSettings) {
                return;
            }
            setTimeout(() => {
                runLetterAnimation(context, index, letterDrawingSettings);
            }, value.phaseShift);
        });
    };
    exports.main = main;
});
