export interface IImageContainer {
    draw(context: CanvasRenderingContext2D): void;
    setPositionX(x: number): void;
    setPositionY(y: number): void;
}