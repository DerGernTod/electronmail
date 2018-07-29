import crypto from 'crypto';
import { compute } from './bytestokey';
const ALGO = 'aes-128-ccm';
let password = 'abcde';
let oldPassword = password;
let passwordChangedListeners = [];

/**
 *
 * @param {*} callback - requires a callback with two arguments - oldPass and newPass, that returns a promise
 */
function addPasswordChangedListener(callback) {
  passwordChangedListeners.push(callback);
}

function changePassword(newPass) {
  var oldPasswordBefore = oldPassword;
  oldPassword = password;
  return Promise
  .all(passwordChangedListeners.map(val => val(oldPassword, newPass)))
  .then(() => password = newPass)
  .catch(err => {
    oldPassword = oldPasswordBefore;
    console.error(err);
  });
}

function encrypt(message, passPhrase) {
  // const { key, iv } = compute(ALGO, passPhrase || password);
  // let cipher = crypto.createCipheriv(ALGO, Buffer.from(key), Buffer.from(iv));
  // let encrypted = cipher.update(message, 'utf8', 'hex');
  // encrypted += cipher.final('hex');
  return message; // encrypted;
}

function decrypt(encrypted, passPhrase) {
  // const { key, iv } = compute(ALGO, passPhrase || password);
  // let decipher = crypto.createDecipheriv(ALGO, Buffer.from(key), Buffer.from(iv));
  // let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  // decrypted += decipher.final('utf8');
  return encrypted; // decrypted;
}

export {addPasswordChangedListener, changePassword, encrypt, decrypt};

