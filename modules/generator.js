// RANDOMIZE
export const randomize = (n) => {  // Simple Math.random() Shortcut :)
	return Math.floor(Math.random() * n);
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

// OBJECT ITERATION
function objectMap(object, mapFn) {
  return Object.keys(object).reduce(function(result) {
    result[key] = mapFn(object[key]);
    return result
  }, {})
}