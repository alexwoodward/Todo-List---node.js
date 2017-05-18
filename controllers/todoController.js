/**
 * Created by alexwoodward on 5/16/17.
 */
var bodyParser = require('body-parser');
var mysql = require('mysql');

var data = [{item: 'Example 1'}, {item: 'Example 2'}];
var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app) {

	var pool  = mysql.createPool({
		connectionLimit : 100,
		host     : 'localhost',
		user     : 'root',
		password : 'localhost',
		database : 'my_db'
	});

	app.get('/todo', function(request,response) {
		pool.getConnection(function (err, connection) {
			// Use the connection
			console.log("error" + err);
			connection.query('SELECT * FROM todos_list', function (err, rows) {
				// And done with the connection.
				console.log(rows);
				response.render('todo', {todos: rows});
				// Don't use the connection here, it has been returned to the pool.
			});
		});
	});

	app.get('/', function(request, response) {
		response.render('homepage')
	});

	app.get('/whiteboard', function(request, response) {
		response.render('whiteboard')
	});

    app.post('/todo', urlencodedParser, function(request, response) { // insert database stuff
	    pool.getConnection(function (err, connection) {
		    // Use the connection
		    console.log(request.body);
		    connection.query('INSERT INTO todos_list VALUES (?)', request.body.item, function (err, rows) {
			    console.log(rows);
			    console.log("error" + err);
		        response.end();
		    });
	    });
        //my_db.push(request.body);
        //response.json(data);
    });

    app.delete('/todo/:item', function(request, response) {
// auto increment , delete by id
	    pool.getConnection(function (err, connection) {
		    // Use the connection
		    console.log(request.body);
		    console.log(request.params.item);
		    connection.query('DELETE FROM todos_list WHERE todo = ?', request.params.item, function (err, rows) {
			    console.log(rows);
			    console.log("error" + err);
			    response.end();
		    });
	    });
    });
};
// look up data attributes, sql auto incrementing ids
// - put data attribute with data id on every row
// - delete based on data attribute instead of name
// change inserts, have two rows now


/*
        data = data.filter(function (todo) {
            return todo.item.replace(/ /g, '-') !== request.params.item;        // deletes when returns false
        });
        response.json(data);
    app.get('/todo', function(request, response) {
 response.render('todo', {todos: data});
 });
 */