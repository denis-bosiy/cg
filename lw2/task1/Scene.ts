import { IImageContainer } from "./IImageContainer";
import { IScene } from "./IScene";

export class Scene implements IScene {
    private _images: IImageContainer[];

    constructor() {
        this._images = [];
    }

    public addImage(image: IImageContainer): void {
        this._images.push(image);
    }

    public draw(context: CanvasRenderingContext2D): void {
        this._images.forEach((image: IImageContainer): void => image.draw(context));
    }

    public clear(context: CanvasRenderingContext2D): void {
        const TEST_RECT_SIZE: number = 20;

        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        // Draw rect to show png's transparency
        context.rect(0, 0, TEST_RECT_SIZE, TEST_RECT_SIZE);
        context.fill();
    }
}