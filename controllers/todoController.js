/**
 * Created by alexwoodward on 5/16/17.
 */
var bodyParser = require('body-parser');

var data = [{item: 'Example 1'}, {item: 'Example 2'}];
var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app) {

    app.get('/', function(request, response) {
        response.render('homepage')
    });

    app.get('/whiteboard', function(request, response) {
        response.render('whiteboard')
    });

    app.get('/todo', function(request, response) {
        response.render('todo', {todos: data});
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




