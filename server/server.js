'use strict';

let fs = require('fs');
let path = require('path');
let express = require('express');
let bodyParser = require('body-parser');

const TODOS_FILE = path.join(__dirname, 'todos.json');

let app = express();
app.set('port', (process.env.PORT || 8080));

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Additional middleware which will set headers that we need on each request.
app.use(function (req, res, next) {
  // Set permissive CORS header - this allows this server to be used only as
  // an API server in conjunction with something like webpack-dev-server.
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

function readTodos(res, success) {
  fs.readFile(TODOS_FILE, function (err, data) {
    if (!err) {
      success(JSON.parse(data));
    } else {
      console.error(err);
      res.status(500).send(err);
    }
  });
}

function writeTodos(res, todos, success) {
  fs.writeFile(TODOS_FILE, JSON.stringify(todos, null, 2), function (err) {
    if (!err) {
      success();
    } else {
      console.error(err);
      res.status(500).send(err);
    }
  });
}

app.get('/api/todos', function (req, res) {
  readTodos(res, function (todos) {
    res.json(todos);
  });
});

app.post('/api/todos', function (req, res) {
  readTodos(res, function (todos) {
    let newTodo = {
      id: Date.now(),
      done: false,
      text: req.body.text
    };

    todos.push(newTodo);

    writeTodos(res, todos, function () {
      res.json(todos);
    });
  });
});

app.put('/api/todos/:id', function (req, res) {
  readTodos(res, function (todos) {
    let updatedTodo = req.body;
    let index = todos.map(function (t) {
      return t.id
    }).indexOf(parseInt(req.params.id));

    if (index > -1) {
      todos[index].text = updatedTodo.text;
      todos[index].done = updatedTodo.done;

      writeTodos(res, todos, function () {
        res.json(todos);
      });
    } else {
      res.status(404).send();
    }


  });
});

app.delete('/api/todos/:id', function (req, res) {
  readTodos(res, function (todos) {
    let index = todos.map(function (t) {
      return t.id
    }).indexOf(parseInt(req.params.id));

    if (index > -1) {
      todos.splice(index, 1);
      writeTodos(res, todos, function () {
        res.json(todos);
      });
    } else {
      res.status(404).send();
    }
  });
});


app.listen(app.get('port'), function () {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});
