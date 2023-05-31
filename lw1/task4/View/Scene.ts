import { Model } from "../Model/Model";
import { Hangman } from "./Hangman";
import { IScene } from "./IScene";
import { Letter } from "./Letter";
import { Line } from "./Line";
import { Scaffold } from "./Scaffold";

export class Scene implements IScene {
    private _hangman: Hangman;
    private _scaffold: Scaffold;
    private _hiddenWordOmissions: Line[];
    private _hiddenWordGuessedLetters: Letter[];
    private _alphabet: Letter[];

    private _state: Model;

    constructor(hangman: Hangman, scaffold: Scaffold, hiddenWordOmissions: Line[], hiddenWordGuessedLetters: Letter[], alphabet: Letter[]) {
        this._hangman = hangman;
        this._scaffold = scaffold;
        this._hiddenWordOmissions = hiddenWordOmissions;
        this._hiddenWordGuessedLetters = hiddenWordGuessedLetters;
        this._alphabet = alphabet;
    }

    public setState(state: Model): void {
        this._state = state;
    }

    public draw(context: CanvasRenderingContext2D): void {
        if (this._state.hangmanState.head) {
            this._hangman.head.draw(context);
        }
        if (this._state.hangmanState.body) {
            this._hangman.body.draw(context);
        }
        for(let i = 0; i < this._state.hangmanState.hands.length; i++) {
            if (this._state.hangmanState.hands[i]) {
                this._hangman.hands[i].draw(context);
            }
        }
        for(let i = 0; i < this._state.hangmanState.legs.length; i++) {
            if (this._state.hangmanState.legs[i]) {
                this._hangman.legs[i].draw(context);
            }
        }

        for(let i = 0; i < this._state.scaffoldState.bars.length; i++) {
            if (this._state.scaffoldState.bars[i]) {
                this._scaffold.bars[i].draw(context);
            }
        }
        if (this._state.scaffoldState.rope){
            this._scaffold.rope.draw(context);
        }

        this._hiddenWordOmissions.forEach((omission: Line) => omission.draw(context));
        for(let i = 0; i < this._state.hiddenWordGuessedLetters.length; i++) {
            if (this._state.isManHanged()) {
                this._hiddenWordGuessedLetters[i].color = "red";
            }
        }
        for(let i = 0; i < this._state.hiddenWordGuessedLetters.length; i++) {
            if (this._state.hiddenWordGuessedLetters[i]) {
                this._hiddenWordGuessedLetters[i].draw(context);
            }
        }
        this._alphabet.forEach((letter: Letter) => {
            if (this._state.usedLetters.includes(letter.value)) {
                letter.color = "red";
            }
        })
        this._alphabet.forEach((letter: Letter) => letter.draw(context));
    }

    public clear(context: CanvasRenderingContext2D): void {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    }

    public getAlphabet(): Letter[] {
        return this._alphabet;
    }
}