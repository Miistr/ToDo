import { useState, useEffect, useCallback } from "react";

const useListInteraction = (todos, deleteTodo) => {
  const [current, setCurrent] = useState(0);

  const handleUserKeyPress = useCallback(
    e => {
      switch (e.key) {
        case "ArrowUp":
          e.preventDefault();
          setCurrent(prevcurrent => {
            if (prevcurrent === 0) {
              return prevcurrent;
            }
            return prevcurrent - 1;
          });
          break;
        case "ArrowDown":
          e.preventDefault();
          setCurrent(prevcurrent => {
            if (prevcurrent === todos.length - 1) {
              return prevcurrent;
            }
            return prevcurrent + 1;
          });
          break;
        case "Backspace":
          deleteTodo(current);
          break;
        default:
          break;
      }
    },
    [current, deleteTodo, todos.length]
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
