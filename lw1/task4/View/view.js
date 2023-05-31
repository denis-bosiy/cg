define(["require", "exports", "../Controller/Controller", "../Model/ModelMessageType", "./SceneBuilder"], function (require, exports, Controller_1, ModelMessageType_1, SceneBuilder_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.View = void 0;
    var View = /** @class */ (function () {
        function View(model) {
            this._controller = new Controller_1.Controller(model);
            var canvas = document.getElementById("canvas");
            if (!canvas) {
                return;
            }
            var context = canvas.getContext("2d");
            if (!context) {
                return;
            }
            this._context = context;
        }
        View.prototype.addListeners = function () {
            var _this = this;
            var fileInput = document.getElementById("random-words-file-input");
            fileInput.addEventListener("change", function (e) {
                var fileList = e.currentTarget.files;
                if (!fileList) {
                    return;
                }
                var file = fileList[0];
                var reader = new FileReader();
                reader.readAsText(file, "UTF-8");
                reader.addEventListener("load", function (evt) {
                    if (!(evt.target && evt.target.result)) {
                        return;
                    }
                    var words = evt.target.result.split(",").map(function (word) { return word.toLowerCase(); });
                    if (words.length === 0) {
                        alert("Файл пустой. Игра не может начаться с пустым файлом");
                        return;
                    }
                    _this._loadedWords = words;
                    var hiddenWord = _this._controller.getHiddenWord(_this._loadedWords);
                    var sceneBuilder = new SceneBuilder_1.SceneBuilder();
                    _this._scene = sceneBuilder.build(hiddenWord);
                    _this._controller.setHiddenWord(hiddenWord);
                });
                reader.addEventListener("error", function (evt) {
                    alert("Ошибка чтения файла");
                });
            });
            document.addEventListener("click", function (e) {
                var _a;
                var canvasEventX = e.clientX - _this._context.canvas.getBoundingClientRect().left;
                var canvasEventY = e.clientY - _this._context.canvas.getBoundingClientRect().top;
                (_a = _this._scene) === null || _a === void 0 ? void 0 : _a.getAlphabet().forEach(function (letter) {
                    if (letter.frame.x <= canvasEventX && canvasEventX <= letter.frame.x + letter.frame.width &&
                        letter.frame.y <= canvasEventY && canvasEventY <= letter.frame.y + letter.frame.height) {
                        _this._controller.handleLetterClick(letter.value);
                    }
                });
            });
            document.addEventListener("keydown", function (e) {
                if (e.code === "Space") {
                    var hiddenWord = _this._controller.getHiddenWord(_this._loadedWords);
                    var sceneBuilder = new SceneBuilder_1.SceneBuilder();
                    _this._scene = sceneBuilder.build(hiddenWord);
                    _this._controller.setHiddenWord(hiddenWord);
                }
            });
        };
        View.prototype.update = function (data) {
            switch (data.type) {
                case ModelMessageType_1.ModelMessageType.Defeat:
                    alert("Вы проиграли!");
                    break;
                case ModelMessageType_1.ModelMessageType.Victory:
                    alert("Вы выиграли!");
                    break;
                default:
                    break;
            }
            this._scene.setState(data.model);
            this._scene.clear(this._context);
            this._scene.draw(this._context);
        };
        return View;
    }());
    exports.View = View;
});
