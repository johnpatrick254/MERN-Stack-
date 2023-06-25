import { useRef } from "react";

interface TodoProps {
  todos: { id: string;
    description: string}[],
  handleDelete: (id:string)=>void
}
export const Todo: React.FC<TodoProps> = (props) => {

    return <>
        {
            props.todos.map((todo) => {
                return <>
                    <li key={todo.id} id={todo.id} >
                        {
                            todo.description
                        }
                        <button onClick={():void=>{
                        props.handleDelete(todo.id)
                    }}>DELETE</button>
                    </li>
                </>
            })
        } 
    </>
}