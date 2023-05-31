import { IImageContainer } from "./IImageContainer";
import { IScene } from "./IScene";

export class ImageContainer implements IImageContainer {
    private _image: HTMLImageElement;
    private _x: number;
    private _y: number;

    constructor(image: HTMLImageElement, x: number, y: number) {
        this._image = image;
        this._x = x;
        this._y = y;
    }

    public draw(context: CanvasRenderingContext2D): void {
        context.drawImage(this._image, this._x, this._y);
    }

    public setPositionX(x: number): void {
        this._x = x;
    }

    public setPositionY(y: number): void {
        this._y = y;
    }

    public makeDraggable(ctx: CanvasRenderingContext2D, scene: IScene): void {
        scene.clear(ctx);
        scene.draw(ctx);
    
        let lastEventPosition: { x: number, y: number } = { x: 0, y: 0 };
        let isDragging: boolean = false;
        // TODO: Добавлять обработку события mousedown на ctx.canvas
        document.addEventListener("mousedown", (event: MouseEvent) => {
            const canvasEventX: number = event.clientX - ctx.canvas.getBoundingClientRect().left;
            const canvasEventY: number = event.clientY - ctx.canvas.getBoundingClientRect().top;
    
            const isMouseAtCanvas: boolean = canvasEventX <= ctx.canvas.width && canvasEventY <= ctx.canvas.height;
            const isMouseAtImage: boolean = canvasEventX >= this._x && canvasEventX <= this._x + this._image.width && canvasEventY >= this._y && canvasEventY <= this._y + this._image.height;
            if (isMouseAtCanvas && isMouseAtImage) {
                isDragging = true;
                lastEventPosition = { x: canvasEventX, y: canvasEventY };
            }
        });
        document.addEventListener("mousemove", (event: MouseEvent) => {
            const canvasEventX: number = event.clientX - ctx.canvas.getBoundingClientRect().left;
            const canvasEventY: number = event.clientY - ctx.canvas.getBoundingClientRect().top;
    
            const isMouseAtCanvas: boolean = canvasEventX <= ctx.canvas.width && canvasEventY <= ctx.canvas.height;
            if (isMouseAtCanvas && isDragging) {
                scene.clear(ctx);
                this._x = this._x + canvasEventX - lastEventPosition.x;
                this._y = this._y + canvasEventY - lastEventPosition.y;
                scene.draw(ctx);
                lastEventPosition = { x: canvasEventX, y: canvasEventY };
            }
        });
        document.addEventListener("mouseup", (event: MouseEvent) => {
            const canvasEventX: number = event.clientX - ctx.canvas.getBoundingClientRect().left;
            const canvasEventY: number = event.clientY - ctx.canvas.getBoundingClientRect().top;
    
            const isMouseAtCanvas: boolean = canvasEventX <= ctx.canvas.width && canvasEventY <= ctx.canvas.height;
            const isMouseAtImage: boolean = canvasEventX >= this._x && canvasEventX <= this._x + this._image.width && canvasEventY >= this._y && canvasEventY <= this._y + this._image.height;
            if (isMouseAtCanvas && isMouseAtImage) {
                isDragging = false;
            }
        });
    }
}