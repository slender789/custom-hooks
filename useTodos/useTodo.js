import { useEffect, useReducer } from "react";
import { todoReducer } from "./todoReducer";

export const useTodo = (initialTodos = []) => {    
    const init = () => {
        return JSON.parse(localStorage.getItem('todos')) || [];
    }
    const [todos, dispatch] = useReducer( todoReducer, initialTodos, init )
    
    useEffect(() => {
      localStorage.setItem('todos', JSON.stringify(todos))
    }, [todos])

    const handleOnErase = (id) => {
        console.log(id)
        const action = {
            type: '[TODO] Delete Todo',
            payload: id
        }

        dispatch(action);
    }
    
    const handleOnToggle = (id) => {
        const action = {
            type: '[TODO] Toggle Todo',
            payload: id
        }

        dispatch(action);
    }

    const handleOnNewTodo = (todo) => {
        const action = {
            type: '[TODO] Add Todo',
            payload: todo
        }

        dispatch(action);
    }

    const countTodos = () => {
        return todos.length
    }

    const countPendingTodos = () => {
        return todos.filter((todo) => (
            !todo.done 
        )).length;
    }

    return {
        todos,
        handleOnErase,
        handleOnNewTodo,
        handleOnToggle,
        countTodos,
        countPendingTodos
    }
}
