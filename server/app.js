var app = require('http').createServer(httpHandler),
    io = require('socket.io').listen(app),
	perso = require('./Personnage.js')
    fs = require('fs'),
	varrior = require('./bonhomme_guerrier.json');		
	vm = require('vm');	
	

/*
 * Start our server
 */
app.listen(8080);
console.log('Server started on 127.0.0.1:8080');

/*
 * Http server stuff
 * send our html5 client to the browser
 */
function httpHandler (req, res) {
    var filename = '';
    if (req.url == '/') {
        filename = __dirname + '/../client/index.html';
    } else {
        filename = __dirname + '/../client' + req.url;
    }
    
    fs.readFile(filename, function(err, data) {
        if (err) {
            res.writeHead(500);
            return res.end('Error loading ' + req.url);
        }
        
        res.writeHead(200);
        res.end(data);
    });	
}

/*
 * WebSocket server stuff
 */
io.on('connection', function (socket) {
    // event call we the client ask a question
    socket.on('question', function (data) {
        console.log('Question received', data);
        // send the answer to the question to the client
        socket.emit('answer', { answer: 'Demande à Chuck Norris' });
    });

    socket.on('startBattle', function (data) {
        socket.battle = new Battle();        
        socket.emit('battleStarted', { computerClass: 'Assassin' });
    });	
    
    socket.on('battlefieldReady', function() {
        socket.emit('playerTurn');
    });
    
    socket.on('playerChoose', function() {
        socket.character.attack(socket.battle.opponent);
        
        var playerWin = socket.battle.opponent.hp <= 0;
        
        socket.emit('playerChooseResult', { message: 'Votre attaque à réussi', win: playerWin });        
    });
    
    socket.on('playerTurnEnd', function(){
        socket.battle.opponent.attack(socket.character);
        
        var playerLose = socket.character.hp <= 0;
        
        socket.emit('computerChooseResult', { message: 'Vous vous êtes fait toucher', lose: playerLose });
    });
    
    socket.on('computerTurnEnd', function(){
        socket.emit('playerTurn');
    });
    
    socket.on('login', function(data) {
        /* 
         * data structure expected from client
         * {
         *     playerName,
         *     playerClass
         * }
         */
        socket.character = CharacterFactory(data.playerClass);
        socket.character.name = data.playerName;
        
        socket.emit('loginAccepted', socket.character);
    });
	
});

function launchBattle(){
	battle = new Object()
	battle.bonhomme1 = createBonhomme('sailor moon');
	battle.bonhomme2 = createBonhomme('pandaman');
	battle.turn = 1;
	
	return battle;
}

function createBonhomme(nom){
	var includeInThisContext = function(path) {
		var code = fs.readFileSync(path);
		vm.runInThisContext(code, path);
	}.bind(this);
	includeInThisContext("Personnage.js");

	//Ou http://stackoverflow.com/questions/5625569/include-external-js-file-in-node-js-app
	
	var warrior = init_warrior();
	return warrior;
}

function bonhomme(nom){
	bon = new Object()
	bon.nom = nom;
	return bon;
}

function CharacterFactory(classname) {
    classname = classname.toLowerCase();
    if (classname == 'assassin') return new Assassin();
    if (classname == 'fighter') return new Fighter();
    if (classname == 'mage') return new Mage();
    return null;
}

function Character() {
    this.name = '';
    this.xp = 0;
    
    this.attack = function(opponent) {
        opponent.hp = opponent.hp - this.power;
    };
}

function Assassin() {
    Character.call(this);
    
    this.hp = 30;
    this.maxHp = 30;
    this.mp = 25;
    this.maxMp = 25;
    this.power = 15;
    this.defence = 10;
}
Assassin.prototype = new Character();
Assassin.prototype.constructor = Assassin;

function Fighter() {
    Character.call(this);
    
    this.hp = 50;
    this.maxHp = 50;
    this.mp = 20;
    this.maxMp = 20;
    this.power = 15;
    this.defence = 15;
}
Fighter.prototype = new Character();
Fighter.prototype.constructor = Fighter;

function Mage() {
    Character.call(this);
    
    this.hp = 25;
    this.maxHp = 25;
    this.mp = 50;
    this.maxMp = 50;
    this.power = 20;
    this.defence = 5;
}
Mage.prototype = new Character();
Mage.prototype.constructor = Mage;

function Battle() {
    this.opponent = new Assassin();
}
