export class HangmanState {
    public head: boolean;
    public body: boolean;
    public hands: boolean[];
    public legs: boolean[];

    constructor() {
        this.head = false;
        this.body = false;
        this.hands = [false, false];
        this.legs = [false, false];
    }
}