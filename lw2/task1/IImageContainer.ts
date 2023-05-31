import { IScene } from "./IScene";

export interface IImageContainer {
    draw(context: CanvasRenderingContext2D): void;
    setPositionX(x: number): void;
    setPositionY(y: number): void;
    makeDraggable(ctx: CanvasRenderingContext2D, scene: IScene): void;
}