import {useState} from "react";

export function useValue(initialState = null) {
  const [value, setValue] = useState(initialState);
  return {
    value,
    setValue: function (newState) {
      this.value = newState;
      setValue(newState);
    }
  }
}
