// Dependencies
const express = require("express");
const morgan = require("morgan");
const {json, urlencoded} = require("body-parser");
const mongojs = require("mongojs");
const Todo = require('./models/todo');
const mongoose = require("mongoose");

// Set up Express app
const app = express();

// Data parsing
app.use(morgan('dev'))
app.use(urlencoded({extended: true}))
app.use(json())

app.use(express.static('public'));

// CRUD
// Gets todo by id
app.delete('/todo/:id', (req, res) => {
    Todo.remove(
        {
            _id: mongojs.ObjectID(req.params.id)
        },
        (error, data) => {
            if (error) {
                res.send(error);
            } else {
                res.send(data);
            }
        }
    );
})

// Gets all todos
app.get('/todos', (req, res) => {
    Todo.find({}, (error, data) => {
        if(error) {
            res.send(error);
        } else {
            res.json(data);
        }
    });
});

// Create a todo
app.post('/todo', (req, res) => {
    const todoToCreate = req.body
    Todo.insertMany(todoCreate, (error, data) => {
        if(error) {
            res.send(error);
        } else {
            res.send(data);
        }
    });
});

// Update a todo
app.post('/update/:id', (req, res) => {
    Todo.update(
        {
            _id: mongojs.ObjectId(req.params.id)
        },
        {
            $set: {
                completed: true
            }
        },
        (error, data) => {
            if (error) {
                res.send(error);
            } else {
                res.send(data);
            }
        }
    );
});

var MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/pwatododb';

// Server listening
mongoose.connect(MONGODB_URI)
  .then(() => app.listen(8080, () => {
    console.log('server on http://localhost:8080')
  }))
  .catch(e => console.error(e))

  