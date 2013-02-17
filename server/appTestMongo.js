
	
var mongoose = require('mongoose');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection ERROR:'));
db.once('open', function callback () {
	// on a un schéma (interface)
	var kittySchema = mongoose.Schema({
		name: String
	});
	// et un modèle
	var Kitten = mongoose.model('Kitten', kittySchema);
	// pis on y fait des instances
	var silence = new Kitten({ name: 'Silence' });
	console.log(silence.name); // 'Silence';

	//Attention fonctions !!!
	/*
	kittySchema.methods.speak = function () {
	var greeting = this.name
		? "Meow name is " + this.name
		: "I don't have a name"
		console.log(greeting);
	};
	var Kitten = mongoose.model('Kitten', kittySchema);

	var fluffy = new Kitten({ name: 'fluffy' });
	fluffy.speak() // "Meow name is fluffy"

	fluffy.save(function (err, fluffy) {
	//if (err) // TODO handle the error
	fluffy.speak();
	});

	Kitten.find(function (err, kittens) {
	//if (err) // TODO handle err
	console.log(kittens)

	})
	*/
});
mongoose.connect('mongodb://user:password@ds043487.mongolab.com:43487/hackathon');

/*
shell
mongo "dbh13.mongolab.com:27137/myDB"
db.auth("<username>","<password>")

*/

