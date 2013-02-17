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
	//var jsonWarrior = require('bonhomme_guerrier.json');
	var jsonWarrior = varrior;
	var warrior = new Player();
	warrior.life = jsonWarrior.life;
	
	console.log(warrior);
	/*
	fs.readFile('bonhomme_guerrier.json', 'utf8', function (err,data) {
		if (err) {
			//console.log(err); 
		}
			jsonWarrior = data;
			warrior = new Player();
			warrior.life = jsonWarrior.life;
			console.log(jsonWarrior);
		});
	*/

	return warrior;
};

function init_warrior(){
	var warrior = new Warrior();
	//console.log(warrior);
}