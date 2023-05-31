export class Ellipse {
    x: number;
    y: number;
    radiusX: number;
    radiusY: number;
    rotation: number;

    constructor(x: number, y: number, radiusX: number, radiusY: number, rotation: number) {
        this.x = x;
        this.y = y;
        this.radiusX = radiusX;
        this.radiusY = radiusY;
        this.rotation = rotation;
    }
}