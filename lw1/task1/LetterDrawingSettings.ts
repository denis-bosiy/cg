import { Line } from "./Line";

export class LetterDrawingSettings {
    lines: Line[];
    lineWidth: number;
    color: string;

    constructor(lines: Line[], lineWidth: number, color: string) {
        this.lines = lines;
        this.lineWidth = lineWidth;
        this.color = color;
    }
}