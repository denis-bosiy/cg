define(["require", "exports", "./CPoint"], function (require, exports, CPoint_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.main = void 0;
    var toRadians = function (angleInDegrees) {
        return angleInDegrees * (Math.PI / 180);
    };
    var drawCoordinateAxes = function (margin, ctx) {
        var AXE_LINE_LENGTH = 300;
        var AXE_ARROW_LENGTH = AXE_LINE_LENGTH / 20;
        var AXE_DIVISION_LENGTH = 10;
        ctx.strokeStyle = "red";
        ctx.lineWidth = 5;
        ctx.setLineDash([]);
        ctx.beginPath();
        // Построение прямых осей
        ctx.moveTo(margin, margin);
        ctx.lineTo(margin, margin + AXE_LINE_LENGTH);
        ctx.lineTo(margin + AXE_LINE_LENGTH, margin + AXE_LINE_LENGTH);
        ctx.lineWidth = 3;
        // Построение стрелок оси Y
        ctx.moveTo(margin - Math.round(Math.sin(toRadians(30)) * AXE_ARROW_LENGTH), margin + Math.round(Math.sin(toRadians(60)) * AXE_ARROW_LENGTH));
        ctx.lineTo(margin, margin);
        ctx.moveTo(margin + Math.round(Math.sin(toRadians(30)) * AXE_ARROW_LENGTH), margin + Math.round(Math.sin(toRadians(60)) * AXE_ARROW_LENGTH));
        ctx.lineTo(margin, margin);
        // Построение стрелок оси X
        ctx.moveTo(margin + AXE_LINE_LENGTH - Math.round(Math.sin(toRadians(60)) * AXE_ARROW_LENGTH), margin + AXE_LINE_LENGTH - Math.round(Math.sin(toRadians(30)) * AXE_ARROW_LENGTH));
        ctx.lineTo(margin + AXE_LINE_LENGTH, margin + AXE_LINE_LENGTH);
        ctx.moveTo(margin + AXE_LINE_LENGTH - Math.round(Math.sin(toRadians(60)) * AXE_ARROW_LENGTH), margin + AXE_LINE_LENGTH + Math.round(Math.sin(toRadians(30)) * AXE_ARROW_LENGTH));
        ctx.lineTo(margin + AXE_LINE_LENGTH, margin + AXE_LINE_LENGTH);
        ctx.lineWidth = 1;
        // Построение делений оси Y
        for (var i = AXE_DIVISION_LENGTH; i < AXE_LINE_LENGTH - Math.round(Math.sin(toRadians(60)) * AXE_ARROW_LENGTH); i += AXE_DIVISION_LENGTH) {
            ctx.moveTo(margin - Math.round(AXE_DIVISION_LENGTH / 2), margin + AXE_LINE_LENGTH - i);
            ctx.lineTo(margin + Math.round(AXE_DIVISION_LENGTH / 2), margin + AXE_LINE_LENGTH - i);
        }
        // Построение делений оси X
        for (var i = AXE_DIVISION_LENGTH + Math.round(Math.sin(toRadians(60)) * AXE_ARROW_LENGTH); i < AXE_LINE_LENGTH; i += AXE_DIVISION_LENGTH) {
            ctx.moveTo(margin + AXE_LINE_LENGTH - i, margin + AXE_LINE_LENGTH - Math.round(AXE_DIVISION_LENGTH / 2));
            ctx.lineTo(margin + AXE_LINE_LENGTH - i, margin + AXE_LINE_LENGTH + Math.round(AXE_DIVISION_LENGTH / 2));
        }
        ctx.closePath();
        ctx.stroke();
    };
    var drawBezierCurve = function (referencePoints, ctx) {
        // Формула кривой Безье для 4-х точек
        // P = (1−t)^3*P1 + 3*(1−t)^2*t*P2 +3*(1−t)*t^2*P3 + t^3*P4
        if (referencePoints.length !== 4) {
            return;
        }
        ctx.strokeStyle = "black";
        ctx.lineWidth = 3;
        ctx.setLineDash([]);
        ctx.beginPath();
        // x = (1-t)^3*x1 + 3*(1-t)^2*t*x2 +3*(1-t)*t^2*x3 + t^3*x4
        // y = (1-t)^3*y1 + 3*(1-t)^2*t*y2 +3*(1-t)*t^2*y3 + t^3*y4
        var startX = referencePoints[0].x;
        var startY = referencePoints[0].y;
        ctx.moveTo(startX, startY);
        for (var t = 0.01; t <= 1.01; t += 0.01) {
            var x = Math.pow((1 - t), 3) * referencePoints[0].x + 3 * Math.pow((1 - t), 2) * t * referencePoints[1].x + 3 * (1 - t) * Math.pow(t, 2) * referencePoints[2].x + Math.pow(t, 3) * referencePoints[3].x;
            var y = Math.pow((1 - t), 3) * referencePoints[0].y + 3 * Math.pow((1 - t), 2) * t * referencePoints[1].y + 3 * (1 - t) * Math.pow(t, 2) * referencePoints[2].y + Math.pow(t, 3) * referencePoints[3].y;
            ctx.lineTo(x, y);
            ctx.stroke();
        }
        ctx.closePath();
    };
    var hightlightReferencePointsWithDottedLines = function (referencePoints, ctx) {
        if (referencePoints.length === 0) {
            return;
        }
        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;
        ctx.setLineDash([5]);
        ctx.beginPath();
        ctx.moveTo(referencePoints[0].x, referencePoints[0].y);
        for (var i = 1; i < referencePoints.length; i++) {
            ctx.lineTo(referencePoints[i].x, referencePoints[i].y);
        }
        ctx.closePath();
        ctx.stroke();
    };
    var highlightReferencePoints = function (referencePoints, ctx) {
        referencePoints.forEach(function (point) {
            point.draw(ctx);
        });
        hightlightReferencePointsWithDottedLines(referencePoints, ctx);
    };
    var makePointsDraggable = function (referencePoints, ctx, drawScene) {
        var HITBOX_PX = 10;
        var lastEventsPosition = { x: 0, y: 0 };
        var draggingPointsIndex = -1;
        document.addEventListener("mousedown", function (event) {
            var canvasEventX = event.clientX - ctx.canvas.getBoundingClientRect().left;
            var canvasEventY = event.clientY - ctx.canvas.getBoundingClientRect().top;
            if (canvasEventX > ctx.canvas.width || canvasEventY > ctx.canvas.height) {
                return;
            }
            var hasHorizontalMatch = function (point) { return canvasEventX >= point.x - Math.round(point.radius / 2) - HITBOX_PX && canvasEventX <= point.x + Math.round(point.radius / 2) + HITBOX_PX; };
            var hasVerticalMatch = function (point) { return canvasEventY >= point.y - Math.round(point.radius / 2) - HITBOX_PX && canvasEventY <= point.y + Math.round(point.radius / 2) + HITBOX_PX; };
            var mousedownedReferencePointsIndex = referencePoints.findIndex(function (point) { return hasHorizontalMatch(point) && hasVerticalMatch(point); });
            if (mousedownedReferencePointsIndex !== -1) {
                lastEventsPosition.x = canvasEventX;
                lastEventsPosition.y = canvasEventY;
                draggingPointsIndex = mousedownedReferencePointsIndex;
            }
        });
        document.addEventListener("mousemove", function (event) {
            var canvasEventX = event.clientX - ctx.canvas.getBoundingClientRect().left;
            var canvasEventY = event.clientY - ctx.canvas.getBoundingClientRect().top;
            if (canvasEventX <= ctx.canvas.width && canvasEventY <= ctx.canvas.height && draggingPointsIndex !== -1) {
                referencePoints[draggingPointsIndex].x = referencePoints[draggingPointsIndex].x + canvasEventX - lastEventsPosition.x;
                referencePoints[draggingPointsIndex].y = referencePoints[draggingPointsIndex].y + canvasEventY - lastEventsPosition.y;
                lastEventsPosition.y = canvasEventY;
                lastEventsPosition.x = canvasEventX;
                drawScene();
            }
        });
        document.addEventListener("mouseup", function (event) {
            if (draggingPointsIndex !== -1) {
                draggingPointsIndex = -1;
            }
        });
    };
    var clearCanvas = function (ctx) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    };
    var main = function () {
        var canvas = document.getElementById("canvas");
        var ctx = canvas.getContext("2d");
        if (!ctx) {
            return;
        }
        var referencePoints = [new CPoint_1.CPoint(50, 300, 3), new CPoint_1.CPoint(30, 50, 3), new CPoint_1.CPoint(150, 10, 3), new CPoint_1.CPoint(270, 300, 3)];
        var coordinateAxesMargin = 10;
        var drawScene = function () {
            clearCanvas(ctx);
            drawCoordinateAxes(coordinateAxesMargin, ctx);
            drawBezierCurve(referencePoints, ctx);
            highlightReferencePoints(referencePoints, ctx);
        };
        drawScene();
        makePointsDraggable(referencePoints, ctx, drawScene);
    };
    exports.main = main;
});
