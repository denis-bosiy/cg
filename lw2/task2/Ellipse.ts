export class Ellipse {
    x: number;
    y: number;
    radiusX: number;
    radiusY: number;
    rotation: number;
    color: string;

    constructor(x: number, y: number, radiusX: number, radiusY: number, rotation: number, color: string) {
        this.x = x;
        this.y = y;
        this.radiusX = radiusX;
        this.radiusY = radiusY;
        this.rotation = rotation;
        this.color = color;
    }

    public draw(context: CanvasRenderingContext2D): void {
        context.fillStyle = this.color;
        context.lineWidth = 1;
        context.strokeStyle = this.color;

        context.beginPath();
        context.ellipse(this.x, this.y, this.radiusX, this.radiusY, 0, 0, 360);
        context.closePath();

        context.fill();
    }
}