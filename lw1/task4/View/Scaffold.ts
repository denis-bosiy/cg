import { IDrawable } from "./IDrawable";
import { Line } from "./Line";

export class Scaffold implements IDrawable {
    bars: Line[];
    rope: Line;

    constructor(bars: Line[], rope: Line) {
        this.bars = bars;
        this.rope = rope;
    }

    public draw(context: CanvasRenderingContext2D): void {
        this.bars.forEach((bar: Line) => bar.draw(context));
        this.rope.draw(context);
    }
}