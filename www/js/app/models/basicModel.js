define(function () {
    function BasicModel(title, percentComplete) {
        this.title = title;
        this.percentComplete = percentComplete;
    }

    BasicModel.prototype.getTitle = function() {
        return this.title;
    };

    BasicModel.prototype.getPercentComplete = function() {
        return this.percentComplete;
    };

    return BasicModel;
});
