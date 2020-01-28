import React, { useState } from "react";
import { enUS, ruRU } from "./keyboardLayouts";

const supportedLanguages = {
  EN: "english",
  RU: "russian"
};

const keyboardLayouts = {
  [supportedLanguages.EN]: enUS,
  [supportedLanguages.RU]: ruRU
};

const specialKeys = {
  TAB: "{tab}",
  SPACE: "{space}",
  ENTER: "{enter}",
  CONTROL: "{ctrl}",
  SHIFT: "{shift}",
  BACKSPACE: "{bksp}"
};

const specialKeysCombination = {
  [specialKeys.CONTROL]: [specialKeys.SHIFT, "a", "x"]
};

const Keyboard = ({ setValue, value: currentInputValue }) => {
  const [language, setLanguage] = useState(supportedLanguages.EN);
  const [isShiftPressed, setShiftPressed] = useState(false);
  const [isControlPressed, setControlPressed] = useState(false);

  const keyHandler = e => {
    const keyValue = e.target.value;

    if (
      isControlPressed &&
      specialKeysCombination[specialKeys.CONTROL].some(key => key === keyValue)
    ) {
      switch (keyValue) {
        case specialKeys.SHIFT:
          if (language === supportedLanguages.EN) {
            setLanguage(supportedLanguages.RU);
          } else {
            setLanguage(supportedLanguages.EN);
          }
          break;

        default:
          break;
      }
    } else if (Object.values(specialKeys).some(key => key === keyValue)) {
      switch (keyValue) {
        case specialKeys.CONTROL:
          setControlPressed(!isControlPressed);
          break;
        case specialKeys.SPACE:
          setValue(currentInputValue + " ");
          break;
        case specialKeys.SHIFT:
          setShiftPressed(!isShiftPressed);
          break;
        case specialKeys.BACKSPACE:
          setValue(currentInputValue.slice(0, -1));
          break;
        default:
          break;
      }
    } else {
      setValue(currentInputValue + keyValue);
    }
  };

  return (
    <div>
      {keyboardLayouts[language][isShiftPressed ? "shift" : "default"].map(
        elementsOfKeyboard => {
          let separatedElements = elementsOfKeyboard.split(" ");
          return (
            <div key={elementsOfKeyboard.toString()}>
              {separatedElements.map((keyboardElement, index) => {
                return (
                  <button
                    key={keyboardElement + index}
                    type="button"
                    value={keyboardElement}
                    onClick={keyHandler}
                  >
                    {keyboardElement}
                  </button>
                );
              })}
              <br />
            </div>
          );
        }
      )}
    </div>
  );
};

export default Keyboard;
