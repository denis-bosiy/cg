define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.main = void 0;
    var drawPixel = function (context, x, y) {
        if (x < 0 || x >= context.canvas.width || y < 0 || y >= context.canvas.height) {
            return;
        }
        context.fillRect(x, y, 1, 1);
    };
    var fillCircle = function (context, x0, y0, radius, color) {
        context.fillStyle = color;
        for (var x = x0 - radius; x <= x0 + radius; x++) {
            for (var y = y0 - radius; y <= y0 + radius; y++) {
                if ((x - x0) * (x - x0) + (y - y0) * (y - y0) <= radius * radius) {
                    drawPixel(context, x, y);
                }
            }
        }
        context.fill();
    };
    var outlineCircle = function (context, x0, y0, radius, color) {
        context.fillStyle = color;
        // Bresenham's circle algorithm
        var x = 0;
        var y = radius;
        var delta = 1 - 2 * radius;
        var error = 0;
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
    };
    var drawCircle = function (context, x0, y0, radius, strokeStyle, fillStyle) {
        if (strokeStyle === void 0) { strokeStyle = "black"; }
        outlineCircle(context, x0, y0, radius, strokeStyle);
        if (fillStyle) {
            fillCircle(context, x0, y0, radius, fillStyle);
        }
    };
    var main = function () {
        var canvas = document.getElementById("canvas");
        if (!canvas) {
            return;
        }
        var context = canvas.getContext("2d");
        if (!context) {
            return;
        }
        drawCircle(context, 300, 300, 100, "red", "blue");
        drawCircle(context, 20, 20, 30, "green");
    };
    exports.main = main;
});
