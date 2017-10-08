import crypto from 'crypto';
const ALGO = 'aes-256-ctr';
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

function encrypt(message, pass) {
  let cipher = crypto.createCipher(ALGO, pass || password);
  let encrypted = cipher.update(message, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

function decrypt(encrypted, pass) {
  let decipher = crypto.createDecipher(ALGO, pass || password);
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

export {addPasswordChangedListener, changePassword, encrypt, decrypt};

