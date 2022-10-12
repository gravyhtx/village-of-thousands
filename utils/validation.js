import React from "react";
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
    return [true, successMessage]
  } else {
    return [false, errorMessage]
  }
}

// VALIDATE PASSWORDS
export const validatePassword = (password, passwordReEnter, complexPassword, min, max) => {

  complexPassword = complexPassword ? complexPassword : false;
  // MIN & MAX DO NOT WORK RIGHT NOW
  min = min ? min : 6;
  min = min ? min : 20;

  // No white space
  const pwFormatSpaces = /^\S*$/;

  // 6 to 20 characters with at least one numeric digit, one uppercase an one lowercase letter
  const pwFormat = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
  
  let errors = [];

  const successMessage = "Password is valid."
  const errorMessage = errors.length ? errors.join(' ') : '';

  if (!complexPassword && (password < min || password > max || (passwordReEnter && passwordReEnter < min) ||
     (passwordReEnter && passwordReEnter > max))) {
    errors.push(`Password must be between 6 to 20 characters.`);
  }

  if (complexPassword && !password.match(pwFormat)) {
    errors.push(`Password must be between 6 to 20 characters with at least one numeric digit, one uppercase,
                 and one lowercase letter.`);
  }

  if (!password.match(pwFormatSpaces)) {
    errors.push("Password cannot contain spaces.");
  }

  if (password !== passwordReEnter) {
    errors.push("Password fields do not match.");
  }

  if (!errors.length && passwordMatch) {
    return [true, password, successMessage]
  } else {
    return [false, password, errorMessage]
  }
}


// CHECK ELEMENT TYPES
// Uses various methods to check if the given 'element' matches a 'type' (string)
export const checkTypeof = (variable, type) => {
  // Set Output
  let output;

  // Convert type to lowercase
  type = type ? type.toLowerCase() : undefined;

  // Perform checks...
  output =
    type && type === "array" && Array.isArray(variable) ?
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

// CHECK VARIABLE TYPES -- SHORTCUT
export const checkType = (variable, type) => {

  //  'Type' shortcuts
  if(type === 'str') {
    type = 'string'
  }
  if(type === 'obj') {
    type = 'object'
  }
  if(type === 'arr') {
    type = 'array'
  }
  if(type === 'int') {
    type = 'bigint'
  }
  if(type === 'fun' || type === 'func') {
    type = 'function'
  }
  if(type === 'bool') {
    type = 'boolean'
  }
  if(type === 'n' || type === 'num') {
    type = 'boolean'
  }
  if(type === 'sym') {
    type = 'symbol'
  }
  if(type === 'u') {
    type = 'undefined'
  }
  if(type === 'el') {
    type = 'element'
  }
  if(type === 'img') {
    type = 'image'
  }

  return checkTypeof(variable, type).is;
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

  // TITLECASE WORDS
  // Used to check for non-capitalized words in titles
  const titleCase = [  // (See 'titleCase' function in 'generator.js')
    "a", "an", "and", "at", "but", "by", "to", "for", "is", "of", "the"
  ];

  if(type === "titleCase") {
    return titleCase;
  }
}