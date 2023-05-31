export interface IDrawable {
    changePosition(deltaX: number, deltaY: number): void;
    draw(context: CanvasRenderingContext2D): void;
}