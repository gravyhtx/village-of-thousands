/////////////////////////////
// SIMPLE NUMBER FUNCTIONS //
/////////////////////////////


// MATH.RANDOM() SHORTCUT
export const randomize = (n) => {  // Simple Math.random() Shortcut :)
	return Math.floor(Math.random() * n);
}

// HEADS... OR TAILS?
export const cointoss = () => {
  let n = randomize = (2);
  let bool = n === 0 ? true : false;
  return bool;
};

// ROLL A RANDOM NUMBER -- ASSIGN IT WHEREVER YOU WANT ACROSS PAGES!
export const luckyRoll = (n) => {
  let output = Math.floor(Math.random()*(n));
  localStorage.setItem("luckyNumber", output);
};

// TRUNCATE TO DECIMAL PLACE
export const truncate = (num, decimalPlaces) => {    
  var numPowerConverter = Math.pow(10, decimalPlaces || 1); 
  return ~~(num * numPowerConverter)/numPowerConverter;
}

// ROUND TO NEAREST SPECIFIED MULTIPLE
export const roundToMultiple = (num, multiple) => {
  const m = multiple || 5;
  return Math.round(num / m) * m;
}

// CLAMP NUMBER WITHIN SPECIFIED RANGE
// Example...
// numberClamp(123,50,100) || Output: 100
export const numberClamp = (num, min, max) => {
  min = min ? min : 0;
  max = max ? max : 100;
  return Math.min(Math.max(num, min), max);
};



////////////////////////
// ROUNDING FUNCTIONS //
////////////////////////


// PRECISION ROUNDING (Round things like "1.005")
export const precisionRound = (num) => {
  var m = Number((Math.abs(num) * 100).toPrecision(15));
  return Math.round(m) / 100 * Math.sign(num);
}

// GAUSSIAN ROUNDING (Round to the nearest even number)
export const gaussRound = (num, decimalPlaces) => {
  var d = decimalPlaces || 0,
  m = Math.pow(10, d),
  n = +(d ? num * m : num).toFixed(8),
  i = Math.floor(n), f = n - i,
  e = 1e-8,
  r = (f > 0.5 - e && f < 0.5 + e) ?
  ((i % 2 == 0) ? i : i + 1) : Math.round(n);
  return d ? r / m : r;
}



///////////////////////
// COMPARE & SHUFFLE //
///////////////////////


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

// OBJECT ITERATION
export const objectMap = (object, mapFn) => {
  return Object.keys(object).reduce(function(result) {
    result[key] = mapFn(object[key]);
    return result
  }, {})
}


// ONLY RETURNS ONE ELEMENT FROM AN ARRAY OF ARRAYS
export const select = (el) => {
  const output = el[randomize(el.length)];
  return output[randomize(output.length)];
};

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


// MULTIPLE OPTIONS FOR RETURNING SINGLE ELEMENT OR SET FROM AN ARRAY OF ARRAYS

// "el" is the array of arrays being sorted

// "array" is boolean
//    true = output entire array set
//    false = output one element from array set... just like `select(el)` function above ^^^
// "opts" is an array of index numbers of the sets chosen to be factored

//    use to exclude/include certain sets from the selection being made

  // CHOOSE ONE ELEMENT FROM AN ARRAY OF ARRAYS
  // Example (selecting only indexes 0 and 2 from array):
  //   const arr = [["1a","2a"],["1b"],["1c","2c","3c"],["4b","4c"]]
  //   arrayEl(arr, true, [0,2])
  //   OUTPUT -- ["1c","2c","3c"] -- Selected 'arr[2]' from indexes 0 and 2

export const arrayEl = (el, array, opts) => {
  let output = null;
  array = array ? array : true;
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


/////////////////////////////
// QUANTUM REALM FUNCTIONS //
/////////////////////////////


export async function q( arrayLength, dataType, blockSize ){
  const types = ['uint8', 'uint16', 'hex16'];
  arrayLength = arrayLength > 0 ? numberClamp(arrayLength, 1, 1024) : '1';
  const type = dataType <= 3 || dataType >= 0 ? types[dataType] : types[0];
  blockSize = blockSize && types[2] ? numberClamp(blockSize, 1, 1024) : '1';
  const url = 'https://qrng.anu.edu.au/API/jsonI.php?length=' + arrayLength + '&type=' + type + '&size=' + blockSize;
  const response = await fetch(url);
  const output = await response.json();
  return output.data;
}

// QUANTAMIZE
// Examples...
// quantumize() || Output: Value between 0-1 (16 decimal places)
// quantumize(3) || Output: Value between 0-3 (16 decimal places)
// quantumize(1,true) || Output: Value between 0.00-100.00
// quantumize(5,true) || Output: Value between 0.00-500.00
export const quantumize = ( num, percentage, arraySize, highBandwidth ) => {
  const [qVal, setQval] = useState([]);
  const b = highBandwidth ? [1, 65535] : [0, 255];
  arraySize = arraySize ? numberClamp(arraySize,1,1024) : 1;
  useEffect(() => {
    q(arraySize,b[0]).then((res) => {
      num = num ? num : 1;
      const n = res[0];
      const m = (n / b[1]);
      const r = m * num;
      const val = percentage ? precisionRound(r * 100) : r;
      let output = [];
      if(arraySize > 1 && !percentage) {
        for (let val of res) {
          output.push(val / b[1]);
        }
        setQval(output);
      } else if (arraySize > 1 && percentage) {
        for (let val of res) {
          output.push(precisionRound((val / b[1])*100));
        }
        setQval(output);
      } else {
        setQval(val)
      };
    });
  }, [])
  return qVal;
}

export const quantumHex = ( arraySize ) => {
  // Prepare useState to store hex values
  const [hexVal, setHexVal] = useState([]);
  // Warn console if 'arraySize' isn't between 1-1024 and show value being used.
  if(arraySize > 1024 || arraySize < 1){
    console.warn("Array size must be between 1-1024. Array size has now been set to "+numberClamp(arraySize,1,1024)+".")
  }
  // Ensure value is within min/max range
  arraySize = arraySize ? numberClamp(arraySize, 1, 1024) : 1;
  // Get array of generated hex values (without infinitely looping)
  useEffect(() => { q(arraySize,2,3).then((res) => { setHexVal(res) }) }, []);
  // Update output array with "#" appended to each value
  let output = [];
  for (let val of hexVal) {
    output.push("#"+val);
  }
  return output;
}