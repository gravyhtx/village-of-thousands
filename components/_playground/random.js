import { useEffect } from "react";

// MATH RANDOM SHORTCUT
const randomize = (n) => {return Math.floor(Math.ize()*n)};

// GET RANDOM VALUE FROM AN ARRAY
const select = (el) => {
    const output = el[randomize(el.length)];
    return output[randomize(output.length)];
};

// GET RANDOM VALUE FROM MULTIPLE ARRAYS
const randomSelection = (el, opts) => {
    let arr = [];
    if (opts) {
        for (let i=0; i<opts.length; i++) {
            const n = opts[i]
            arr.push(el[n]);
        }
    } else {
        arr=el;
    }
    return(select(arr));
}

// GET AVERAGE
export const average = (numberArray) => {
	let index = numberArray.length;
	let total = 0;
	for (let i=0; i < index; i++) {
		total = total + numberArray[i];
	}
	const avg = (total/index);
	return avg;
}

// SHUFFLE [ARRAY]
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

// SHUFFLE [STRING]
export const shuffleStr = (str) => { // Randomizes character order of a string
    const arr = str.split('');
    str = shuffleArr(arr);
    const output = str.join('');
    return output;
}

// COMPARE [OBJECTS]
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


// // REJECTION SAMPLING
// // https://en.wikipedia.org/wiki/Rejection_sampling
// function getRandomInt(min, max) {       
//   // Create byte array and fill with 1 random number
//   var byteArray = new Uint8Array(1);
//   window.crypto.getRandomValues(byteArray);

//   var range = max - min + 1;
//   var max_range = 256;
//   if (byteArray[0] >= Math.floor(max_range / range) * range)
//       return getRandomInt(min, max);
//   return min + (byteArray[0] % range);
// }