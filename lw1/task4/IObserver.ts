import { ModelMessage } from "./Model/ModelMessage";

export interface IObserver {
    update(data: ModelMessage): void;
}