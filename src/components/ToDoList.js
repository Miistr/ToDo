import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

const TodoList = ({ todos, deleteTodo, enterTodo, current, setCurrent }) => {
  return (
    <List>
      {todos.map(({ todoText: todo, taskDone }, index) => {
        const isSelected = current === null ? false : index === current;
        return (
          <ListItem
            key={index.toString()}
            dense
            button
            selected={isSelected}
            onClick={() => setCurrent(index)}
          >
            <Checkbox
              tabIndex={-1}
              disableRipple
              onClick={() => enterTodo(index)}
              value="taskDone"
              checked={taskDone}
            />
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
        );
      })}
    </List>
  );
};

export default TodoList;
