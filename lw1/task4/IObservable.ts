import { IObserver } from "./IObserver";
import { ModelMessage } from "./Model/ModelMessage";

export interface IObservable {
    addObserver(o: IObserver): void;
    removeObserver(o: IObserver): void;
    notifyObservers(data: ModelMessage): void;
}