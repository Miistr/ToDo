import React, { useState, useEffect, useCallback } from "react";
import { enUS, ruRU } from "./keyboardLayouts";
import "./keyboardStyle.css";

const supportedLanguages = {
  EN: "english",
  RU: "russian"
};

const keyboardLayouts = {
  [supportedLanguages.EN]: enUS,
  [supportedLanguages.RU]: ruRU
};

const specialKeys = {
  TAB: "Tab",
  SPACE: "Space",
  ENTER: "Enter",
  CONTROL: "Control",
  SHIFT: "Shift",
  BACKSPACE: "Backspace",
  CAPSLOCK: "CapsLock"
};

const specialKeysCombination = {
  [specialKeys.CONTROL]: [specialKeys.SHIFT, "c", "v", "с", "м", "z", "я"]
};

const Keyboard = ({ setValue, saveTodo, value: currentInputValue }) => {
  const [language, setLanguage] = useState(supportedLanguages.EN);
  const [isShiftPressed, setShiftPressed] = useState(false);
  const [isCapsPressed, setCapsPressed] = useState(false);
  const [isControlPressed, setControlPressed] = useState(false);
  const [copiedValue, setCopiedValue] = useState("");
  const [pressedKey, setPressedKey] = useState("");

  const keyHandler = e => {
    const keyValue = e.target.value;
    setPressedKey(keyValue);
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
        case "c":
        case "с":
          setCopiedValue(currentInputValue);
          break;
        case "v":
        case "м":
          setValue(currentInputValue + copiedValue);
          break;
        case "z":
        case "я":
          setCopiedValue(currentInputValue);
          setValue("");
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
        case specialKeys.CAPSLOCK:
          setCapsPressed(!isCapsPressed);
          break;
        case specialKeys.BACKSPACE:
          setValue(currentInputValue.slice(0, -1));
          break;
        case specialKeys.ENTER:
          saveTodo(currentInputValue);
          setValue("");
          break;
        case specialKeys.TAB:
          break;
        default:
          break;
      }
    } else {
      setValue(currentInputValue + keyValue);
    }
  };

  const highlightButton = useCallback(
    event => {
      if (event.type === "keyup") {
        setPressedKey("");
      } else {
        setPressedKey(event.key);
      }
    },
    [setPressedKey]
  );

  useEffect(() => {
    document.addEventListener("keydown", highlightButton);
    return () => {
      document.removeEventListener("keydown", highlightButton);
    };
  }, [highlightButton]);

  useEffect(() => {
    document.addEventListener("keyup", highlightButton);
    return () => {
      document.removeEventListener("keyup", highlightButton);
    };
  }, [highlightButton]);

  return (
    <div className="keyboardContainer">
      {keyboardLayouts[language][
        isShiftPressed
          ? "shift"
          : "default" && isCapsPressed
          ? "caps"
          : "default"
      ].map(elementsOfKeyboard => {
        let separatedElements = elementsOfKeyboard.split(" ");
        return (
          <div key={elementsOfKeyboard.toString()} className="buttonsContainer">
            {separatedElements.map((keyboardElement, index) => {
              return (
                <button
                  className={
                    keyboardElement === pressedKey
                      ? "keyboard-button pressed"
                      : "keyboard-button"
                  }
                  key={keyboardElement + index}
                  type="button"
                  value={keyboardElement}
                  onMouseDown={keyHandler}
                  onMouseUp={() => {
                    if (isCapsPressed || isControlPressed || isShiftPressed)
                      return;

                    setPressedKey("");
                  }}
                >
                  {keyboardElement}
                </button>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Keyboard;
