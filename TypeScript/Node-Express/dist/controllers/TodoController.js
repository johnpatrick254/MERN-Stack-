"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.getTodos = exports.createToDo = void 0;
const Todo_1 = require("../models/Todo");
let todos = [];
const createToDo = (req, res, _next) => {
    const desc = req.body.text;
    const newTodo = new Todo_1.Todo((Math.random() * 2000).toFixed().toString(), desc);
    todos.push(newTodo);
    res.status(201).json({ msg: 'success', todo: newTodo });
};
exports.createToDo = createToDo;
const getTodos = (_req, res) => {
    res.json(todos);
};
exports.getTodos = getTodos;
const updateTodo = (req, res) => {
    const { id } = req.params;
    const { text } = req.body;
    todos = todos.map(todo => {
        if (todo.id === id) {
            todo.text = text;
        }
        return todo;
    });
    res.json(todos);
};
exports.updateTodo = updateTodo;
const deleteTodo = (req, res) => {
    const { id } = req.params;
    todos = todos.filter(todo => todo.id !== id);
    res.json(todos);
};
exports.deleteTodo = deleteTodo;
//# sourceMappingURL=TodoController.js.map