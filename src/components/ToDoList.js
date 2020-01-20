import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import useListInteraction from "./useListInteraction";

const TodoList = ({ todos, deleteTodo }) => {
  const [current, setCurrent] = useListInteraction(todos, deleteTodo);
  return (
    <List>
      {todos.map((todo, index) => (
        <ListItem
          key={index.toString()}
          dense
          button
          selected={index === current}
          onClick={() => setCurrent(index)}
        >
          <Checkbox tabIndex={-1} disableRipple />
          <ListItemText primary={todo} />
          <ListItemSecondaryAction>
            <IconButton
              aria-label="Delete"
              onClick={() => {
                deleteTodo(index);
              }}
            >
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
};

export default TodoList;
