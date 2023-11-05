define(["require", "exports", "./RocketBuilder"], function (require, exports, RocketBuilder_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.main = void 0;
    var main = function () {
        var builder = new RocketBuilder_1.RocketBuilder();
        var rocket = builder.build();
        rocket.instrumentCompartment = builder.buildInstrumentCompartment();
        rocket.spaceShip = builder.buildSpaceShip();
        rocket.supplier = builder.buildSupplier();
        rocket.oxidizerTank = builder.buildOxidizerTank();
        rocket.fuelTank = builder.buildFuelTank();
        rocket.wings = builder.buildWings();
        var canvas = document.getElementById("canvas");
        if (!canvas) {
            return;
        }
        var context = canvas.getContext("2d");
        if (!context) {
            return;
        }
        context.fillText("Press Space to launch the rocket", 30, 30);
        rocket.draw(context);
        var totalDelta = { x: 0, y: 0 };
        var lastEventPosition = { x: 0, y: 0 };
        var isDragging = false;
        var hasLaunched = false;
        document.addEventListener("mousedown", function (event) {
            var canvasEventX = event.clientX - canvas.getBoundingClientRect().left;
            var canvasEventY = event.clientY - canvas.getBoundingClientRect().top;
            if (canvasEventX <= canvas.width && canvasEventY <= canvas.height && !hasLaunched) {
                if (canvasEventX >= rocket.frame.x && canvasEventX <= rocket.frame.x + rocket.frame.width) {
                    if (canvasEventY >= rocket.frame.y && canvasEventY <= rocket.frame.y + rocket.frame.height) {
                        isDragging = true;
                        lastEventPosition = { x: canvasEventX, y: canvasEventY };
                    }
                }
            }
        });
        document.addEventListener("mousemove", function (event) {
            var canvasEventX = event.clientX - canvas.getBoundingClientRect().left;
            var canvasEventY = event.clientY - canvas.getBoundingClientRect().top;
            if (canvasEventX <= canvas.width && canvasEventY <= canvas.height && isDragging && !hasLaunched) {
                totalDelta = { x: totalDelta.x + canvasEventX - lastEventPosition.x, y: totalDelta.y + canvasEventY - lastEventPosition.y };
                rocket.changePosition(canvasEventX - lastEventPosition.x, canvasEventY - lastEventPosition.y);
                context.clearRect(0, 0, canvas.width, canvas.height);
                context.fillStyle = "black";
                context.fillText("Press Space to launch the rocket", 30, 30);
                rocket.draw(context);
                lastEventPosition = { x: canvasEventX, y: canvasEventY };
            }
        });
        document.addEventListener("mouseup", function (event) {
            var canvasEventX = event.clientX - canvas.getBoundingClientRect().left;
            var canvasEventY = event.clientY - canvas.getBoundingClientRect().top;
            if (canvasEventX <= canvas.width && canvasEventY <= canvas.height && isDragging) {
                if (canvasEventX >= rocket.frame.x && canvasEventX <= rocket.frame.x + rocket.frame.width) {
                    if (canvasEventY >= rocket.frame.y && canvasEventY <= rocket.frame.y + rocket.frame.height) {
                        isDragging = false;
                    }
                }
            }
        });
        document.addEventListener("keyup", function (event) {
            if (event.code === "Space") {
                var DELTA_1 = 1000 / 24;
                var ACCELERATION_1 = 0.1;
                var t_1 = 0;
                hasLaunched = true;
                rocket.jetStream = builder.buildJetStream(totalDelta.x, totalDelta.y);
                setInterval(function () {
                    var deltaY = ACCELERATION_1 * (t_1 * t_1 / 1000000) / 2;
                    rocket.changePosition(0, -deltaY);
                    context.clearRect(0, 0, canvas.width, canvas.height);
                    rocket.draw(context);
                    t_1 += DELTA_1;
                }, DELTA_1);
            }
        });
    };
    exports.main = main;
});
