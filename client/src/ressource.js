var Ressource = {
    charaset: {}
};

var RessourceLoader = function(){

    var load = function(callback){
        loadCharasets(function() {
            callback();
        });
    }
    
    var loadCharasets = function(callback){
        var image = new Image();
        image.onload = function() {
            Ressource.charaset.sprite = image;
            callback();
        };
        image.src = 'rsx/characterset/sprite.png';
    }

    return {
        load: load
    };
}();
