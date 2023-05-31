import { Frame } from "./Frame";
import { IDrawable } from "./IDrawable";

export class VectorRocket implements IDrawable {
    frame: Frame;
    instrumentCompartment: IDrawable[];
    spaceShip: IDrawable[];
    supplier: IDrawable[];
    oxidizerTank: IDrawable[];
    fuelTank: IDrawable[];
    wings: IDrawable[];
    jetStream?: IDrawable[];

    public draw(context: CanvasRenderingContext2D): void {
        this.instrumentCompartment.forEach((complexItem: IDrawable) => complexItem.draw(context));
        this.spaceShip.forEach((complexItem: IDrawable) => complexItem.draw(context));
        this.supplier.forEach((complexItem: IDrawable) => complexItem.draw(context));
        this.oxidizerTank.forEach((complexItem: IDrawable) => complexItem.draw(context));
        this.fuelTank.forEach((complexItem: IDrawable) => complexItem.draw(context));
        this.jetStream?.forEach((complexItem: IDrawable) => complexItem.draw(context));
        this.wings.forEach((complexItem: IDrawable) => complexItem.draw(context));
    }

    public changePosition(deltaX: number, deltaY: number): void {
        this.frame.x += deltaX;
        this.frame.y += deltaY;
        this.instrumentCompartment.forEach((complexItem: IDrawable) => complexItem.changePosition(deltaX, deltaY));
        this.spaceShip.forEach((complexItem: IDrawable) => complexItem.changePosition(deltaX, deltaY));
        this.supplier.forEach((complexItem: IDrawable) => complexItem.changePosition(deltaX, deltaY));
        this.oxidizerTank.forEach((complexItem: IDrawable) => complexItem.changePosition(deltaX, deltaY));
        this.fuelTank.forEach((complexItem: IDrawable) => complexItem.changePosition(deltaX, deltaY));
        this.wings.forEach((complexItem: IDrawable) => complexItem.changePosition(deltaX, deltaY));
        this.jetStream?.forEach((complexItem: IDrawable) => complexItem.changePosition(deltaX, deltaY));
    }
}