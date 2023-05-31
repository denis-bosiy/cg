import { IImageContainer } from "./IImageContainer";

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
}