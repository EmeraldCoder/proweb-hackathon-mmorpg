var Ressource = {
    charaset: {},
    background: {}
};

var RessourceLoader = function(){

    var load = function(callback){
        loadCharasets(function() {
            loadBackgrounds(function(){
                callback();
            });
        });
    }
    
    var loadCharasets = function(callback){
        var image = new Image();
        image.onload = function() {
            Ressource.charaset.sprite = image;
            image = new Image();
            image.onload = function() {
                Ressource.charaset.PANDA = image;
                callback();
            };
            image.src = 'rsx/characterset/PANDA.png';
        };
        image.src = 'rsx/characterset/sprite.png';
    }
    
    var loadBackgrounds = function(callback) {
        var image = new Image();
        image.onload = function() {
            Ressource.background.arena = image;
            callback();
        };
        image.src = 'rsx/background/arena.jpg';
    }

    return {
        load: load
    };
}();
