import { add } from 'lodash-es';
import { writable, get } from 'svelte/store';


function createModifiers () {

  const modValues = writable(
    {
      "Shift":    0,
      "Control":  0,
      "Alt":      0,
    }
  );

  const keyName = {
    16: "Shift",
    17: "Control",
    18: "Alt",
  }

  // Checks if a given keyCode is in the list of modifiers
  function isValid(keyCode) {
    return Object.keys(keyName).includes(keyCode.toString());
  }

  function toggle(keyCode){
    if (!isValid(keyCode) ) return;
    let keyToChange = keyName[keyCode];

    // We copy the old value to a new variable
    let newValue = get(modValues);   

    // If value was non-zero, we toggle to 0. If it was zero, we toggle to 1
    newValue[keyToChange] = newValue[keyToChange] ? 0 : 1;  

    // And set the value of the modValues to the new value
    modValues.set(newValue);            
  }

  function add(keyCode) {
    if (!isValid(keyCode)) return;

    let keyToChange = keyName[keyCode];
    let newValue = get(modValues); 
    newValue[keyToChange] = 1;

    modValues.set(newValue);
  }

  function remove(keyCode)
  {
    if (!isValid(keyCode)) return;

    let keyToChange = keyName[keyCode];
    let newValue = get(modValues);
    newValue[keyToChange] = 0;

    modValues.set(newValue);
  }
  
  return{
    subscribe:      modValues.subscribe,
    toggleModifier: toggle,
    addModifier:    add,
    removeModifier: remove,
  }
}

export const modifiers = createModifiers();