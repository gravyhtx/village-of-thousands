import { useState } from "react";

// MATH.RANDOM() SHORTCUT
export const randomize = (n) => {  // Simple Math.random() Shortcut :)
	return Math.floor(Math.random() * n);
}

// HEADS... OR TAILS?
export const cointoss = () => {
  let n = Math.floor(Math.random()*2);
  let bool = n === 0 ? true : false;
  return bool;
};

// GET AVERAGE OF NUMBERS IN AN ARRAY
export const average = (numberArray) => {
  let index = numberArray.length;
	let total = 0;
	for (let i=0; i < index; i++) {
    total = total + numberArray[i];
	}
	const avg = (total/index);
	return avg;
}
// export 

// RETURN ONE ELEMENT OR SET FROM AN ARRAY OF ARRAYS

// "el" is the array of arrays being sorted.
// "array" is boolean
//    true = entire array set // false = one element from array set
// "opts" is an array of indexes by number.

// Example (selecting only indexes 0 and 2 from array):
// const arr = [["1a","2a"],["1b"],["1c","2c","3c","4c"]]
// arrayEl(arr, [0,2])

// const [arrayElOutput, setArrayElOutput] = useState()
export const arrayEl = (el, array, opts) => {
  let output = null;
  array = array ? array : false;
  const select = () => {
    const output = el[randomize(el.length)];
    return output[randomize(output.length)];
  };
  const randomSelection = () => {
    let arr = [];
    if (opts) {
      for (let i=0; i<opts.length; i++) {
        const n = opts[i]
        arr.push(el[n]);
      }
    } else {
      arr=el;
    }
    return(array ? arr[randomize(arr.length)] : select(arr));
  }
  if(output === null){
    output = randomSelection()
  }
  return output
}

// SHUFFLE ARRAY ORDER
export const shuffleArr = (array) => {
  // Get number of indexes to replace
  let index = array.length;
	let randomIndex;
  while (index !== 0) {
    // Randomly choose from available elements.
    randomIndex = randomize(index);
    index--;
    // Replace current index with random element.
    [array[index], array[randomIndex]] =
    [array[randomIndex], array[index]];
  }
  return array;
}

// SHUFFLE STRING ORDER
export const shuffleStr = (str) => { // Randomizes character order of a string
    const arr = str.split('');
    str = shuffleArr(arr);
    const output = str.join('');
    return output;
}

// COMPARE OBJECTS FOR PERCENT MATCH
export const compareObjects = (objA, objB) => {
	// Get number of items in each object
	const aLength = Object.keys(objA).length;
	const bLength = Object.keys(objB).length;
	// Get "smaller" number, set the other as "larger" number
	const smaller = aLength < bLength ? objA : objB;
	const larger = smaller === objA ? objB : objA;
	// Check all objects for any matches in key/value pairs
	const count = Object.keys(smaller).reduce((acc, val) => {
		if(Object.keys(larger).includes(val)){
			if(larger[val] === smaller[val]){
				return ++acc;
			}};
	  	return acc;
	}, 0); // << let 'acc' increment from '0'
	return (count / Math.min(aLength, bLength)) * 100;
};