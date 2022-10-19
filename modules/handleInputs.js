import { numberClamp } from "../utils/generator";

// HANDLE INPUTS -- Made for Text and Numbers
export const handleInput = (event, object, objectValue, errorMessage) => {
  const { name, value } = event.target;
  // Min and max must be number or boolean values
  const { type, min, max } = event.target.dataset;
  // Set min and max to values or true to use this feature
  const setMin = min && min !== true ? min : min === true ? 1 : min === 0 ? 0 : false;
  const setMax = max && max !== true ? max : max === true ? 100 : false;

  let result = value;

  // Ensure proper data entry in all inputs
  // Set 'data-type' as 'number' to use this feature
  if(type === 'number') {
    result = result.replace(/\D/g, '');
    result = setMin && (result < Number(setMin)) ? '' : setMax ? numberClamp(Number(result), setMin, setMax) : Number(result);
  } else {
    result;
  }

  // Optional Error Message
  if(errorMessage && type === 'number' && typeof objectValue !== 'number' && Number.isNaN(objectValue)) {
    console.warn("'objectValue' must be a number");
  }

  return object ? { ...object, [name]: result } : { [name]: result };
}


// HANDLE INCREMENT/DECREMENT ON INPUT -- Used for 'onKeyDown' with ArrowUp & ArrowDown keys
//  const objToSet = (e) => handleKeyDownIncDec(e, object.value)
//  setter()
export const handleKeyDownIncDec = (event, object, objectValue, errorMessage) => {

  // Use this function to increment or decrement an object value
  // Set 'min' and 'max' in the dataset with number or boolean value
  const key = event.key;
  const { name, value } = event.target;
  const { min, max } = event.target.dataset;

  const setMin = min && min !== true ? min : min === true ? 1 : min === 0 ? 0 : false;
  const setMax = max && max !== true ? max : max === true ? 100 : false;

  let result = Number(value);

  // Optional Error Message
  if(errorMessage && type === 'number' && typeof objectValue !== 'number' && Number.isNaN(objectValue)) {
    console.warn("'objectValue' must be a number");
  }

  if(key === 'ArrowUp' && (objectValue < setMax || setMax === false)) {
    Number(result++);
    return object ? { ...object, [name]: result } : { [name]: result };
  } else if(key === 'ArrowDown' && (objectValue > setMin || setMin === false)) {
    Number(result--);
    return object ? { ...object, [name]: result } : { [name]: result };
  } else {
    return { ...object }
  }
}