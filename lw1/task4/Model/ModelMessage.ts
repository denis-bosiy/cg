import { Model } from "./Model";
import { ModelMessageType } from "./ModelMessageType";

export class ModelMessage {
    model: Model;
    type: ModelMessageType;

    constructor(model: Model, type: ModelMessageType) {
        this.model = model;
        this.type = type;
    }
}