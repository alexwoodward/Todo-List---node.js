var mysql      = require('mysql');
var connection = mysql.createConnection({
	host     : 'example.org',
	user     : 'woody',
	password : 'woody'
});

connection.connect(function(err) {
	if (err) {
		console.error('error connecting: ' + err.stack);
		return;
	}

	console.log('connected as id ' + connection.threadId);
});

connection.end(function(err) {
	//Terminate connection to database
});