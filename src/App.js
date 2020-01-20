import React from "react";
import Typography from "@material-ui/core/Typography";
import TodoForm from "./components/ToDoForm";
import TodoList from "./components/ToDoList";
import useToDoState from "./components/useToDoState";
import "./App.css";

const App = () => {
  const { todos, addTodo, deleteTodo } = useToDoState([]);
  return (
    <div className="appContainer">
      <Typography component="h1" variant="h2">
        Todos
      </Typography>

      <TodoForm
        saveTodo={todoText => {
          const trimmedText = todoText.trim();

          if (trimmedText.length > 0) {
            addTodo(trimmedText);
          }
        }}
      />

      <TodoList todos={todos} deleteTodo={deleteTodo} />
    </div>
  );
};

export default App;
