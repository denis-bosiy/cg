import { Frame } from "./Frame";
import { IDrawable } from "./IDrawable";

export class Letter implements IDrawable {
    frame: Frame;
    x: number;
    y: number;
    value: string;
    color: string;
    size: number;

    constructor(frame: Frame, x: number, y: number, value: string, color: string, size: number = 18) {
        this.frame = frame;
        this.x = x;
        this.y = y;
        this.value = value;
        this.color = color;
        this.size = size;
    }

    public draw(context: CanvasRenderingContext2D): void {
        context.fillStyle = this.color;
        context.font = `${this.size}px Serif`
        context.fillText(this.value, this.x, this.y);
    }
}