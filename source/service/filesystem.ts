import { createReadStream, createWriteStream, unlink, stat } from 'fs';
//returns true or false if a file exists, or rejects on error (other than ENOENT)
function exists(file: string) {
  return new Promise((resolve, reject) => {
    stat(file, (err, stat) => {
      if (err) {
        if (err.code == 'ENOENT') {
          resolve(false);
        } else {
          reject(err);
        }
      } else {
        resolve(stat);
      }
    });
  });
}

function copy(oldFile: string, newFile: string) {

  return new Promise((resolve, reject) => {
    console.log('copy from to', oldFile, newFile);
    var rd = createReadStream(oldFile);
    rd.on('error', err => reject(`Couldn't read file ${oldFile}:  + ${err}`));
    var wr = createWriteStream(newFile);
    wr.on('error', err => reject(`Couldn't write file ${newFile}:  + ${err}`));
    wr.on('close', () => {
      resolve();
    });
    rd.pipe(wr);

  });
}

function remove(file: string) {
  return new Promise((resolve, reject) => {
    unlink(file, (err) => {
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
