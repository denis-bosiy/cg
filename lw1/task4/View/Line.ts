import { IDrawable } from "./IDrawable";

export class Line implements IDrawable {
    x0: number;
    y0: number;
    x1: number;
    y1: number;
    width: number;
    color: string;

    constructor(x0: number, y0: number, x1: number, y1: number, width: number, color: string) {
        this.x0 = x0;
        this.y0 = y0;
        this.x1 = x1;
        this.y1 = y1;
        this.width = width;
        this.color = color;
    }

    public draw(context: CanvasRenderingContext2D): void {
        context.beginPath();
        context.strokeStyle = this.color;
        context.lineWidth = this.width;

        context.moveTo(this.x0, this.y0);
        context.lineTo(this.x1, this.y1);

        context.stroke();
        context.closePath();
    }
}