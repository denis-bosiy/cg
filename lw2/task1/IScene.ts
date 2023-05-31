import { IImageContainer } from "./IImageContainer";

export interface IScene {
    addImage(image: IImageContainer): void;
    draw(context: CanvasRenderingContext2D): void;
    clear(context: CanvasRenderingContext2D): void;
}