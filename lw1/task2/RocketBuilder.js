define(["require", "exports", "./BezierCurve", "./Ellipse", "./Frame", "./Line", "./Point", "./VectorRocket"], function (require, exports, BezierCurve_1, Ellipse_1, Frame_1, Line_1, Point_1, VectorRocket_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.RocketBuilder = exports.ComplexItem = void 0;
    var ComplexItem = /** @class */ (function () {
        function ComplexItem(bezierCurves, lines, ellipses, fillStyle) {
            this.bezierCurves = bezierCurves;
            this.lines = lines;
            this.ellipses = ellipses;
            this.fillStyle = fillStyle;
        }
        ComplexItem.prototype.draw = function (context) {
            context.fillStyle = this.fillStyle;
            context.strokeStyle = this.strokeStyle;
            context.beginPath();
            this.ellipses.forEach(function (ellipse) {
                context.ellipse(ellipse.x, ellipse.y, ellipse.radiusX, ellipse.radiusY, ellipse.rotation, 0, 360);
            });
            if (this.bezierCurves.length !== 0) {
                context.moveTo(this.bezierCurves[0].firstControlPoint.x, this.bezierCurves[0].firstControlPoint.y);
            }
            this.bezierCurves.forEach(function (bezierCurve) {
                context.bezierCurveTo(bezierCurve.firstControlPoint.x, bezierCurve.firstControlPoint.y, bezierCurve.secondControlPoint.x, bezierCurve.secondControlPoint.y, bezierCurve.endPoint.x, bezierCurve.endPoint.y);
            });
            if (this.lines.length !== 0) {
                context.moveTo(this.lines[0].x0, this.lines[0].y0);
            }
            this.lines.forEach(function (line) {
                context.lineTo(line.x1, line.y1);
            });
            context.closePath();
            context.fill();
        };
        ComplexItem.prototype.changePosition = function (deltaX, deltaY) {
            this.bezierCurves = this.bezierCurves.map(function (bezierCurve) { return new BezierCurve_1.BezierCurve(new Point_1.Point(bezierCurve.firstControlPoint.x + deltaX, bezierCurve.firstControlPoint.y + deltaY), new Point_1.Point(bezierCurve.secondControlPoint.x + deltaX, bezierCurve.secondControlPoint.y + deltaY), new Point_1.Point(bezierCurve.endPoint.x + deltaX, bezierCurve.endPoint.y + deltaY)); });
            this.ellipses = this.ellipses.map(function (ellipse) { return new Ellipse_1.Ellipse(ellipse.x + deltaX, ellipse.y + deltaY, ellipse.radiusX, ellipse.radiusY, ellipse.rotation); });
            this.lines = this.lines.map(function (line) { return new Line_1.Line(line.x0 + deltaX, line.y0 + deltaY, line.x1 + deltaX, line.y1 + deltaY); });
        };
        return ComplexItem;
    }());
    exports.ComplexItem = ComplexItem;
    var RocketBuilder = /** @class */ (function () {
        function RocketBuilder() {
        }
        RocketBuilder.prototype.buildJetStream = function (deltaX, deltaY) {
            var jetStream = [];
            var stream = new ComplexItem([], [], [], "orange");
            stream.lines.push(new Line_1.Line(330 + deltaX, 345 + deltaY, 378 + deltaX, 345 + deltaY));
            stream.lines.push(new Line_1.Line(378 + deltaX, 375 + deltaY, 398 + deltaX, 375 + deltaY));
            stream.lines.push(new Line_1.Line(398 + deltaX, 375 + deltaY, 310 + deltaX, 375 + deltaY));
            stream.lines.push(new Line_1.Line(310 + deltaX, 375 + deltaY, 330 + deltaX, 345 + deltaY));
            jetStream.push(stream);
            return jetStream;
        };
        RocketBuilder.prototype.buildWings = function () {
            var wings = [];
            var leftWing = new ComplexItem([], [], [], "red");
            var mediumWing = new ComplexItem([], [], [], "red");
            var rightWing = new ComplexItem([], [], [], "red");
            leftWing.bezierCurves.push(new BezierCurve_1.BezierCurve(new Point_1.Point(317, 248), new Point_1.Point(240, 280), new Point_1.Point(290, 400)));
            leftWing.bezierCurves.push(new BezierCurve_1.BezierCurve(new Point_1.Point(290, 400), new Point_1.Point(300, 315), new Point_1.Point(327, 320)));
            mediumWing.bezierCurves.push(new BezierCurve_1.BezierCurve(new Point_1.Point(344, 250), new Point_1.Point(355, 240), new Point_1.Point(366, 250)));
            mediumWing.bezierCurves.push(new BezierCurve_1.BezierCurve(new Point_1.Point(366, 250), new Point_1.Point(361, 333), new Point_1.Point(355, 400)));
            rightWing.bezierCurves.push(new BezierCurve_1.BezierCurve(new Point_1.Point(391, 248), new Point_1.Point(465, 280), new Point_1.Point(420, 400)));
            rightWing.bezierCurves.push(new BezierCurve_1.BezierCurve(new Point_1.Point(420, 400), new Point_1.Point(410, 315), new Point_1.Point(381, 320)));
            wings.push(leftWing);
            wings.push(mediumWing);
            wings.push(rightWing);
            return wings;
        };
        RocketBuilder.prototype.buildFuelTank = function () {
            var fuelTank = [];
            var body = new ComplexItem([], [], [], "gray");
            body.lines.push(new Line_1.Line(320, 273, 388, 273));
            body.lines.push(new Line_1.Line(388, 273, 378, 345));
            body.lines.push(new Line_1.Line(378, 345, 330, 345));
            body.lines.push(new Line_1.Line(330, 345, 320, 273));
            body.bezierCurves.push(new BezierCurve_1.BezierCurve(new Point_1.Point(320, 273), new Point_1.Point(353, 263), new Point_1.Point(388, 273)));
            fuelTank.push(body);
            return fuelTank;
        };
        RocketBuilder.prototype.buildOxidizerTank = function () {
            var oxidizerTank = [];
            var body = new ComplexItem([], [], [], "orange");
            body.lines.push(new Line_1.Line(320, 273, 315, 236));
            body.lines.push(new Line_1.Line(315, 236, 394, 236));
            body.lines.push(new Line_1.Line(394, 236, 388, 273));
            oxidizerTank.push(body);
            return oxidizerTank;
        };
        RocketBuilder.prototype.buildSupplier = function () {
            var supplier = [];
            var body = new ComplexItem([], [], [], "red");
            var rivets = [];
            body.lines.push(new Line_1.Line(313, 218, 396, 218));
            body.lines.push(new Line_1.Line(396, 218, 394, 236));
            body.lines.push(new Line_1.Line(394, 236, 315, 236));
            body.lines.push(new Line_1.Line(315, 236, 313, 218));
            rivets.push(new ComplexItem([], [], [new Ellipse_1.Ellipse(319, 223, 3, 3, 0)], "white"));
            rivets.push(new ComplexItem([], [], [new Ellipse_1.Ellipse(328, 223, 3, 3, 0)], "white"));
            rivets.push(new ComplexItem([], [], [new Ellipse_1.Ellipse(337, 223, 3, 3, 0)], "white"));
            rivets.push(new ComplexItem([], [], [new Ellipse_1.Ellipse(346, 223, 3, 3, 0)], "white"));
            rivets.push(new ComplexItem([], [], [new Ellipse_1.Ellipse(355, 223, 3, 3, 0)], "white"));
            rivets.push(new ComplexItem([], [], [new Ellipse_1.Ellipse(364, 223, 3, 3, 0)], "white"));
            rivets.push(new ComplexItem([], [], [new Ellipse_1.Ellipse(373, 223, 3, 3, 0)], "white"));
            rivets.push(new ComplexItem([], [], [new Ellipse_1.Ellipse(382, 223, 3, 3, 0)], "white"));
            rivets.push(new ComplexItem([], [], [new Ellipse_1.Ellipse(390, 223, 3, 3, 0)], "white"));
            supplier.push(body);
            rivets.forEach(function (rivet) { return supplier.push(rivet); });
            return supplier;
        };
        RocketBuilder.prototype.buildSpaceShip = function () {
            var spaceShip = [];
            var body = new ComplexItem([], [], [], "#ffd301");
            var upperWindowWafer = new ComplexItem([], [], [], "red");
            var upperWindowHole = new ComplexItem([], [], [], "#87ceeb");
            var lowerWindowWafer = new ComplexItem([], [], [], "red");
            var lowerWindowHole = new ComplexItem([], [], [], "#87ceeb");
            body.bezierCurves.push(new BezierCurve_1.BezierCurve(new Point_1.Point(313, 102), new Point_1.Point(350, 77), new Point_1.Point(396, 102)));
            body.lines.push(new Line_1.Line(396, 102, 396, 218));
            body.lines.push(new Line_1.Line(396, 218, 313, 218));
            body.lines.push(new Line_1.Line(313, 218, 313, 102));
            upperWindowWafer.ellipses.push(new Ellipse_1.Ellipse(355, 137, 30, 30, 0));
            upperWindowHole.ellipses.push(new Ellipse_1.Ellipse(355, 137, 20, 20, 0));
            lowerWindowWafer.ellipses.push(new Ellipse_1.Ellipse(355, 193, 12, 12, 0));
            lowerWindowHole.ellipses.push(new Ellipse_1.Ellipse(355, 193, 8, 8, 0));
            spaceShip.push(body);
            spaceShip.push(upperWindowWafer);
            spaceShip.push(upperWindowHole);
            spaceShip.push(lowerWindowWafer);
            spaceShip.push(lowerWindowHole);
            return spaceShip;
        };
        RocketBuilder.prototype.buildInstrumentCompartment = function () {
            var instrumentCompartment = [];
            var head = new ComplexItem([], [], [], "orange");
            var rivets = [];
            var tail = new ComplexItem([], [], [], "red");
            head.bezierCurves.push(new BezierCurve_1.BezierCurve(new Point_1.Point(327, 52), new Point_1.Point(350, 0), new Point_1.Point(383, 52)));
            tail.bezierCurves.push(new BezierCurve_1.BezierCurve(new Point_1.Point(327, 52), new Point_1.Point(350, 35), new Point_1.Point(383, 52)));
            tail.lines.push(new Line_1.Line(327, 52, 313, 102));
            tail.lines.push(new Line_1.Line(313, 102, 396, 102));
            tail.lines.push(new Line_1.Line(396, 102, 383, 52));
            tail.lines.push(new Line_1.Line(383, 52, 327, 52));
            rivets.push(new ComplexItem([], [], [new Ellipse_1.Ellipse(322, 89, 3, 3, 0)], "white"));
            rivets.push(new ComplexItem([], [], [new Ellipse_1.Ellipse(332, 87, 3, 3, 0)], "white"));
            rivets.push(new ComplexItem([], [], [new Ellipse_1.Ellipse(342, 85, 3, 3, 0)], "white"));
            // The highest rivet
            rivets.push(new ComplexItem([], [], [new Ellipse_1.Ellipse(352, 83, 3, 3, 0)], "white"));
            // The highest rivet
            rivets.push(new ComplexItem([], [], [new Ellipse_1.Ellipse(364, 85, 3, 3, 0)], "white"));
            rivets.push(new ComplexItem([], [], [new Ellipse_1.Ellipse(374, 87, 3, 3, 0)], "white"));
            rivets.push(new ComplexItem([], [], [new Ellipse_1.Ellipse(384, 89, 3, 3, 0)], "white"));
            instrumentCompartment.push(head);
            instrumentCompartment.push(tail);
            rivets.forEach(function (rivet) { return instrumentCompartment.push(rivet); });
            return instrumentCompartment;
        };
        RocketBuilder.prototype.build = function () {
            var rocket = new VectorRocket_1.VectorRocket();
            rocket.frame = new Frame_1.Frame(287, 37, 155, 368);
            return rocket;
        };
        return RocketBuilder;
    }());
    exports.RocketBuilder = RocketBuilder;
});
