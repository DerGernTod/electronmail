import fs from 'fs';
import path from 'path';
//returns true or false if a file exists, or rejects on error (other than ENOENT)
function exists(file) {
  return new Promise((resolve, reject) => {
    fs.stat(file, (err, stat) => {
      if (err) {
        if (err.code == 'ENOENT') {
          resolve(false);
        } else {
          reject(err);
        }
      } else {
        resolve(true);
      }
    });
  });
}

function copy(oldFile, newFile) {
  
  return new Promise((resolve, reject) => {
    console.log('copy from to', oldFile, newFile);
    var rd = fs.createReadStream(oldFile);
    rd.on('error', err => reject(`Couldn't read file ${oldFile}:  + ${err}`));
    var wr = fs.createWriteStream(newFile);
    wr.on('error', err => reject(`Couldn't write file ${newFile}:  + ${err}`));
    wr.on('close', ex => {
      if (ex) {
        reject('Error closing file operation: ' + newFile + ' - ' + ex);
      } else {
        resolve();
      }
    });
    rd.pipe(wr);

  });
}

function remove(file) {
  return new Promise((resolve, reject) => {
    fs.unlink(file, (err) => {
      console.log('remove file completed', file, err);
      if (err) {
        reject('file ' + file + 'couldn\'t be removed: ' + err);
      } else {
        resolve();
      }
    });
  });
}

export {copy, remove, exists};