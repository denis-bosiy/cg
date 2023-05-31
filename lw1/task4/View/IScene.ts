import { IDrawable } from "./IDrawable";
import { Model } from "../Model/Model";
import { Letter } from "./Letter";

export interface IScene extends IDrawable {
    setState(state: Model): void;
    clear(context: CanvasRenderingContext2D): void;
    getAlphabet(): Letter[];
}