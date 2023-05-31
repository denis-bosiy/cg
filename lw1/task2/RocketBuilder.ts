import { BezierCurve } from "./BezierCurve";
import { Ellipse } from "./Ellipse";
import { Frame } from "./Frame";
import { IDrawable } from "./IDrawable";
import { Line } from "./Line";
import { Point } from "./Point";
import { VectorRocket } from "./VectorRocket";

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

export class RocketBuilder {
    public buildJetStream(deltaX: number, deltaY: number): ComplexItem[] {
        const jetStream: ComplexItem[] = [];
        const stream: ComplexItem = new ComplexItem([], [], [], "orange");

        stream.lines.push(new Line(330 + deltaX, 345 + deltaY, 378 + deltaX, 345 + deltaY));
        stream.lines.push(new Line(378 + deltaX, 375 + deltaY, 398 + deltaX, 375 + deltaY));
        stream.lines.push(new Line(398 + deltaX, 375 + deltaY, 310 + deltaX, 375 + deltaY));
        stream.lines.push(new Line(310 + deltaX, 375 + deltaY, 330 + deltaX, 345 + deltaY));

        jetStream.push(stream);
        return jetStream;
    }

    public buildWings(): ComplexItem[] {
        const wings: ComplexItem[] = [];
        const leftWing: ComplexItem = new ComplexItem([], [], [], "red");
        const mediumWing: ComplexItem = new ComplexItem([], [], [], "red");
        const rightWing: ComplexItem = new ComplexItem([], [], [], "red");

        leftWing.bezierCurves.push(new BezierCurve(new Point(317, 248), new Point(240, 280), new Point(290, 400)));
        leftWing.bezierCurves.push(new BezierCurve(new Point(290, 400), new Point(300, 315), new Point(327, 320)));
        mediumWing.bezierCurves.push(new BezierCurve(new Point(344, 250), new Point(355, 240), new Point(366, 250)));
        mediumWing.bezierCurves.push(new BezierCurve(new Point(366, 250), new Point(361, 333), new Point(355, 400)));
        rightWing.bezierCurves.push(new BezierCurve(new Point(391, 248), new Point(465, 280), new Point(420, 400)));
        rightWing.bezierCurves.push(new BezierCurve(new Point(420, 400), new Point(410, 315), new Point(381, 320)))

        wings.push(leftWing);
        wings.push(mediumWing);
        wings.push(rightWing);
        return wings;
    }

    public buildFuelTank(): ComplexItem[] {
        const fuelTank: ComplexItem[] = [];
        const body: ComplexItem = new ComplexItem([], [], [], "gray");

        body.lines.push(new Line(320, 273, 388, 273));
        body.lines.push(new Line(388, 273, 378, 345));
        body.lines.push(new Line(378, 345, 330, 345));
        body.lines.push(new Line(330, 345, 320, 273));
        body.bezierCurves.push(new BezierCurve(new Point(320, 273), new Point(353, 263), new Point(388, 273)))

        fuelTank.push(body);
        return fuelTank;
    }

    public buildOxidizerTank(): ComplexItem[] {
        const oxidizerTank: ComplexItem[] = [];
        const body: ComplexItem = new ComplexItem([], [], [], "orange");

        body.lines.push(new Line(320, 273, 315, 236));
        body.lines.push(new Line(315, 236, 394, 236));
        body.lines.push(new Line(394, 236, 388, 273));

        oxidizerTank.push(body);
        return oxidizerTank;
    }

    public buildSupplier(): ComplexItem[] {
        const supplier: ComplexItem[] = [];
        const body: ComplexItem = new ComplexItem([], [], [], "red");
        const rivets: ComplexItem[] = [];

        body.lines.push(new Line(313, 218, 396, 218));
        body.lines.push(new Line(396, 218, 394, 236));
        body.lines.push(new Line(394, 236, 315, 236));
        body.lines.push(new Line(315, 236, 313, 218));
        rivets.push(new ComplexItem([], [], [new Ellipse(319, 223, 3, 3, 0)], "white"));
        rivets.push(new ComplexItem([], [], [new Ellipse(328, 223, 3, 3, 0)], "white"));
        rivets.push(new ComplexItem([], [], [new Ellipse(337, 223, 3, 3, 0)], "white"));
        rivets.push(new ComplexItem([], [], [new Ellipse(346, 223, 3, 3, 0)], "white"));
        rivets.push(new ComplexItem([], [], [new Ellipse(355, 223, 3, 3, 0)], "white"));
        rivets.push(new ComplexItem([], [], [new Ellipse(364, 223, 3, 3, 0)], "white"));
        rivets.push(new ComplexItem([], [], [new Ellipse(373, 223, 3, 3, 0)], "white"));
        rivets.push(new ComplexItem([], [], [new Ellipse(382, 223, 3, 3, 0)], "white"));
        rivets.push(new ComplexItem([], [], [new Ellipse(390, 223, 3, 3, 0)], "white"));

        supplier.push(body);
        rivets.forEach((rivet: ComplexItem) => supplier.push(rivet));
        return supplier;
    }

    public buildSpaceShip(): ComplexItem[] {
        const spaceShip: ComplexItem[] = [];
        const body: ComplexItem = new ComplexItem([], [], [], "#ffd301");
        const upperWindowWafer: ComplexItem = new ComplexItem([], [], [], "red");
        const upperWindowHole: ComplexItem = new ComplexItem([], [], [], "#87ceeb");
        const lowerWindowWafer: ComplexItem = new ComplexItem([], [], [], "red");
        const lowerWindowHole: ComplexItem = new ComplexItem([], [], [], "#87ceeb");

        body.bezierCurves.push(new BezierCurve(new Point(313, 102), new Point(350, 77), new Point(396, 102)));
        body.lines.push(new Line(396, 102, 396, 218));
        body.lines.push(new Line(396, 218, 313, 218));
        body.lines.push(new Line(313, 218, 313, 102));
        upperWindowWafer.ellipses.push(new Ellipse(355, 137, 30, 30, 0));
        upperWindowHole.ellipses.push(new Ellipse(355, 137, 20, 20, 0));
        lowerWindowWafer.ellipses.push(new Ellipse(355, 193, 12, 12, 0));
        lowerWindowHole.ellipses.push(new Ellipse(355, 193, 8, 8, 0));

        spaceShip.push(body);
        spaceShip.push(upperWindowWafer);
        spaceShip.push(upperWindowHole);
        spaceShip.push(lowerWindowWafer);
        spaceShip.push(lowerWindowHole);
        return spaceShip;
    }

    public buildInstrumentCompartment(): ComplexItem[] {
        const instrumentCompartment: ComplexItem[] = [];
        const head: ComplexItem = new ComplexItem([], [], [], "orange");
        const rivets: ComplexItem[] = [];
        const tail: ComplexItem = new ComplexItem([], [], [], "red");

        head.bezierCurves.push(new BezierCurve(new Point(327, 52), new Point(350, 0), new Point(383, 52)));
        tail.bezierCurves.push(new BezierCurve(new Point(327, 52), new Point(350, 35), new Point(383, 52)));
        tail.lines.push(new Line(327, 52, 313, 102));
        tail.lines.push(new Line(313, 102, 396, 102));
        tail.lines.push(new Line(396, 102, 383, 52));
        tail.lines.push(new Line(383, 52, 327, 52));
        rivets.push(new ComplexItem([], [], [new Ellipse(322, 89, 3, 3, 0)], "white"));
        rivets.push(new ComplexItem([], [], [new Ellipse(332, 87, 3, 3, 0)], "white"));
        rivets.push(new ComplexItem([], [], [new Ellipse(342, 85, 3, 3, 0)], "white"));
        // The highest rivet
        rivets.push(new ComplexItem([], [], [new Ellipse(352, 83, 3, 3, 0)], "white"));
        // The highest rivet
        rivets.push(new ComplexItem([], [], [new Ellipse(364, 85, 3, 3, 0)], "white"));
        rivets.push(new ComplexItem([], [], [new Ellipse(374, 87, 3, 3, 0)], "white"));
        rivets.push(new ComplexItem([], [], [new Ellipse(384, 89, 3, 3, 0)], "white"));

        instrumentCompartment.push(head);
        instrumentCompartment.push(tail);
        rivets.forEach((rivet: ComplexItem) => instrumentCompartment.push(rivet));
        return instrumentCompartment;
    }

    public build(): VectorRocket {
        const rocket: VectorRocket = new VectorRocket();
        rocket.frame = new Frame(287, 37, 155, 368);

        return rocket;
    }
}