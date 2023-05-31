import { CPoint } from "./CPoint";

const toRadians = (angleInDegrees: number) => {
    return angleInDegrees * (Math.PI / 180);
}

const drawCoordinateAxes = (margin: number, ctx: CanvasRenderingContext2D) => {
    const AXE_LINE_LENGTH: number = 300;
    const AXE_ARROW_LENGTH: number = AXE_LINE_LENGTH / 20;
    const AXE_DIVISION_LENGTH: number = 10
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
    for (let i = AXE_DIVISION_LENGTH; i < AXE_LINE_LENGTH - Math.round(Math.sin(toRadians(60)) * AXE_ARROW_LENGTH); i += AXE_DIVISION_LENGTH) {
        ctx.moveTo(margin - Math.round(AXE_DIVISION_LENGTH / 2), margin + AXE_LINE_LENGTH - i);
        ctx.lineTo(margin + Math.round(AXE_DIVISION_LENGTH / 2), margin + AXE_LINE_LENGTH - i);
    }
    // Построение делений оси X
    for (let i = AXE_DIVISION_LENGTH + Math.round(Math.sin(toRadians(60)) * AXE_ARROW_LENGTH); i < AXE_LINE_LENGTH; i += AXE_DIVISION_LENGTH) {
        ctx.moveTo(margin + AXE_LINE_LENGTH - i, margin + AXE_LINE_LENGTH - Math.round(AXE_DIVISION_LENGTH / 2));
        ctx.lineTo(margin + AXE_LINE_LENGTH - i, margin + AXE_LINE_LENGTH + Math.round(AXE_DIVISION_LENGTH / 2));
    }

    ctx.closePath();
    ctx.stroke();
}

const drawBezierCurve = (referencePoints: CPoint[], ctx: CanvasRenderingContext2D) => {
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
    const startX: number = referencePoints[0].x;
    const startY: number = referencePoints[0].y;
    ctx.moveTo(startX, startY);
    for (let t = 0.01; t <= 1.01; t += 0.01) {
        const x: number = Math.pow((1 - t), 3) * referencePoints[0].x + 3 * Math.pow((1 - t), 2) * t * referencePoints[1].x + 3 * (1 - t) * Math.pow(t, 2) * referencePoints[2].x + Math.pow(t, 3) * referencePoints[3].x;
        const y: number = Math.pow((1 - t), 3) * referencePoints[0].y + 3 * Math.pow((1 - t), 2) * t * referencePoints[1].y + 3 * (1 - t) * Math.pow(t, 2) * referencePoints[2].y + Math.pow(t, 3) * referencePoints[3].y;

        ctx.lineTo(x, y);
        ctx.stroke();
    }
    ctx.closePath();
}

const hightlightReferencePointsWithDottedLines = (referencePoints: CPoint[], ctx: CanvasRenderingContext2D): void => {
    if (referencePoints.length === 0) {
        return;
    }
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    ctx.setLineDash([5]);
    ctx.beginPath();

    ctx.moveTo(referencePoints[0].x, referencePoints[0].y);
    for (let i = 1; i < referencePoints.length; i++) {
        ctx.lineTo(referencePoints[i].x, referencePoints[i].y);
    }

    ctx.closePath();
    ctx.stroke();
}

const highlightReferencePoints = (referencePoints: CPoint[], ctx: CanvasRenderingContext2D): void => {
    referencePoints.forEach((point: CPoint) => {
        point.draw(ctx);
    });

    hightlightReferencePointsWithDottedLines(referencePoints, ctx);
}

const makePointsDraggable = (referencePoints: CPoint[], ctx: CanvasRenderingContext2D, drawScene: () => void): void => {
    const HITBOX_PX: number = 10;
    const lastEventsPosition: {x: number; y: number} = {x: 0, y: 0};
    let draggingPointsIndex: number = -1;

    document.addEventListener("mousedown", (event: MouseEvent) => {
        const canvasEventX: number = event.clientX - ctx.canvas.getBoundingClientRect().left;
        const canvasEventY: number = event.clientY - ctx.canvas.getBoundingClientRect().top;
        if (canvasEventX > ctx.canvas.width || canvasEventY > ctx.canvas.height) {
            return;
        }
        const hasHorizontalMatch: (point: CPoint) => boolean = (point: CPoint) => canvasEventX >= point.x - Math.round(point.radius / 2) - HITBOX_PX && canvasEventX <= point.x + Math.round(point.radius / 2) + HITBOX_PX;
        const hasVerticalMatch: (point: CPoint) => boolean = (point: CPoint) => canvasEventY >= point.y - Math.round(point.radius / 2) - HITBOX_PX && canvasEventY <= point.y + Math.round(point.radius / 2) + HITBOX_PX;
        const mousedownedReferencePointsIndex: number = referencePoints.findIndex((point: CPoint) => hasHorizontalMatch(point) && hasVerticalMatch(point));

        if (mousedownedReferencePointsIndex !== -1) {
            lastEventsPosition.x = canvasEventX;
            lastEventsPosition.y = canvasEventY;
            draggingPointsIndex = mousedownedReferencePointsIndex;
        }
    });
    document.addEventListener("mousemove", (event: MouseEvent) => {
        const canvasEventX: number = event.clientX - ctx.canvas.getBoundingClientRect().left;
        const canvasEventY: number = event.clientY - ctx.canvas.getBoundingClientRect().top;

        if (canvasEventX <= ctx.canvas.width && canvasEventY <= ctx.canvas.height && draggingPointsIndex !== -1) {
            referencePoints[draggingPointsIndex].x = referencePoints[draggingPointsIndex].x + canvasEventX - lastEventsPosition.x;
            referencePoints[draggingPointsIndex].y = referencePoints[draggingPointsIndex].y + canvasEventY - lastEventsPosition.y;
            lastEventsPosition.y = canvasEventY;
            lastEventsPosition.x = canvasEventX;

            drawScene();
        }
    });
    document.addEventListener("mouseup", (event: MouseEvent) => {
        if (draggingPointsIndex !== -1) {
            draggingPointsIndex = -1;
        }
    });
}

const clearCanvas = (ctx: CanvasRenderingContext2D): void => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

export const main = (): void => {
    const canvas: HTMLCanvasElement | null = document.getElementById("canvas") as HTMLCanvasElement;
    const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");
    if (!ctx) {
        return;
    }

    const referencePoints: CPoint[] = [new CPoint(50, 300, 3), new CPoint(30, 50, 3), new CPoint(150, 10, 3), new CPoint(270, 300, 3)];
    const coordinateAxesMargin: number = 10;

    const drawScene = () => {
        clearCanvas(ctx);
        drawCoordinateAxes(coordinateAxesMargin, ctx);
        drawBezierCurve(referencePoints, ctx);
        highlightReferencePoints(referencePoints, ctx);
    }

    drawScene();
    makePointsDraggable(referencePoints, ctx, drawScene);
}