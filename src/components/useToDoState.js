import { useState } from "react";

export default initialValue => {
  const [todos, setTodos] = useState(initialValue);

  return {
    todos,
    addTodo: todoText => {
      setTodos([...todos, { todoText, taskDone: false }]);
    },
    deleteTodo: todoIndex => {
      const newTodos = todos.filter((_, index) => index !== todoIndex);
      setTodos(newTodos);
    },
    enterTodo: current => {
      const newTodos = [...todos];
      newTodos[current] = {
        ...todos[current],
        taskDone: !todos[current].taskDone
      };
      setTodos(newTodos);
    }
  };
};
