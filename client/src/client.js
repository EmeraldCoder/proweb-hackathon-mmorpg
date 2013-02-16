CHARACTERS = {};

var stage = null;

window.onload = function() {    
    // init canvas stage
    stage = new Kinetic.Stage({
        container: 'container',
        width: 800,
        height: 600
    });
    
    RessourceLoader.load(game);
};

window.onkeyup = function(e) {
    // e.keyCode        
    // 37 left
    // 38 up
    // 39 right
    // 40 down
    if (e.keyCode == 37) {
        CHARACTERS.sailorMoon.sprite.setAnimation('left');
    } else if (e.keyCode == 38) {
        CHARACTERS.sailorMoon.sprite.setAnimation('up');
    } else if (e.keyCode == 39) {
        CHARACTERS.sailorMoon.sprite.setAnimation('right');
    } else if (e.keyCode == 40) {
        CHARACTERS.sailorMoon.sprite.setAnimation('down');
    }
};

function Character() {   
    this.positionX = 100;
    this.positionY = 100;
    
    this.animations = {
        idle: [{
            x: 0,
            y: 0,
            width: this.width,
            height: this.height
        }],
        down: [{
            x: 0,
            y: 0,
            width: this.width,
            height: this.height
        }, {
            x: this.width,
            y: 0,
            width: this.width,
            height: this.height
        }, {
            x: this.width * 2,
            y: 0,
            width: this.width,
            height: this.height
        }, {
            x: this.width * 3,
            y: 0,
            width: this.width,
            height: this.height
        }],
        left: [{
            x: 0,
            y: this.height,
            width: this.width,
            height: this.height
        }, {
            x: this.width,
            y: this.height,
            width: this.width,
            height: this.height
        }, {
            x: this.width * 2,
            y: this.height,
            width: this.width,
            height: this.height
        }, {
            x: this.width * 3,
            y: this.height,
            width: this.width,
            height: this.height
        }],
        right: [{
            x: 0,
            y: this.height * 2,
            width: this.width,
            height: this.height
        }, {
            x: this.width,
            y: this.height * 2,
            width: this.width,
            height: this.height
        }, {
            x: this.width * 2,
            y: this.height * 2,
            width: this.width,
            height: this.height
        }, {
            x: this.width * 3,
            y: this.height * 2,
            width: 32,
            height: 48
        }],
        up: [{
            x: 0,
            y: this.height * 3,
            width: this.width,
            height: this.height
        }, {
            x: this.width,
            y: this.height * 3,
            width: this.width,
            height: this.height
        }, {
            x: this.width * 2,
            y: this.height * 3,
            width: this.width,
            height: this.height
        }, {
            x: this.width * 3,
            y: this.height * 3,
            width: this.width,
            height: this.height
        }]
    };
    
    this.sprite = new Kinetic.Sprite({
        x: this.positionX,
        y: this.positionY,
        image: Ressource.charaset[this.charaset],
        animation: 'idle',
        animations: this.animations,
        frameRate: 7
    });
}

function SailorMoon() {
    this.width = 32;
    this.height = 48;
    
    this.charaset = 'sprite';
    
    Character.call(this);
}
SailorMoon.prototype = new Character();
SailorMoon.prototype.constructor = SailorMoon;

function game() {
    var layer = new Kinetic.Layer();        
    CHARACTERS.sailorMoon = new SailorMoon();
    layer.add(CHARACTERS.sailorMoon.sprite);    
    stage.add(layer);
    CHARACTERS.sailorMoon.sprite.start();
}
