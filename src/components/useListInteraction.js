import { useState, useEffect, useCallback } from "react";

const useListInteraction = (todos, deleteTodo, enterTodo) => {
  const [current, setCurrent] = useState(0);

  const unFocusElement = () => {
    document.getElementById("mainInput").blur();
  };

  const handleUserKeyPress = useCallback(
    e => {
      switch (e.key) {
        case "ArrowUp":
          if (current === null) {
            unFocusElement();
            setCurrent(0);
            return;
          }
          e.preventDefault();
          setCurrent(prevCurrent => {
            if (prevCurrent === 0) {
              return prevCurrent;
            }
            return prevCurrent - 1;
          });
          break;
        case "ArrowDown":
          if (current === null) {
            unFocusElement();
            setCurrent(0);
            return;
          }
          e.preventDefault();
          setCurrent(prevCurrent => {
            if (prevCurrent === todos.length - 1) {
              return prevCurrent;
            }
            return prevCurrent + 1;
          });
          break;
        case "Backspace":
          if (current === null) return;
          deleteTodo(current);
          setCurrent(null);
          break;
        case "Enter":
          if (todos.length === 0) return;
          if (current === null) return;
          if (document.activeElement.id === "mainInput") return;
          setCurrent(current);
          enterTodo(current);
          break;
        default:
          break;
      }
    },
    [current, enterTodo, deleteTodo, todos.length]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleUserKeyPress);
    return () => {
      document.removeEventListener("keydown", handleUserKeyPress);
    };
  }, [handleUserKeyPress]);

  return [current, setCurrent];
};

export default useListInteraction;
