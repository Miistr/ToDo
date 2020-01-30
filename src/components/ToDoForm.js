import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import useInputState from "./useInputState";
import Keyboard from "../keyboard/Keyboard";

const TodoForm = ({ saveTodo, setCurrent }) => {
  const { value, reset, onChange, setValue } = useInputState();
  const [pressedKey, setPressedKey] = useState("");

  return (
    <form
      onKeyDown={event => {
        const pressedKey = event.key;
        setPressedKey(pressedKey);
      }}
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

      <Keyboard
        value={value}
        setValue={setValue}
        saveTodo={saveTodo}
        pressedKey={pressedKey}
      />
    </form>
  );
};

export default TodoForm;
