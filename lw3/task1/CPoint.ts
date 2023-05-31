import { IDrawable } from "./IDrawable";

export class CPoint implements IDrawable {
    x: number;
    y: number;
    radius: number;

    constructor(x: number, y: number, radius: number) {
        this.x = x;
        this.y = y;
        this.radius = radius;
    }

    public draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = "black";

        ctx.beginPath();
        ctx.ellipse(this.x, this.y, this.radius, this.radius, 0, 0, 360);
        ctx.closePath();

        ctx.fill();
    }
}