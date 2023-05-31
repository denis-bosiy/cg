import { Controller } from "../Controller/Controller";
import { IObserver } from "../IObserver";
import { Model } from "../Model/Model";
import { ModelMessage } from "../Model/ModelMessage";
import { ModelMessageType } from "../Model/ModelMessageType";
import { IScene } from "./IScene";
import { Letter } from "./Letter";
import { SceneBuilder } from "./SceneBuilder";

export class View implements IObserver {
    private _controller: Controller;
    private _scene: IScene;
    private _context: CanvasRenderingContext2D;
    private _loadedWords: string[];

    constructor(model: Model) {
        this._controller = new Controller(model);
        const canvas: HTMLCanvasElement | null = document.getElementById("canvas") as HTMLCanvasElement;
        if (!canvas) {
            return;
        }
        const context: CanvasRenderingContext2D | null = canvas.getContext("2d");
        if (!context) {
            return;
        }
        this._context = context;
    }

    public addListeners(): void {
        const fileInput: HTMLInputElement | null = document.getElementById("random-words-file-input") as HTMLInputElement;
        fileInput.addEventListener("change", (e: Event) => {
            const fileList: FileList | null = (e.currentTarget as HTMLInputElement).files;
            if (!fileList) {
                return;
            }
            const file: Blob = fileList[0];
            const reader: FileReader = new FileReader();
            reader.readAsText(file, "UTF-8");
            reader.addEventListener("load", (evt: ProgressEvent<FileReader>): void => {
                if (!(evt.target && evt.target.result)) {
                    return;
                }
                const words: string[] = (evt.target.result as string).split(",").map((word: string) => word.toLowerCase());
                if (words.length === 0) {
                    alert("Файл пустой. Игра не может начаться с пустым файлом");
                    return;
                }

                this._loadedWords = words;
                const hiddenWord: string = this._controller.getHiddenWord(this._loadedWords);
                const sceneBuilder: SceneBuilder = new SceneBuilder();
                this._scene = sceneBuilder.build(hiddenWord);
                this._controller.setHiddenWord(hiddenWord);
            });
            reader.addEventListener("error", (evt: ProgressEvent<FileReader>): void => {
                alert("Ошибка чтения файла");
            })
        });

        document.addEventListener("click", (e: MouseEvent) => {
            const canvasEventX: number = e.clientX - this._context.canvas.getBoundingClientRect().left;
            const canvasEventY: number = e.clientY - this._context.canvas.getBoundingClientRect().top;

            this._scene?.getAlphabet().forEach((letter: Letter) => {
                if (letter.frame.x <= canvasEventX && canvasEventX <= letter.frame.x + letter.frame.width &&
                    letter.frame.y <= canvasEventY && canvasEventY <= letter.frame.y + letter.frame.height) {
                    this._controller.handleLetterClick(letter.value);
                }
            });
        });

        document.addEventListener("keydown", (e: KeyboardEvent) => {
            if (e.code === "Space") {
                const hiddenWord: string = this._controller.getHiddenWord(this._loadedWords);
                const sceneBuilder: SceneBuilder = new SceneBuilder();
                this._scene = sceneBuilder.build(hiddenWord);
                this._controller.setHiddenWord(hiddenWord);
            }
        })
    }

    // TODO: дОБАВИТЬ ВОПРОС ПОЛЬЗОВАТЕЛЮ
    // TODO: Сделать так, чтобы по буквам было легче попадать
    // TODO: Убрать из модели HangmanState, ScaffoldState
    public update(data: ModelMessage): void {
        switch (data.type) {
            case ModelMessageType.Defeat:
                alert("Вы проиграли!");
                break;
            case ModelMessageType.Victory:
                alert("Вы выиграли!");
                break;
            default:
                break;
        }
        this._scene.setState(data.model);
        this._scene.clear(this._context);
        this._scene.draw(this._context);
    }
}