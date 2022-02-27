import { useState, useEffect } from "react";
/////////////////////////////
// RANDOMIZATION FUNCTIONS //
/////////////////////////////

// import { useState } from "react";

// RANDOMIZE (Math.Random shortcut)
export const randomize = (num) => {
  return Math.floor(Math.random() * num);
}

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
    console.warn("Please choose an array size between 1-1024. Array size has been set to "+numberClamp(arraySize,1,1024)+".")
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

// SHUFFLE [ARRAY]
export const shuffleArray = (arr) => {
  // Get number of indexes to replace
  let index = arr.length;
  let randomIndex;
  while (index !== 0) {
    // Randomly choose from available elements.
    randomIndex = randomize(index);
    index--;
    // Replace current index with random element.
    [arr[index], arr[randomIndex]] =
    [arr[randomIndex], arr[index]];
  }
  return arr;
}

// SHUFFLE [STRING]
export const shuffleString = (str) => { // Randomizes character order of a string
  const arr = str.split('');
  str = shuffleArray(arr);
  const output = str.join('');
  return output;
}

// COMPARE [OBJECTS]
export const compareObjects = (objA, objB) => {
  // Get number of items in each object
  const aLength = Object.keys(objA).length;
  const bLength = Object.keys(objB).length;
  // Get "smaller" number, set the other as "larger" number
  const sm = aLength < bLength ? objA : objB;
  const lg = sm === objA ? objB : objA;
  // Check all objects for any matches in key/value pairs
  const count = Object.keys(sm).reduce((acc, val) => {
    if(Object.keys(lg).includes(val)){
      if(lg[val] === sm[val]){
        return ++acc;
      }};
      return acc;
  }, 0); // << let 'acc' increment from '0'
  return (count / Math.min(aLength, bLength)) * 100;
};