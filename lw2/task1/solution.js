define(["require", "exports", "./ImageContainer", "./Scene"], function (require, exports, ImageContainer_1, Scene_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.main = void 0;
    var drawImage = function (ctx, content, scene) {
        var image = new Image();
        var imageContainer = new ImageContainer_1.ImageContainer(image, 0, 0);
        image.onload = function () {
            scene.addImage(imageContainer);
            imageContainer.makeDraggable(ctx, scene);
            scene.draw(ctx);
        };
        image.src = URL.createObjectURL(content);
    };
    var main = function () {
        var select = document.getElementById("select");
        var fileInput = document.getElementById("file-input");
        var canvas = document.getElementById("canvas");
        if (!select || !fileInput || !canvas) {
            return;
        }
        var ctx = canvas.getContext("2d");
        if (!ctx) {
            return;
        }
        var scene = new Scene_1.Scene();
        fileInput.addEventListener("change", function (e) {
            var files = e.target.files;
            if (!files) {
                return;
            }
            var image = files[0];
            if (!image) {
                return;
            }
            drawImage(ctx, image, scene);
        });
        select.addEventListener("change", function (e) {
            if (e.target.value === "open-file") {
                fileInput.click();
            }
            select.selectedIndex = 0;
        });
    };
    exports.main = main;
});
