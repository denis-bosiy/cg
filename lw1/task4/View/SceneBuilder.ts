import { Ellipse } from "./Ellipse";
import { Frame } from "./Frame";
import { Hangman } from "./Hangman";
import { Letter } from "./Letter";
import { Line } from "./Line";
import { Scaffold } from "./Scaffold";
import { Scene } from "./Scene";

export class SceneBuilder {
    private _hangman: Hangman;
    private _scaffold: Scaffold;
    private _hiddenWordOmissions: Line[];
    private _hiddenWordGuessedLetters: Letter[];
    private _alphabet: Letter[];

    constructor() {}

    private buildHangman(): void {
        const head: Ellipse = new Ellipse(120, 200, 30, 30, 0, "black");
        const body: Ellipse = new Ellipse(120, 280, 20, 50, 0, "black");
        const hands: Line[] = [new Line(110, 250, 90, 310, 5, "black"), new Line(130, 250, 150, 310, 5, "black")];
        const legs: Line[] = [new Line(120, 320, 110, 380, 5, "black"), new Line(120, 320, 130, 380, 5, "black")];

        this._hangman = new Hangman(head, body, hands, legs);
    }

    private buildScaffold(): void {
        const bars: Line[] = [new Line(50, 100, 50, 500, 15, "brown"), new Line(50, 100, 120, 100, 15, "brown")];
        const rope: Line = new Line(120, 100, 120, 170, 4, "brown");

        this._scaffold = new Scaffold(bars, rope);
    }

    private buildHiddenWordOmissions(hiddenWord: string): void {
        this._hiddenWordOmissions = [];

        let x0 = 400;
        for(let x = x0; x < x0 + hiddenWord.length * 60; x += 60) {
            this._hiddenWordOmissions.push(new Line(x, 300, x + 50, 300, 15, "blue"));
        }
    }

    private buildHiddenWordGuessedLetters(hiddenWord: string): void {
        this._hiddenWordGuessedLetters = [];

        let x0 = 400;
        for(let x = x0, i = 0; i < hiddenWord.length; x += 60, i++) {
            this._hiddenWordGuessedLetters.push(new Letter(new Frame(x + 5, 270, 50, 30), x + 5, 270, hiddenWord[i], "green", 70));
        }
    }

    private buildAlphabet(): void {
        this._alphabet = [];
        
        const russianAlphabet: string[] = "а,б,в,г,д,е,ё,ж,з,и,й,к,л,м,н,о,п,р,с,т,у,ф,х,ц,ч,ш,щ,ъ,ы,ь,э,ю,я".split(",");
        let x = 50;
        let y = 30;
        for(let i = 0; i < russianAlphabet.length; i++) {
            this._alphabet.push(new Letter(new Frame(x, y-10, 10, 10), x, y, russianAlphabet[i], "green"));
            x += 20;
        }
    }

    public build(hiddenWord: string): Scene {
        this.buildHangman();
        this.buildScaffold();
        this.buildHiddenWordOmissions(hiddenWord);
        this.buildHiddenWordGuessedLetters(hiddenWord);
        this.buildAlphabet();

        return new Scene(this._hangman, this._scaffold, this._hiddenWordOmissions, this._hiddenWordGuessedLetters, this._alphabet);
    }
}