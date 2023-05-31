define(["require", "exports", "./ImageContainer", "./Scene"], function (require, exports, ImageContainer_1, Scene_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.main = void 0;
    var drawImage = function (ctx, content, scene) {
        var image = new Image();
        var imageContainer = new ImageContainer_1.ImageContainer(image, 0, 0);
        image.onload = function () {
            scene.clear(ctx);
            scene.addImage(imageContainer);
            scene.draw(ctx);
        };
        image.src = URL.createObjectURL(content);
    };
    var exportCanvasImage = function (ctx, type, extension) {
        var link = document.createElement('a');
        link.download = 'download.' + extension;
        link.href = ctx.canvas.toDataURL(type);
        link.click();
        link.remove();
    };
    var main = function () {
        var select = document.getElementById("select");
        var fileInput = document.getElementById("file-input");
        var penColorInput = document.getElementById("pen-color-input");
        var canvas = document.getElementById("canvas");
        if (!select || !fileInput || !canvas || !penColorInput) {
            return;
        }
        var ctx = canvas.getContext("2d");
        if (!ctx) {
            return;
        }
        // State
        var penColor = "#000000";
        var scene = new Scene_1.Scene();
        scene.makePaintable(ctx, penColor);
        penColorInput.value = penColor;
        fileInput.addEventListener("change", function (e) {
            var files = e.target.files;
            if (!files) {
                return;
            }
            var image = files[0];
            if (!image) {
                return;
            }
            scene = new Scene_1.Scene();
            scene.makePaintable(ctx, penColor);
            drawImage(ctx, image, scene);
        });
        select.addEventListener("change", function (e) {
            var eventValue = e.target.value;
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
                    scene = new Scene_1.Scene();
                    scene.makePaintable(ctx, penColor);
                    scene.draw(ctx);
                    break;
                default:
                    break;
            }
            select.selectedIndex = 0;
        });
        penColorInput.addEventListener("input", function () {
            penColor = penColorInput.value;
            scene.setPenColor(penColor);
        });
    };
    exports.main = main;
});
