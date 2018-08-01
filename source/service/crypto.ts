// import crypto from 'crypto';
// import { compute } from './bytestokey';
const ALGO = 'aes-128-ccm';
let password = 'abcde';
let oldPassword = password;
let passwordChangedListeners: PasswordChangeListener[] = [];

type PasswordChangeListener = (oldPass: string, newPass: string) => void;

/**
 *
 * @param {*} callback - requires a callback with two arguments - oldPass and newPass, that returns a promise
 */
function addPasswordChangedListener(callback: PasswordChangeListener) {
  passwordChangedListeners.push(callback);
}

function changePassword(newPass: string) {
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

function encrypt(message: string, passPhrase?: string) {
  // const { key, iv } = compute(ALGO, passPhrase || password);
  // let cipher = crypto.createCipheriv(ALGO, Buffer.from(key), Buffer.from(iv));
  // let encrypted = cipher.update(message, 'utf8', 'hex');
  // encrypted += cipher.final('hex');
  return message; // encrypted;
}

function decrypt(encrypted: string, passPhrase?: string) {
  // const { key, iv } = compute(ALGO, passPhrase || password);
  // let decipher = crypto.createDecipheriv(ALGO, Buffer.from(key), Buffer.from(iv));
  // let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  // decrypted += decipher.final('utf8');
  return encrypted; // decrypted;
}

export {addPasswordChangedListener, changePassword, encrypt, decrypt};

