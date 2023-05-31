import { Point } from "./Point";

export class BezierCurve {
    firstControlPoint: Point;
    secondControlPoint: Point;
    endPoint: Point;

    constructor(firstControlPoint: Point, secondControlPoint: Point, endPoint: Point) {
        this.firstControlPoint = firstControlPoint;
        this.secondControlPoint = secondControlPoint;
        this.endPoint = endPoint;
    }
}