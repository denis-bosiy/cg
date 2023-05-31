export class ScaffoldState {
    public bars: boolean[];
    public rope: boolean;

    constructor() {
        this.bars = [false, false];
        this.rope = false;
    }
}