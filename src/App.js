import React from "react";
import Typography from "@material-ui/core/Typography";
import TodoForm from "./components/ToDoForm";
import TodoList from "./components/ToDoList";
import useToDoState from "./components/useToDoState";
import useListInteraction from "./components/useListInteraction";
import "./App.css";

const App = () => {
  const { todos, addTodo, deleteTodo, enterTodo } = useToDoState([]);
  const [current, setCurrent] = useListInteraction(
    todos,
    deleteTodo,
    enterTodo
  );

  return (
    <div className="appContainer">
      <Typography component="h1" variant="h2">
        ToDo List
      </Typography>

      <TodoForm
        setCurrent={setCurrent}
        saveTodo={todoText => {
          const trimmedText = todoText.trim();

          if (trimmedText.length > 0) {
            addTodo(trimmedText);
          }
        }}
      />

      <TodoList
        current={current}
        setCurrent={setCurrent}
        todos={todos}
        deleteTodo={deleteTodo}
        enterTodo={enterTodo}
      />
    </div>
  );
};

export default App;
