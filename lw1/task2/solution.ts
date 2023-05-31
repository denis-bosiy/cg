import { RocketBuilder } from "./RocketBuilder"
import { VectorRocket } from "./VectorRocket";

export const main = (): void => {
    const builder: RocketBuilder = new RocketBuilder();
    const rocket: VectorRocket = builder.build();
    rocket.instrumentCompartment = builder.buildInstrumentCompartment();
    rocket.spaceShip = builder.buildSpaceShip();
    rocket.supplier = builder.buildSupplier();
    rocket.oxidizerTank = builder.buildOxidizerTank();
    rocket.fuelTank = builder.buildFuelTank();
    rocket.wings = builder.buildWings();

    const canvas: HTMLCanvasElement | null = document.getElementById("canvas") as HTMLCanvasElement;
    if (!canvas) {
        return;
    }
    const context: CanvasRenderingContext2D | null = canvas.getContext("2d");
    if (!context) {
        return;
    }
    context.fillText("Press Space to launch the rocket", 30, 30);
    rocket.draw(context);

    let totalDelta: {x: number, y: number} = {x: 0, y: 0};
    let lastEventPosition: {x: number, y: number} = {x: 0, y: 0};
    let isDragging: boolean = false;
    let hasLaunched: boolean = false;
    document.addEventListener("mousedown", (event: MouseEvent) => {
        const canvasEventX: number = event.clientX - canvas.getBoundingClientRect().left;
        const canvasEventY: number = event.clientY - canvas.getBoundingClientRect().top;

        if (canvasEventX <= canvas.width && canvasEventY <= canvas.height && !hasLaunched) {
            if (canvasEventX >= rocket.frame.x && canvasEventX <= rocket.frame.x + rocket.frame.width) {
                if (canvasEventY >= rocket.frame.y && canvasEventY <= rocket.frame.y + rocket.frame.height) {
                    isDragging = true;
                    lastEventPosition = {x: canvasEventX, y : canvasEventY};
                }
            }
        }
    });
    document.addEventListener("mousemove", (event: MouseEvent) => {
        const canvasEventX: number = event.clientX - canvas.getBoundingClientRect().left;
        const canvasEventY: number = event.clientY - canvas.getBoundingClientRect().top;

        if (canvasEventX <= canvas.width && canvasEventY <= canvas.height && isDragging && !hasLaunched) {
            totalDelta = {x: totalDelta.x + canvasEventX - lastEventPosition.x, y: totalDelta.y + canvasEventY - lastEventPosition.y};
            rocket.changePosition(canvasEventX - lastEventPosition.x, canvasEventY - lastEventPosition.y);
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.fillStyle = "black";
            context.fillText("Press Space to launch the rocket", 30, 30);
            rocket.draw(context);
            lastEventPosition = {x: canvasEventX, y: canvasEventY};
        }
    });
    document.addEventListener("mouseup", (event: MouseEvent) => {
        const canvasEventX: number = event.clientX - canvas.getBoundingClientRect().left;
        const canvasEventY: number = event.clientY - canvas.getBoundingClientRect().top;

        if (canvasEventX <= canvas.width && canvasEventY <= canvas.height && isDragging) {
            if (canvasEventX >= rocket.frame.x && canvasEventX <= rocket.frame.x + rocket.frame.width) {
                if (canvasEventY >= rocket.frame.y && canvasEventY <= rocket.frame.y + rocket.frame.height) {
                    isDragging = false;
                }
            }
        }
    });
    document.addEventListener("keyup", (event: KeyboardEvent) => {
        if (event.code === "Space") {
            const DELTA: number = 1000/24;
            const ACCELERATION: number = 0.1;
            let t: number = 0;
            hasLaunched = true;
            rocket.jetStream = builder.buildJetStream(totalDelta.x, totalDelta.y);
    
            setInterval(() => {
                const deltaY = ACCELERATION * (t * t / 1000000) / 2;
                rocket.changePosition(0, -deltaY);
                context.clearRect(0, 0, canvas.width, canvas.height);
                rocket.draw(context);
                t += DELTA;
            }, DELTA)
        }
    });
}