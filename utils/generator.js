import { checkType, checkForWords, listOfWords } from "./validation";

/////////////////////////////
// SIMPLE NUMBER FUNCTIONS //
/////////////////////////////


// RANDOMIZE SHORTCUT
export const randomize = (n) => {
	return Math.floor(Math.random() * n);
}

// HEADS... OR TAILS?
export const cointoss = () => {
  let n = randomize(2);
  let bool = n === 0 ? true : false;
  return bool;
};

// RANDOMLY MAKE A NUMBER POSITIVE OR NEGATIVE
export const posNeg = (n) => {
  return (n?n:1)*(Math.round(Math.random()) * 2 - 1)
}

// ROLL A RANDOM NUMBER
//  Assign it wherever you want across pages!
export const luckyRoll = (n, includeZero) => {
  const output = includeZero === true ? randomize(n) : randomize(n)+1;
  localStorage.setItem("luckyNumber", output);
  return output;
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

// RANDOM VALUE FROM BELL CURVE
export function randomBell(multiplier, min, max, skew) {

  multiplier=(multiplier===true)?100:(typeof multiplier === 'number')?multiplier:undefined;
  min=min?min:0;
  max=max?max:1;
  skew=skew?skew:1;

  let u = 0, v = 0;
  while(u === 0) u = Math.random() //Converting [0,1) to (0,1)
  while(v === 0) v = Math.random()
  let num = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v )
  
  num = num / 10.0 + 0.5 // Translate to 0 -> 1
  if (num > 1 || num < 0) {
    num = randomBell(min, max, skew) // Resample between 0 and 1 if out of range
  } else {
    num = Math.pow(num, skew) // Skew
    num *= max - min // Stretch to fill range
    num += min // offset to min
  }
  return multiplier ? Math.floor(num*multiplier) : num;
}

// CLAMP NUMBER WITHIN SPECIFIED RANGE
export const numberClamp = (num, min, max) => {
  // Example...
  //    numberClamp(123,50,100) || Output: 100
  min = min ? min : 0;
  max = max ? max : 100;
  return Math.min(Math.max(num, min), max);
};

// HANDLE EVEN/ODD VALUES
//    ** Need to figure out handling non-whole number **
export const numberIsEven = (number) => {
  return number % 2 == 0 ? true : false;
}

export const numberIsOdd = (number) => {
  return number % 2 == 0 ? false : true;
}

export const makeNumberEven = (number) => {
  return number % 2 == 0 ? number : number+1;
}

export const makeNumberOdd = (number) => {
  return number % 2 == 0 ? number+1 : number;
}



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

/////////////
// STRINGS //
/////////////

export const capitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const capitalizeWord = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// CAPITALIZE MULTIPLE WORDS IN A STRING OR ARRAY
// Make Override List work
export const capitalizeWords = (input, titleCase, excludeWordsList, overrideList) => {

  // Check string to see if there are multiple words in a string. Checks to see if there
  // is at least one space, excluding leading and training spaces.
    const checkForMultipleWords = input.trim().indexOf(' ') != -1;
    const checkForArray = checkType(input, "array");
    const splitString = input.split(" ");
    const arr = checkForMultipleWords ? splitString : checkForArray ? input : [];

  // If input is just a single word and no reference checks need to be performed then output
  // then skip the rest and just return the word capitalized.
  if(checkType(input, "string") && !checkForMultipleWords && !titleCase && !overrideList) {
    return capitalizeWord(input);
  }

  // Make output for string of words or an array of words & set checks
  let capsArr = [];
  const overrideWords = overrideList && overrideList !== undefined && overrideList.length ? overrideList : false;
  let titleArray = overrideWords
    ? removeFromArray(listOfWords("titleCase"), overrideList)
    : listOfWords("titleCase");

  const wordsToCheck =
    (titleCase === true || titleCase) && excludeWordsList
      ? excludeWordsList.concat(titleArray)
    : titleCase || (titleCase === true && !excludeWordsList)
      ? titleArray
    : false;
  
  // Loop through words array to check and exclude in capitalization
  for (let i = 0; i < arr.length; i++) {
    const word = arr[i].toLowerCase();
    // Need to make override list work, add list of words to capitalize all letters, and more...
    if (checkType(word[i], 'number')) {
      capsArr.push(word);
      continue;
    }

    if 
      ((i !== 0 && titleCase === true && checkForWords(word, wordsToCheck, true))
      || (titleCase === false && excludeWordsList && checkForWords(word, excludeWordsList, true) === true)
      || (i !== 0 && titleCase === true && excludeWordsList && checkForWords(word, wordsToCheck, true) === true) )
        { capsArr.push(word); }
    else
      { capsArr.push(capitalizeWord(word)); }
  }

  // If capitalized words array worked then the new output is a new string from 'capsArr'
    const output = capsArr ? capsArr.join(" ") : false;
  // Return the new string if it exists
    return output !== false ? output : capitalizeWord(input);
}

// TITLE CASE
// Capitalizes the first letter in the words of a string
export const titleCase = (input, excludeWordsList, overrideList) => {
  return capitalizeWords(input, true, excludeWordsList, overrideList);
}


///////////////////////
// COMPARE & SHUFFLE //
///////////////////////

// "THE COMPARE FUNCTION"
export const compare = (a, b, reverse, randomize) => {
  if(randomize) { return (0.5 - Math.random()) }
  else { return reverse ? (b - a) : (a - b) }
}

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


// RETURN ONE ELEMENT FROM AN ARRAY OF ARRAYS
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

// PERFECT NUMBER SHUFFLE (aka "Fisher Yates Shuffle")
export const shuffleNumbers = (numArr) => {
  for (let i = numArr.length -1; i > 0; i--) {
    let j = Math.floor(Math.random() * i)
    let k = numArr[i]
    numArr[i] = numArr[j]
    numArr[j] = k
  }
  return numArr;
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


/////////////////////
// SORT & ORGANIZE //
/////////////////////

// ARRANGE NUMBERS  (Organize numbers in order lowest to highest or highest to lowest)
export const arrangeNumbers = (numArr, reverse) => {
  return numArr.sort(compare(a, b, reverse));
}

// SIMPLE MAP FUNCTION
// export const simpleMap = (items, classes, tag) => {
//   const elType = tag.toLowerCase()
//   return items.map((item, index) => {
//     switch(elType) {
//       case "div":
//         <div className={classes} key={index}>{item}</div>
//         break;
//       case "span":
//         <span className={classes} key={index}>{item}</span>
//         break;
//     }
//   })
// }

// SIMPLE MAP FUNCTION (From an array of items)
export const simpleMap = (items, classes, tag) => {
  const elType = tag ? tag.toLowerCase() : div;
  return items.map((item, index) => {
    tag
      ? `<${elType} className=${classes} key=${index}>${item}</${elType}>`
      : <div className={classes} key={index}>{item}</div>
  })
}

// USE AN ARRAY OF OBJECTS TO SPECIFY UNIQUE TAGS AND/OR CLASSES IN MAP FUNCTION
export const complexMap = (itemsArray) => {
  return itemsArray.map((item, index) => {
    `<${item.tag.toLowerCase()} className=${item.classes} key=${index}>${item.content}</${item.tag.toLowerCase()}>`
  })
}

export const reverseArr = (input) => {
  var ret = new Array;
  if(input){
      for(var i = input.length-1; i >= 0; i--) {
        ret.push(input[i]);
    }
  }
  return ret;
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