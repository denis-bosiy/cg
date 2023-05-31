import { IObservable } from "../IObservable";
import { IObserver } from "../IObserver";
import { StringUtil } from "../utils/StringUtil";
import { HangmanState } from "./HangmanState";
import { ModelMessage } from "./ModelMessage";
import { ModelMessageType } from "./ModelMessageType";
import { ScaffoldState } from "./ScaffoldState";

export class Model implements IObservable {
    public hangmanState: HangmanState;
    public scaffoldState: ScaffoldState;
    public hiddenWord: string;
    public hiddenWordGuessedLetters: boolean[];
    public usedLetters: string[];
    public unusedLetters: string[];

    private _observers: Set<IObserver>;

    constructor() {
        this.reset();
        this._observers = new Set<IObserver>();
    }

    public isManHanged(): boolean {
        const isHangmanDrawed: boolean = this.hangmanState.head && this.hangmanState.body && this.hangmanState.hands.filter((hand: boolean) => !hand).length === 0 && this.hangmanState.legs.filter((leg: boolean) => !leg).length === 0;
        const isScaffoldDrawed: boolean = this.scaffoldState.bars.filter((bar: boolean) => !bar) && this.scaffoldState.rope;

        return isHangmanDrawed && isScaffoldDrawed;
    }

    public isManRescued(): boolean {
        const isHangmanDrawed: boolean = this.hangmanState.head && this.hangmanState.body && this.hangmanState.hands.filter((hand: boolean) => !hand).length === 0 && this.hangmanState.legs.filter((leg: boolean) => !leg).length === 0;
        const isScaffoldDrawed: boolean = this.scaffoldState.bars.filter((bar: boolean) => !bar) && this.scaffoldState.rope;
        const isHiddenWordGuessed: boolean = this.hiddenWordGuessedLetters.filter((letter: boolean) => !letter).length === 0;

        return isHiddenWordGuessed && !(isHangmanDrawed && isScaffoldDrawed);
    }

    public chooseLetter(letter: string): void {
        if (this.unusedLetters.includes(letter)) {
            const unusedLetterIndex: number = this.unusedLetters.indexOf(letter);
            this.unusedLetters.splice(unusedLetterIndex, 1);
            this.usedLetters.push(letter);

            const letterOccurencesInHiddenWord: number[] = StringUtil.findEachOccurencesOfSubstring(this.hiddenWord, letter);

            const previousHiddenWordGuessedLetters: boolean[] = this.hiddenWordGuessedLetters.map((letter: boolean) => letter);
            this.hiddenWordGuessedLetters = this.hiddenWordGuessedLetters.map((letter: boolean, index: number) => letter || letterOccurencesInHiddenWord.includes(index));

            let hasGuessedLetter: boolean = false;
            for(let i = 0; i < this.hiddenWordGuessedLetters.length; i++) {
                if (this.hiddenWordGuessedLetters[i] !== previousHiddenWordGuessedLetters[i]) {
                    hasGuessedLetter = true;
                }
            }

            if (!hasGuessedLetter) {
                this.unhideNextPart();
            }
            if (this.isManHanged()) {
                this.hiddenWordGuessedLetters = this.hiddenWordGuessedLetters.map(() => true);
            }

            let modelMessageType: ModelMessageType = ModelMessageType.Continuation;
            if (this.isManHanged()) {
                modelMessageType = ModelMessageType.Defeat;
            }
            if (this.isManRescued()) {
                modelMessageType = ModelMessageType.Victory;
            }
            this.notifyObservers(new ModelMessage(this, modelMessageType));
        }
    }

    public setHiddenWord(word: string): void {
        this.reset();
        this.hiddenWord = word;
        this.hiddenWordGuessedLetters = [];
        for(let i = 0; i < word.length; i++) {
            this.hiddenWordGuessedLetters.push(false);
        }

        let modelMessageType: ModelMessageType = ModelMessageType.Continuation;
        if (this.isManHanged()) {
            modelMessageType = ModelMessageType.Defeat;
        }
        if (this.isManRescued()) {
            modelMessageType = ModelMessageType.Victory;
        }
        this.notifyObservers(new ModelMessage(this, modelMessageType));
    }

    public addObserver(o: IObserver): void {
        this._observers.add(o);
    }

    public removeObserver(o: IObserver): void {
        this._observers.delete(o);
    }

    public notifyObservers(data: ModelMessage): void {
        this._observers?.forEach((o: IObserver) => o.update(data));
    }

    private unhideNextPart(): void {
        // TODO: unhide -> show
        if (!this.scaffoldState.bars[0]) {
            this.scaffoldState.bars[0] = true;
            return;
        }
        if (!this.scaffoldState.bars[1]) {
            this.scaffoldState.bars[1] = true;
            return;
        }
        if (!this.scaffoldState.rope) {
            this.scaffoldState.rope = true;
            return;
        }
        if (!this.hangmanState.head) {
            this.hangmanState.head = true;
            return;
        }
        if (!this.hangmanState.body) {
            this.hangmanState.body = true;
            return;
        }
        if (!this.hangmanState.hands[0]) {
            this.hangmanState.hands[0] = true;
            return;
        }
        if (!this.hangmanState.hands[1]) {
            this.hangmanState.hands[1] = true;
            return;
        }
        if (!this.hangmanState.legs[0]) {
            this.hangmanState.legs[0] = true;
            return;
        }
        if (!this.hangmanState.legs[1]) {
            this.hangmanState.legs[1] = true;
            return;
        }
    }

    private reset(): void {
        this.hangmanState = new HangmanState();
        this.scaffoldState = new ScaffoldState();
        this.hiddenWord = "";
        this.usedLetters = [];
        this.unusedLetters = "а,б,в,г,д,е,ё,ж,з,и,й,к,л,м,н,о,п,р,с,т,у,ф,х,ц,ч,ш,щ,ъ,ы,ь,э,ю,я".split(",");
    }
}