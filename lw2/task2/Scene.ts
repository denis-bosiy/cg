import { Ellipse } from "./Ellipse";
import { IImageContainer } from "./IImageContainer";
import { IPaintableScene } from "./IPaintableScene";

export class Scene implements IPaintableScene {
    private _images: IImageContainer[];
    private _ellipses: Ellipse[];
    private _penColor: string;

    constructor() {
        this._images = [];
        this._ellipses = [];
    }

    public addImage(image: IImageContainer): void {
        this._images.push(image);
    }

    public draw(context: CanvasRenderingContext2D): void {
        this._images.forEach((image: IImageContainer): void => image.draw(context));
        this._ellipses.forEach((ellipse: Ellipse) => ellipse.draw(context));
    }

    public clear(context: CanvasRenderingContext2D): void {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    }

    public makePaintable(context: CanvasRenderingContext2D, penColor: string): void {
        this._penColor = penColor;

        let isDragging: boolean = false;
        document.addEventListener("mousedown", (event: MouseEvent) => {
            const canvasEventX: number = event.clientX - context.canvas.getBoundingClientRect().left;
            const canvasEventY: number = event.clientY - context.canvas.getBoundingClientRect().top;
    
            const isMouseAtCanvas: boolean = canvasEventX <= context.canvas.width && canvasEventY <= context.canvas.height;
            if (isMouseAtCanvas) {
                isDragging = true;
                const newEllipse: Ellipse = new Ellipse(canvasEventX, canvasEventY, 10, 10, 0, this._penColor);
                this._ellipses.push(newEllipse);
                newEllipse.draw(context);
            }
        });
        document.addEventListener("mousemove", (event: MouseEvent) => {
            const canvasEventX: number = event.clientX - context.canvas.getBoundingClientRect().left;
            const canvasEventY: number = event.clientY - context.canvas.getBoundingClientRect().top;
    
            const isMouseAtCanvas: boolean = canvasEventX <= context.canvas.width && canvasEventY <= context.canvas.height;
            if (isMouseAtCanvas && isDragging) {
                const DEFAULT_ELLIPSE_RADIUS: number = 10;
                const newEllipse: Ellipse = new Ellipse(canvasEventX, canvasEventY, DEFAULT_ELLIPSE_RADIUS, DEFAULT_ELLIPSE_RADIUS, 0, this._penColor);
                this._ellipses.push(newEllipse);
                newEllipse.draw(context);
            }
        });
        document.addEventListener("mouseup", (event: MouseEvent) => {
            const canvasEventX: number = event.clientX - context.canvas.getBoundingClientRect().left;
            const canvasEventY: number = event.clientY - context.canvas.getBoundingClientRect().top;
    
            const isMouseAtCanvas: boolean = canvasEventX <= context.canvas.width && canvasEventY <= context.canvas.height;
            if (isMouseAtCanvas) {
                isDragging = false;
            }
        });
    }

    public setPenColor(color: string): void {
        this._penColor = color;
    }
}