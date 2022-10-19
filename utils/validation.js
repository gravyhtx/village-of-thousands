// CHECK ELEMENT TYPES
// Uses various methods to check if the given 'element' matches a 'type' (string)
export const checkTypeof = (variable, type) => {
  // Set Output
  let output;

  // Convert type to lowercase
  type = type ? type.toLowerCase().trim() : undefined;

  // Perform checks...
  output =
      type && (type === "arrays" || type === "arrayofarrays" || type === "array_of_arrays" || type === "multiarray"
      || type === "multi_array" || type === "multiple_arrays" || type === "multiplearrays")
      && Array.isArray(variable) && variable.length && variable[0].length ?
      output = {is: true, type: "arrays"}
      
    : type && type === "array" && Array.isArray(variable) ?
      output = {is: true, type: "array"}

    : type && type !== "array" && Array.isArray(variable) ?
      output = {is: false, type: "array"}

    : type && type === "function" && (typeof variable === "function" || variable instanceof Function) ?
      output = {is: true, type: "function"}
    
    : type && type !== "function" && (typeof variable === "function" || variable instanceof Function) ?
      output = {is: false, type: "function"}
    
    : (type && type === "regex" && variable instanceof RegExp) ?
      output = {is: true, type: "regex"}

    : (type && type !== "regex" && variable instanceof RegExp) ?
      output = {is: false, type: "regex"}

    : type && type === 'number' && typeof type === 'number' && !Number.isNaN(variable) ?
      output = {is: true, type: "number"}

    : type && type !== 'number' && typeof type === 'number' && !Number.isNaN(variable) ?
      output = {is: false, type: "number"}

    : type && type === 'string' && type !== 'object' && typeof variable === 'string' ?
      output = {is: true, type: 'string'}
    
    : type && type === "node" && typeof variable === "object" && typeof variable.nodeType === "number"
      && typeof variable.nodeName==="string" ?
      
      output = {is: true, type: "node"}

    : type && type === "null" && variable === null ?

      output = {is: true, type: "null"}

    : type && type !== "null" && variable === null ?

      output = {is: false, type: "null"}
    
    : type && type === "element" && (React.isValidElement(variable) ||
      (typeof variable !== "object" && variable !== null
      && variable.nodeType === 1 && typeof variable.nodeName==="string")) ?

      output = {is: true, type: "element"}

    : type && type === 'image' && typeof variable === 'object' && "type" in variable && variable.type === 'img' ?
      output = {is: true, type: 'image'}

    : type && type !== 'image' && type !== 'object' && typeof variable === 'object' && variable !== null
      && "type" in variable && (variable.type === 'img' || variable.type.name === 'Image') ?
      output = {is: false, type: 'image'}
      
    : type && typeof variable === type ?
      output = {is: true, type: typeof variable}
      
    : type && typeof variable !== type ?
      output = {is: false, type: typeof variable}
    
    : output = {is: undefined, type: typeof variable}

  return output;

}

// Types:
//   Array = "array"
//   Undefined = "undefined"
//   Null =	"object" (reason)
//   Boolean = "boolean"
//   Number = "number"
//   BigInt = "bigint"
//   String = "string"
//   Symbol = "symbol"
//   Function = "function" (implements [[Call]] in ECMA-262 terms; classes are functions as well)
//   DOM Element = "element"
//   DOM Node = "node"
//   Any other object = "object"

// CHECK VARIABLE TYPES -- SHORTCUT!!!
export const checkType = (variable, type) => {
  variable = !variable ? false : variable;
  type = !type ? false : type;
  //  'Type' shortcuts
  if(type === 's' || type === 'str') {
    type = 'string'
  }
  if(type === 'o' || type === 'obj') {
    type = 'object'
  }
  if(type === 'a' || type === 'arr') {
    type = 'array'
  }
  if(type === 'multiarr' || type === 'arrs') {
    type = 'arrays'
  }
  if(type === 'int') {
    type = 'bigint'
  }
  if(type === 'f' || type === 'fun' || type === 'func') {
    type = 'function'
  }
  if(type === 'b' || type === 'bool') {
    type = 'boolean'
  }
  if(type === 'n' || type === 'num') {
    type = 'boolean'
  }
  if(type === 'sym') {
    type = 'symbol'
  }
  if(type === 'u' || type === 'und' || type === 'ud') {
    type = 'undefined'
  }
  if(type === 'e' || type === 'el') {
    type = 'element'
  }
  if(type === 'img') {
    type = 'image'
  }

  return type !== false && variable !== false
    ? checkTypeof(variable, type).is
  : type === false && variable !== false
    ? checkTypeof(variable)
  : type === false && variable === false
    ? null
    : null;
}

// VALIDATE EMAIL ADDRESSES
export const validateEmail = (email) => {
  const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const successMessage = "Email is valid."

  let errors = [];

  const errorMessage = errors.length > 0 ? errors.join(' ') : "";

  if (!email.match(emailFormat)) {
    errors.push("Please enter a valid email address.")
  }

  if (!errors.length && email.match(emailFormat)) {
    return { is: true, msg: successMessage }
  } else {
    return { is: false, msg: errorMessage }
  }
}

// VALIDATE PASSWORDS
export const validatePassword = (password, reEnterPassword, passwordMatch, complexPassword, specialCharacters,
  min, max, consecutiveLimit) => {

  // Determine if user must re-enter passwords. Defaults to 'false'.
  passwordMatch = passwordMatch === true ? true : false;
  // Determine if it must be a complex password. Defaults 'false'.
  complexPassword = complexPassword === true ? complexPassword : false;

  // MIN & MAX DO NOT WORK RIGHT NOW
  min = min ? min : 6;
  max = max ? max : 20;

  consecutiveLimit = checkType(Number(consecutiveLimit), 'number') && Number(consecutiveLimit) > 1 ?
    Number(consecutiveLimit) : 2;

  // No white space
  const pwFormatSpaces = /^\S*$/;
  // 6 to 20 characters with at least one numeric digit, one uppercase an one lowercase letter
  const pwFormat = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/;
  // const pwFormat = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
  // Special characters
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  
  let errors = [];
  let successMessage = "Password is valid!"

  // let pwStrength = useRef(0);

  if (passwordMatch === true && password !== reEnterPassword) {
    errors.push("Password fields do not match.");
  }

  if (complexPassword === false && (password.length < min || password.length > max
    || (passwordMatch && reEnterPassword.length < min)
    || (passwordMatch && reEnterPassword.length > max))) {
    errors.push(`Password must be between ${min} to ${max} characters.`);
  }
  
  if (complexPassword
    && ((pwFormat.test(password) === false || (passwordMatch && pwFormat.test(reEnterPassword) === false))
    || (password.length < min || password.length > max)
    || (passwordMatch && reEnterPassword.length < min)
    || (passwordMatch && reEnterPassword.length > max))) {
    errors.push(`Password must be between 6 to 20 characters with at least one numeric digit, one uppercase,
                 and one lowercase letter.`);
  }

  if (specialCharacters === true
    && (specialChars.test(password) === false
    || (passwordMatch && specialChars.test(reEnterPassword) === false))) {
    errors.push("Must have at least one special character.");
  }

  if (pwFormatSpaces.test(password) === false
    || (passwordMatch && pwFormatSpaces.test(reEnterPassword) === false)) {
    errors.push("Password cannot contain spaces.");
  }

  if (consecutiveChars(password, consecutiveLimit) === true
    || (passwordMatch && consecutiveChars(reEnterPassword, consecutiveLimit) === true)) {
    errors.push(`Password cannot have the same character repeated more than ${consecutiveLimit} times.`);
  }
  errors = errors ? errors.join(' ').replace(/\s+/g, ' ').trim() : '';
  
  if (errors.length) {
    return { is: false, pw: undefined, msg: errors }
  } else {
    return { is: true, pw: password, msg: successMessage }
  }
}

export const passwordsMatch = (password, reEnterPassword) => {

  const errorMessage = "Password fields do not match.";
  const successMessage = "Password fields match.";

  if (password !== reEnterPassword) {
    return { is: false, pw: password, msg: errorMessage }
  } else {
    return { is: true, pw: password, msg: successMessage }
  }
}


export const validPhoneNumber = (phoneNumber) => {
  const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
  return regex.test(phoneNumber);
}

// CAPTCHA VALIDATION -- Building this system using hCAPCHA
// export const validateCaptcha = (captcha) => {};

// LEADING ZEROS
// const leadingZeros = (number, total, places) => {
//   let zeros;
//   // Get placeholder number from places
//   if (checkType(places, 'number')) {
//     zeros = !total && places ? places : 1;
//   }
//   // Add zero placeholder from total if no places
//     else if (total > 100) { zeros = 2;
//   } else if (total > 1000) { zeros = 3;
//   } else if (total > 10000) { zeros = 4;
//   } else if (total > 100000) { zeros = 5;
//   } else if (total > 1000000) { zeros = 6;
//   }

// }

// CHECK FOR CONSECUTIVE CHARACTERS
//  Default max consecutive characters is 2 in a row -- 3+ returns 'true'
export const consecutiveChars = (string, checkCasing, limit) => {

  string = checkCasing === false ? string : string.toLowerCase();  
  //  If 'checkCasing' is false then repeats of the same character in
  //  different cases will be ignored. Defaults to 'true'.

  limit = checkType(Number(limit), 'number') && limit > 0 ? Number(limit) : 2;
  //   Limit must be at least 1
  const pattern = checkCasing === false ? /([a-zA-Z0-9])\1+/g : /([a-z0-9])\1+/g; 
  const matches = string.match(pattern);

  if(string && matches) {
    for(let i = 0; i < matches.length; i++) {
      let split = matches[i].split('');
      if(split.length && split.length > limit) {
        return true;
      }
    }
  }

  return false;
}


export const fileName = (string) => {
  let str = '';

  if(string !== undefined && checkType(string, 'string')) {
    str = str.replace(/\s+/g, ' ').trim().toLowerCase();
  }
  return str ? str.replace(/ /g, "_").replace(/[^a-z0-9_]/gmi, "-") : string;
}


// CHECK STRING FOR WORDS
export const checkForWords = (string, wordsList, booleanOutput) => {
  let isTrue = false;
  // Use an array with a list of words to check string for instances
  const checks = wordsList ? string.match( new RegExp("\\b(" + wordsList.join('|') + ")\\b", "ig") ) : undefined;

  // Check if string is included in "Words List"
  isTrue = wordsList ? wordsList.includes(string) : false;

  return booleanOutput === true || !checks ? isTrue : checks;
}

// It's just a bunch of useful words...
export const listOfWords = (type) => {
  // (Well, it will be.)
  type = fileName(type);

  // TITLECASE WORDS
  // Used to check for non-capitalized words in titles
  const titleCase = [  // (See 'titleCase' function in 'generator.js')
    "a", "an", "and", "at", "but", "by", "to", "for", "is", "of", "the",
  ];
  const romanNumerals = [
    'i','ii','iii','iv','iiii','v','vii','viii','ix','viiii','x','xi','xii','xiii','xiv','xv','xvi','xvii','xviii','xix','xx',
    'xxi','xxii','xxiii','xxiv','xxv','xxvi','xxvii','xxviii','xxix','xxx',
  ];

  switch(type) {
    case 'title':
    case 'titlecase':
      return titleCase;
    case "numerals":
    case "romannumerals":
    case "roman_numerals":
      return romanNumerals;
  }
}



// IMPORT NEXT IMAGE OR SIZE TO CREATE PROPER WIDTH/HEIGHT OBJECTS
export const imageSizeObj = ( obj ) => {

  // Must be a Next image object, array of sizes, number, or string
  // Array -- [width, height] -- both must be numbers or strings
  //                          -- if one contains 'px', both must contain 'px' (will be removed)
  // String -- "100"/"100px"  -- must be number only or can have number + 'px' (will be be removed)
  let sizeObj;


  // Perform checks...

  if (obj.width && obj.height) {

    sizeObj = { width: obj.height, height: obj.width };
  
  } else if ((checkType(obj, 'number') && !checkType(obj, 'string'))
    || (checkType(obj, 'string') && !isNaN(obj))) {

    sizeObj = { width: Number(obj), height: Number(obj) };
    
  }  else if (checkType(obj, 'string') && !isNaN(obj)){

    sizeObj = { width: Number(obj), height: Number(obj) };
    
  } else if (!checkType(obj, 'array') && checkType(obj, 'string') && obj.toString().includes("px",1)) {

    let size = obj.replace('px','');
    sizeObj = { width: Number(size), height: Number(size) };
    
  } else if (checkType(obj, 'string')
    && !checkType(obj, 'array') && obj.toString().includes("px",1)) {

    sizeObj = { width: Number(obj.replace('px','')), height: Number(obj.replace('px','')) }
    
  } else if (checkType(obj, 'array')
  && !obj[0].toString().includes("px",1) && !obj[1].toString().includes("px",1)
  && checkType(obj[0], 'number') && checkType(obj[1], 'number')) {

    sizeObj = { width: Number(obj[0]), height: Number(obj[1]) }
    
  } else if (checkType(obj, 'array')
    &&  obj[0].toString().includes("px",1) && obj[1].toString().includes("px",1)) {

    sizeObj = { width: Number(obj[0].replace('px','')), height: Number(obj[1].replace('px','')) }
    
  } else if (checkType(obj, 'array')
    && checkType(obj[0], 'string') && !isNaN(obj[0])
    && checkType(obj[1], 'string') && !isNaN(obj[1])) {

    sizeObj = { width: Number(obj[0]), height: Number(obj[1]) }

  } else {
    
    return false;
    
  }
  
  return sizeObj;
}