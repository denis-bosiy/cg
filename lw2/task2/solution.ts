import { IImageContainer } from "./IImageContainer";
import { ImageContainer } from "./ImageContainer";
import { IPaintableScene } from "./IPaintableScene";
import { IScene } from "./IScene";
import { Scene } from "./Scene";

const drawImage = (ctx: CanvasRenderingContext2D, content: Blob, scene: IScene): void => {
    const image: HTMLImageElement = new Image();
    const imageContainer: IImageContainer = new ImageContainer(image, 0, 0);

    image.onload = (): void => {
        scene.clear(ctx);
        scene.addImage(imageContainer);
        scene.draw(ctx);
    };

    image.src = URL.createObjectURL(content);
}

const exportCanvasImage = (ctx: CanvasRenderingContext2D, type: string, extension: string): void => {
    const link: HTMLAnchorElement = document.createElement('a');
    link.download = 'download.' + extension;
    link.href = ctx.canvas.toDataURL(type);

    link.click();

    link.remove();
}

export const main = (): void => {
    const select: HTMLSelectElement | null = document.getElementById("select") as HTMLSelectElement;
    const fileInput: HTMLInputElement | null = document.getElementById("file-input") as HTMLInputElement;
    const penColorInput: HTMLInputElement | null = document.getElementById("pen-color-input") as HTMLInputElement;
    const canvas: HTMLCanvasElement | null = document.getElementById("canvas") as HTMLCanvasElement;
    if (!select || !fileInput || !canvas || !penColorInput) {
        return;
    }
    const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");
    if (!ctx) {
        return;
    }
    // State
    let penColor: string = "#000000";
    let scene: IPaintableScene = new Scene();
    scene.makePaintable(ctx, penColor);
    penColorInput.value = penColor;

    fileInput.addEventListener("change", (e: Event) => {
        const files: FileList | null = (e.target as HTMLInputElement).files;
        if (!files) {
            return;
        }
        const image: File = files[0];
        if (!image) {
            return;
        }
        scene = new Scene();
        scene.makePaintable(ctx, penColor);
        drawImage(ctx, image, scene);
    });
    select.addEventListener("change", (e: Event) => {
        const eventValue: string = (e.target as HTMLSelectElement).value;

        switch (eventValue) {
            case "open-file":
                fileInput.click();
                break;
            case "save-png-file":
                exportCanvasImage(ctx, 'image/png', 'png');
                break;
            case "save-jpg-file":
                exportCanvasImage(ctx, 'image/jpeg', 'jpeg');
                break;
            case "save-bmp-file":
                exportCanvasImage(ctx, 'image/bmp', 'bmp');
                break;
            case "new-file":
                scene.clear(ctx);
                scene = new Scene();
                scene.makePaintable(ctx, penColor);
                scene.draw(ctx);
                break;
            default:
                break;
        }

        select.selectedIndex = 0;
    });
    penColorInput.addEventListener("input", () => {
        penColor = penColorInput.value;
        scene.setPenColor(penColor);
    });
}