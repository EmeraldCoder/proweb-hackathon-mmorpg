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
        console.log('Battle started', data);
		battle = launchBattle();
        // send the answer to the question to the client
        socket.emit('initedBattle', { battle: battle});
    });	
    
    socket.on('login', function(data) {
        /* 
         * data parameter structure expected
         * {
         *     playerName,
         *     playerClass
         * }
         */
        socket.character = new Assassin();
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

function Character() {
    this.name = '';
    this.xp = 0;
}

function Assassin() {
    Character.call(this);
    
    this.hp = 30;
    this.mp = 25;
    this.power = 15;
    this.defence = 10;
}
Assassin.prototype = new Character();
Assassin.prototype.constructor = Assassin;