
function Player () {
	this.nom;
	this.life = 0;
	this.mana = 0;
    this.power = 0;
	this.defence = 0;
	this.agility = 0;
	this.xp = 0;
    
    this.getInfo = function() {
        return this.color + ' ' + this.type + ' apple';
    };
}

function Warrior(){
	var jsonWarrior = require('./bonhomme_guerrier.json');
	var warrior = new Player();
	warrior.life = jsonWarrior.life;
	
};

function init(){
	var warrior = new Warrior();
	console.log(warrior);
}
init();

