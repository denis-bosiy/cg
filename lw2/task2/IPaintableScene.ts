import { IScene } from "./IScene";

export interface IPaintableScene extends IScene {
    makePaintable(context: CanvasRenderingContext2D, penColor: string): void;
    setPenColor(color: string): void;
}