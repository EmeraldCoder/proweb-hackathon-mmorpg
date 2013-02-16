var app = require('http').createServer(httpHandler),
    io = require('socket.io').listen(app),
    fs = require('fs');

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
    fs.readFile(__dirname + '/../client/indexChuck.html', function(err, data) {
        if (err) {
            res.writeHead(500);
            return res.end('Error loading indexChuck.html');
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
	var battle = battle();
	battle.getBonhommes();
});

function battle(){
	this.bonhomme1;
	this.bonhomme2;
	this.turn = 1;
	
	this.getBonhommes = function(){
		this.bonhomme1 = createBonhomme("panda");
		this.bonhomme2 = createBonhomme("Mage");
		console.log("in getBonhommes");
	}
}

function bonhomme(nom){
	return nom;
}

function createBonhomme(nom){
	return nom;
}



