const drawPixel = (context: CanvasRenderingContext2D, x: number, y: number) => {
    if (x < 0 || x >= context.canvas.width || y < 0 || y >= context.canvas.height) {
        return;
    }

    context.fillRect(x, y, 1, 1);
};

const fillCircle = (context: CanvasRenderingContext2D, x0: number, y0: number, radius: number, color: string) => {
    context.fillStyle = color;

    for (let x = x0 - radius; x <= x0 + radius; x++) {
        for (let y = y0 - radius; y <= y0 + radius; y++) {
            if ((x - x0) * (x - x0) + (y - y0) * (y - y0) <= radius * radius) {
                drawPixel(context, x, y);
            }
        }
    }

    context.fill();
}

const outlineCircle = (context: CanvasRenderingContext2D, x0: number, y0: number, radius: number, color: string) => {
    context.fillStyle = color;

    // Bresenham's circle algorithm
    let x: number = 0;
    let y: number = radius;
    let delta: number = 1 - 2 * radius;
    let error: number = 0;
    while (y >= 0) {
        drawPixel(context, x0 + x, y0 + y);
        drawPixel(context, x0 + x, y0 - y);
        drawPixel(context, x0 - x, y0 + y);
        drawPixel(context, x0 - x, y0 - y);
        error = 2 * (delta + y) - 1;
        if (delta < 0 && error <= 0) {
            ++x;
            delta += 2 * x + 1;
            continue;
        }
        error = 2 * (delta - x) - 1;
        if (delta > 0 && error > 0) {
            --y;
            delta += 1 - 2 * y;
            continue;
        }
        ++x;
        delta += 2 * (x - y);
        --y;
    }

    context.fill();
}

const drawCircle = (context: CanvasRenderingContext2D, x0: number, y0: number, radius: number, strokeStyle: string = "black", fillStyle?: string) => {
    outlineCircle(context, x0, y0, radius, strokeStyle);
    if (fillStyle) {
        fillCircle(context, x0, y0, radius, fillStyle);
    }
}

export const main = (): void => {
    const canvas: HTMLCanvasElement | null = document.getElementById("canvas") as HTMLCanvasElement;
    if (!canvas) {
        return;
    }
    const context: CanvasRenderingContext2D | null = canvas.getContext("2d");
    if (!context) {
        return;
    }

    drawCircle(context, 300, 300, 100, "red", "blue");
    drawCircle(context, 20, 20, 30, "green");
};