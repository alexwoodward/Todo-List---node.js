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
				connection.release();
				// Don't use the connection here, it has been returned to the pool.
			});
		});

// The pool will emit a connection event when a new connection is made within the pool.
		pool.on('connection', function (connection) {
			console.log("Connected");
			// Set a session variable
			var todos = connection.query('SELECT * FROM todos_list');
			todos.on('todo', function (todo) {
				response.render(todo);
			});
			connection.query('SET SESSauto_increment_increment=1')
		});
	});
    app.post('/todo', urlencodedParser, function(request, response) {
        data.push(request.body);
        response.json(data);
    });

    app.delete('/todo/:item', function(request, response) {
        data = data.filter(function (todo) {
            return todo.item.replace(/ /g, '-') !== request.params.item;        // deletes when returns false
        });
        response.json(data);
    });
};

/*    app.get('/todo', function(request, response) {
 response.render('todo', {todos: data});
 });
 */