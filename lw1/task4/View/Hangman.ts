import { Ellipse } from "./Ellipse";
import { IDrawable } from "./IDrawable";
import { Line } from "./Line";

export class Hangman implements IDrawable {
    head: Ellipse;
    body: Ellipse;
    hands: Line[];
    legs: Line[];

    constructor(head: Ellipse, body: Ellipse, hands: Line[], legs: Line[]) {
        this.head = head;
        this.body = body;
        this.hands = hands;
        this.legs = legs;
    }

    public draw(context: CanvasRenderingContext2D): void {
        this.head.draw(context);
        this.body.draw(context);
        this.hands.forEach((hand: Line) => hand.draw(context));
        this.legs.forEach((leg: Line) => leg.draw(context));
    }
}