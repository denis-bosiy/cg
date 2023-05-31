import { Model } from "../Model/Model";

export class Controller {
    private _model: Model;

    constructor(model: Model) {
        this._model = model;
    } 

    public handleLetterClick(letter: string): void {
        this._model.chooseLetter(letter);
    }

    public setHiddenWord(word: string): void {
        this._model.setHiddenWord(word);
    }

    public getHiddenWord(words: string[]): string {
        return words[Math.floor(Math.random() * words.length)];
    }
}