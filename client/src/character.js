function Character() {   
    this.positionX = 100;
    this.positionY = 100;
    
    this.animations = {
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
        downIdle: [{
            x: 0,
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
        leftIdle: [{
            x: 0,
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
            width: this.width,
            height: this.height
        }],
        rightIdle: [{
            x: 0,
            y: this.height * 2,
            width: this.width,
            height: this.height
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
        }],
        upIdle: [{
            x: 0,
            y: this.height * 3,
            width: this.width,
            height: this.height
        }]
    };
    
    this.sprite = new Kinetic.Sprite({
        x: this.positionX,
        y: this.positionY,
        image: Ressource.charaset[this.charaset],
        animation: 'downIdle',
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

function Panda() {
    this.width = 54;
    this.height = 81;
    
    this.charaset = 'PANDA';
    
    Character.call(this);
}
Panda.prototype = new Character();
Panda.prototype.constructor = Panda;

function Mage() {
    this.width = 54;
    this.height = 81;
    
    this.charaset = 'mage';
    
    Character.call(this);
}
Mage.prototype = new Character();
Mage.prototype.constructor = Mage;

function Healer() {
    this.width = 54;
    this.height = 81;
    
    this.charaset = 'healer';
    
    Character.call(this);
}
Healer.prototype = new Character();
Healer.prototype.constructor = Healer;

function Fighter() {
    this.width = 54;
    this.height = 81;
    
    this.charaset = 'fighter';
    
    Character.call(this);
}
Fighter.prototype = new Character();
Fighter.prototype.constructor = Fighter;

function Druid() {
    this.width = 54;
    this.height = 81;
    
    this.charaset = 'druid';
    
    Character.call(this);
}
Druid.prototype = new Character();
Druid.prototype.constructor = Druid;

function Assassin() {
    this.width = 54;
    this.height = 81;
    
    this.charaset = 'assassin';
    
    Character.call(this);
}
Assassin.prototype = new Character();
Assassin.prototype.constructor = Assassin;

function Gypsy() {
    this.width = 54;
    this.height = 81;
    
    this.charaset = 'gypsy';
    
    Character.call(this);
}
Gypsy.prototype = new Character();
Gypsy.prototype.constructor = Gypsy;
