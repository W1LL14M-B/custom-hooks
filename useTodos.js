import { useEffect, useReducer } from "react";
import { todoReducer } from "../08-useReducer/todoReducer";


const init = () => {
  return JSON.parse(localStorage.getItem("todos")) || [];
};

export const useTodos = () => {
  const [todos, dispatch] = useReducer(todoReducer, [], init);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const TodosCount = todos.length;
  const pendingTodosCount = todos.filter((todo) => !todo.done).length;

  const handleNewTodo = (todo) => {
    const action = {
      type: "[TODO] Add todo",
      payload: todo,
    };

    dispatch(action);
  };

  const handleDeleteTodo = (id) => {
    dispatch({
      type: "[TODO] Remove todo",
      payload: id,
    });
  };

  const handleToggleTodo = (id) => {
    dispatch({
      type: "[TODO] Toggle todo",
      payload: id,
    });
  };

  return {
    todos,
    TodosCount,
    pendingTodosCount,
    handleNewTodo,
    handleDeleteTodo,
    handleToggleTodo,
  };
};