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
    fs.readFile(__dirname + '/../client/index.html', function(err, data) {
        if (err) {
            res.writeHead(500);
            return res.end('Error loading index.html');
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
	
});

function launchBattle(){
	battle = new Object()
	battle.bonhomme1 = createBonhomme('sailor moon');
	battle.bonhomme2 = createBonhomme('pandaman');
	battle.turn = 1;
	
	return battle;
}

function createBonhomme(nom){
	var bonh = bonhomme(nom);
	return bonh;
}

function bonhomme(nom){
	bon = new Object()
	bon.nom = nom;
	return bon;
}