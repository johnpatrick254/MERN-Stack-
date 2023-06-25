import { useRef } from 'react'

interface AddToDoProps{
    handleAdd:(text:string)=>void
}

export const AddTodo: React.FC <AddToDoProps> = ({handleAdd}) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const handleSumbit = (e: React.FormEvent): void => {
        e.preventDefault();
        handleAdd(inputRef.current!.value);
        inputRef.current!.value='';
    }

    return <>
        <form onSubmit={handleSumbit}>
            <input type="text" name="input" ref={inputRef} />
            <button type='submit'>Add</button>
        </form>
    </>
}