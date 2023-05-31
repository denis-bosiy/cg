import { BezierCurve } from "./BezierCurve";
import { Ellipse } from "./Ellipse";
import { IDrawable } from "./IDrawable";
import { Line } from "./Line";
import { Point } from "./Point";

export class ComplexItem implements IDrawable {
    bezierCurves: BezierCurve[];
    lines: Line[];
    ellipses: Ellipse[];
    fillStyle: string;
    strokeStyle: string;

    constructor(bezierCurves: BezierCurve[], lines: Line[], ellipses: Ellipse[], fillStyle: string) {
        this.bezierCurves = bezierCurves;
        this.lines = lines;
        this.ellipses = ellipses;
        this.fillStyle = fillStyle;
    }

    public draw(context: CanvasRenderingContext2D): void {
        context.fillStyle = this.fillStyle;
        context.strokeStyle = this.strokeStyle;
        context.beginPath();

        this.ellipses.forEach((ellipse: Ellipse) => {
            context.ellipse(ellipse.x, ellipse.y, ellipse.radiusX, ellipse.radiusY, ellipse.rotation, 0, 360);
        })
        if (this.bezierCurves.length !== 0) {
            context.moveTo(this.bezierCurves[0].firstControlPoint.x, this.bezierCurves[0].firstControlPoint.y);
        }
        this.bezierCurves.forEach((bezierCurve: BezierCurve) => {
            context.bezierCurveTo(bezierCurve.firstControlPoint.x, bezierCurve.firstControlPoint.y, bezierCurve.secondControlPoint.x, bezierCurve.secondControlPoint.y, bezierCurve.endPoint.x, bezierCurve.endPoint.y);
        });
        if (this.lines.length !== 0) {
            context.moveTo(this.lines[0].x0, this.lines[0].y0);
        }
        this.lines.forEach((line: Line) => {
            context.lineTo(line.x1, line.y1);
        });


        context.closePath();
        context.fill();
    }

    public changePosition(deltaX: number, deltaY: number): void {
        this.bezierCurves = this.bezierCurves.map((bezierCurve: BezierCurve) => new BezierCurve(new Point(bezierCurve.firstControlPoint.x + deltaX, bezierCurve.firstControlPoint.y + deltaY), new Point(bezierCurve.secondControlPoint.x + deltaX, bezierCurve.secondControlPoint.y + deltaY), new Point(bezierCurve.endPoint.x + deltaX, bezierCurve.endPoint.y + deltaY)));
        this.ellipses = this.ellipses.map((ellipse: Ellipse) => new Ellipse(ellipse.x + deltaX, ellipse.y + deltaY, ellipse.radiusX, ellipse.radiusY, ellipse.rotation));
        this.lines = this.lines.map((line: Line) => new Line(line.x0 + deltaX, line.y0 + deltaY, line.x1 + deltaX, line.y1 + deltaY));
    }
}