import { useState } from "react";

export default () => {
  const [value, setValue] = useState("");

  return {
    value,
    setValue,
    onChange: event => {
      setValue(event.target.value);
    },
    reset: () => setValue("")
  };
};
