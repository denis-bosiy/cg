import { IImageContainer } from "./IImageContainer";
import { ImageContainer } from "./ImageContainer";
import { IScene } from "./IScene";
import { Scene } from "./Scene";

const drawImage = (ctx: CanvasRenderingContext2D, content: Blob, scene: IScene) => {
    const image: HTMLImageElement = new Image();
    const imageContainer: IImageContainer = new ImageContainer(image, 0, 0);

    image.onload = (): void => {
        scene.addImage(imageContainer);
        imageContainer.makeDraggable(ctx, scene);
        scene.draw(ctx);
    };

    image.src = URL.createObjectURL(content);
}

export const main = (): void => {
    const select: HTMLSelectElement | null = document.getElementById("select") as HTMLSelectElement;
    const fileInput: HTMLInputElement | null = document.getElementById("file-input") as HTMLInputElement;
    const canvas: HTMLCanvasElement | null = document.getElementById("canvas") as HTMLCanvasElement;
    if (!select || !fileInput || !canvas) {
        return;
    }
    const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");
    if (!ctx) {
        return;
    }
    const scene: IScene = new Scene();

    fileInput.addEventListener("change", (e: Event) => {
        const files: FileList | null = (e.target as HTMLInputElement).files;
        if (!files) {
            return;
        }
        const image: File = files[0];
        if (!image) {
            return;
        }
        drawImage(ctx, image, scene);
    });
    select.addEventListener("change", (e: Event) => {
        if ((e.target as HTMLSelectElement).value === "open-file") {
            fileInput.click();
        }
        select.selectedIndex = 0;
    });
}