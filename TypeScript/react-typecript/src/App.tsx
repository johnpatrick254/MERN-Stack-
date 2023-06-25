import { useState } from "react";
import { AddTodo } from "./components/AddToDo"
import { Todo } from "./components/Todo"


function App() {
  interface todos{
    id:string;
    description:string;
  }
  
  const [todos,setTodo ]= useState<todos[]> ([])
  const deleteTodo = (id:string):void =>{
    setTodo(prev=>prev.filter(todo => todo.id !== id));
    console.log(todos)
  }
  const handleAdd = (text: string): void => {
   setTodo(prev=>[...prev,{id:`${(Math.random() * 1000) +  (Math.random() * 1000)}`,description:text}])
  }
  return (
    <>
      <h1>To Do List</h1>
      <AddTodo handleAdd={handleAdd}/>
      <Todo todos={todos} handleDelete={deleteTodo} />
    </>
  )
}

export default App
