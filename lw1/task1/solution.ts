import { LetterDrawingSettings } from "./LetterDrawingSettings";
import { LetterValue } from "./LetterValue";
import { Line } from "./Line";

const LETTER_SIZE_COEF: number = 12;
const START_VELOCITY: number = 40;
const ACCELERATION: number = 10;
const LETTERS_HORIZONTAL_OFFSET: number = 15 * LETTER_SIZE_COEF;
const DELTA: number = 20;
const VELOCITY_DECREASING_VALUE: number = 9;

const availableLetters: Map<string, LetterDrawingSettings>  = new Map();
availableLetters.set("Б", new LetterDrawingSettings([new Line(0, 0, 10, 0), new Line(0, 0, 0, 20), new Line(0, 10, 10, 10), new Line(10, 10, 10, 20), new Line(10, 20, 0, 20)], 5, "blue"));
availableLetters.set("Д", new LetterDrawingSettings([new Line(3, 0, 7, 0), new Line(3, 0, 3, 15), new Line(7, 0, 7, 15), new Line(0, 15, 10, 15), new Line(0, 15, 0, 20), new Line(10, 15, 10, 20)], 5, "red"));
availableLetters.set("В", new LetterDrawingSettings([new Line(0, 0, 9, 0), new Line(0, 0, 0, 20), new Line(0, 10, 6, 10), new Line(6, 10, 9, 20), new Line(9, 20, 0, 20), new Line(9, 0, 6, 10)], 5, "yellow"));

const drawLetter = (context: CanvasRenderingContext2D, letterDrawingSettings: LetterDrawingSettings, horizontalOffset: number, verticalOffset: number): void => {
    context.beginPath();
    context.strokeStyle = letterDrawingSettings.color;
    context.lineWidth = letterDrawingSettings.lineWidth * LETTER_SIZE_COEF / 3;

    letterDrawingSettings.lines.forEach((line: Line) => {
        context.moveTo(line.x0 * LETTER_SIZE_COEF + horizontalOffset + context.lineWidth, line.y0 * LETTER_SIZE_COEF + verticalOffset + context.lineWidth);
        context.lineTo(line.x1 * LETTER_SIZE_COEF + horizontalOffset + context.lineWidth, line.y1 * LETTER_SIZE_COEF + verticalOffset + context.lineWidth);
    });

    context.closePath();
    context.stroke();
}

const getMaxHeight = (velocity: number): number => {
    return velocity * velocity / 2 / ACCELERATION;
}

const getChangeDirectionTime = (velocity: number): number => {
    // Derivative of y = y0 + V0*t - (a*t^2)/2 by t
    // V0 - a*t = 0
    // a/t=V0
    // t=V0/a
    return velocity / ACCELERATION;
}

const runLetterAnimation = (context: CanvasRenderingContext2D, index: number, letterDrawingSettings: LetterDrawingSettings): void => {
    let t: number = 0;
    let isGoingUp: boolean = true;
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
        let verticalOffset: number = -200;
        const maxHeight: number = getMaxHeight(currentVelocity);
        // y = y0 + V0*t + (a*t^2)/2
        if (isGoingUp) {
            verticalOffset += -ACCELERATION / 2 * t * t / 1000000 + currentVelocity * t / 1000;
        } else {
            verticalOffset += maxHeight - ACCELERATION / 2 * t * t / 1000000;
        }
        verticalOffset *= -1;
        context.clearRect(index * LETTERS_HORIZONTAL_OFFSET, verticalOffset, (index+1) * LETTERS_HORIZONTAL_OFFSET, verticalOffset + 20 * LETTER_SIZE_COEF);
        drawLetter(context, letterDrawingSettings, index * LETTERS_HORIZONTAL_OFFSET, verticalOffset);
    }, DELTA);
}

export const main = (): void => {
    const letterValues: LetterValue[] = [new LetterValue("Б", 0), new LetterValue("Д", 1000), new LetterValue("В", 2000)];
    const canvas: HTMLCanvasElement | null = document.getElementById("canvas") as HTMLCanvasElement;
    if (!canvas) {
        return;
    }
    const context: CanvasRenderingContext2D | null = canvas.getContext("2d");
    if (!context) {
        return;
    }

    letterValues.forEach((value: LetterValue, index: number) => {
        if (!availableLetters.has(value.value)) {
            return;
        }
        const letterDrawingSettings: LetterDrawingSettings | undefined = availableLetters.get(value.value);
        if (!letterDrawingSettings) {
            return;
        }
        drawLetter(context, letterDrawingSettings, index * LETTERS_HORIZONTAL_OFFSET, 200);
    });
    letterValues.forEach((value: LetterValue, index: number) => {
        if (!availableLetters.has(value.value)) {
            return;
        }
        const letterDrawingSettings: LetterDrawingSettings | undefined = availableLetters.get(value.value);
        if (!letterDrawingSettings) {
            return;
        }
        setTimeout(() => {
            runLetterAnimation(context, index, letterDrawingSettings);
        }, value.phaseShift);
    });
}