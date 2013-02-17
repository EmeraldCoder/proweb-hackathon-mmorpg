var Ressource = {
    charaset: {},
    background: {},
    sound: {}
};

var RessourceLoader = function(){

    var load = function(callback){
        loadCharasets(function() {
            loadBackgrounds(function(){
                loadSounds(function(){
                    callback();
                });
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
                image = new Image();
                image.onload = function() {
                    Ressource.charaset.mage = image;
                    image = new Image();
                    image.onload = function(){
                        Ressource.charaset.healer = image;
                        image = new Image();
                        image.onload = function() {
                            Ressource.charaset.fighter = image;
                            image = new Image();
                            image.onload = function(){
                                Ressource.charaset.druid = image;
                                image = new Image();
                                image.onload = function() {
                                    Ressource.charaset.assassin = image;
                                    image = new Image();
                                    image.onload = function(){
                                        Ressource.charaset.gypsy = image;
                                        callback();
                                    };
                                    image.src = 'rsx/characterset/gypsy.png';
                                };
                                image.src = 'rsx/characterset/assassin.png';
                            };
                            image.src = 'rsx/characterset/druid.png';
                        };
                        image.src = 'rsx/characterset/fighter.png';
                    };
                    image.src = 'rsx/characterset/healer.png';
                };
                image.src = 'rsx/characterset/mage.png';
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
    
    var loadSounds = function(callback) {
        createjs.Sound.addEventListener('loadComplete', createjs.proxy(function(){
            Ressource.sound.battle = createjs.Sound.createInstance('battle');
            createjs.Sound.addEventListener('loadComplete', createjs.proxy(function(){
                Ressource.sound.sword = createjs.Sound.createInstance('sword');
                createjs.Sound.addEventListener('loadComplete', createjs.proxy(function(){
                    Ressource.sound.loseBattle = createjs.Sound.createInstance('loseBattle');
                    createjs.Sound.addEventListener('loadComplete', createjs.proxy(function(){
                        Ressource.sound.winBattle = createjs.Sound.createInstance('winBattle');
                        createjs.Sound.addEventListener('loadComplete', createjs.proxy(function(){
                            Ressource.sound.intro = createjs.Sound.createInstance('intro');
                            callback();
                        }, this));
                        createjs.Sound.registerSound('http://magicolic.com/hackathon/intro.wav', 'intro');              
                    }, this));
                    createjs.Sound.registerSound('http://magicolic.com/hackathon/winBattle.wav', 'winBattle');              
                }, this));
                createjs.Sound.registerSound('http://magicolic.com/hackathon/loseBattle.wav', 'loseBattle');              
            }, this));
            createjs.Sound.registerSound('http://magicolic.com/hackathon/guerrierSword.mp3', 'sword');              
        }, this));
        createjs.Sound.registerSound('http://magicolic.com/hackathon/loopFight.wav', 'battle');  
    }

    return {
        load: load
    };
}();
