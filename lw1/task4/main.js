require(["view/view.js", "model/model.js"], (view, model) => {
    let modelInstance = new model.Model();
    let viewInstance = new view.View(modelInstance);

    modelInstance.addObserver(viewInstance);
    viewInstance.addListeners();
});