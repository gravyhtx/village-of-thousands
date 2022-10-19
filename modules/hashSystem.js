import CryptoJS from "crypto-js";

export const hash = (string, action) => {

  let key = process.env.CRYPTO_SECRET_KEY || "12345678901234567890123456789012";
  key = CryptoJS.enc.Utf8.parse(key);
  
  let iv = process.env.CRYPTO_SECRET_IV || "1234567890123456";
  iv = CryptoJS.enc.Utf8.parse(iv);

  let encrypted = CryptoJS.AES.encrypt(string, key, { iv: iv });
  encrypted = action === "encrypt" ? encrypted.toString() : '';

  let decrypted = CryptoJS.AES.decrypt(string, key, { iv: iv });
  decrypted = action === "decrypt" ? decrypted.toString(CryptoJS.enc.Utf8) : '';

  return action === "decrypt" ? decrypted : encrypted;
}

export const shortenHash = (s) => {
  for (var h = 0, i = 0; i < s.length; h &= h)
    h = 31 * h + s.charCodeAt(i++);
  return h;
}

export const simpleHash = (str, lowercase) => {
  lowercase = lowercase === true ? true : false;
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash &= hash; // Convert to 32bit integer
  }
  const output = new Uint32Array([hash])[0].toString(36);
  return lowercase ? output : output.toUpperCase();
};


export const generateUID = () => {
  // I generate the UID from two parts here 
  // to ensure the random number provide enough bits.
  var firstPart = (Math.random() * 46656) | 0;
  var secondPart = (Math.random() * 46656) | 0;
  firstPart = ("000" + firstPart.toString(36)).slice(-3);
  secondPart = ("000" + secondPart.toString(36)).slice(-3);
  return firstPart + secondPart;
}