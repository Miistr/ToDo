import React from "react";
import TextField from "@material-ui/core/TextField";
import useInputState from "./useInputState";
import Keyboard from "../keyboard/Keyboard";

const TodoForm = ({ saveTodo, setCurrent }) => {
  const { value, reset, onChange, setValue } = useInputState();

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
        inputProps={{
          maxLength: 25
        }}
      />

      <Keyboard value={value} setValue={setValue} saveTodo={saveTodo} />
    </form>
  );
};

export default TodoForm;
