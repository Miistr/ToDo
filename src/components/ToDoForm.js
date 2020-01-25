import React from "react";
import TextField from "@material-ui/core/TextField";
import useInputState from "./useInputState";

const TodoForm = ({ saveTodo, setCurrent }) => {
  const { value, reset, onChange } = useInputState();

  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        saveTodo(value);
        reset();
      }}
    >
      <TextField
        id="mainInput"
        variant="outlined"
        placeholder="Add todo"
        margin="normal"
        onClick={() => setCurrent(null)}
        onChange={onChange}
        value={value}
      />
    </form>
  );
};

export default TodoForm;
