import express, { RequestHandler } from "express";
import { Todo } from "../models/Todo";

let todos: Todo[] = [];

export const createToDo: RequestHandler = (req, res, _next) => {
    const desc = req.body.text;
    const newTodo: Todo = new Todo((Math.random()*2000).toFixed().toString(), desc)
    todos.push(newTodo);
    res.status(201).json({ msg: 'success', todo: newTodo }
    )
}

export const getTodos:RequestHandler =(_req,res)=>{
    res.json(todos)
}

export const updateTodo:RequestHandler<{id:string,text:string}> = (req,res)=>{
  const {id}=req.params
  const {text}= req.body
  todos = todos.map(todo=>{
    if(todo.id === id){
        todo.text=text
    }
    return todo
  })

  res.json(todos)
}
export const deleteTodo:RequestHandler<{id:string}>= (req,res)=>{
  const {id}=req.params
  todos = todos.filter(todo=>todo.id !== id)
  res.json(todos)
}