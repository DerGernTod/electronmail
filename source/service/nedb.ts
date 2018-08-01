import * as DataStore from 'nedb';
import * as crypto from './crypto';
import * as file from './filesystem';
import { NodemailUserSettings } from '@/typings';
const USR_DATA = 'electronmail_usr_data';
const DEFAULT_USER = {
  dbpass: 'abcde'
};
function createDataStore(filename: string) {
  return new DataStore({
    filename,
    afterSerialization: line => crypto.encrypt(line),
    beforeDeserialization: line => crypto.decrypt(line)
  });
}

interface Databases {
  [key: string]: DataStore;
}

let databases: Databases = {
  mails: createDataStore('data/mails.db'),
  contacts: createDataStore('data/contacts.db'),
  calendars: createDataStore('data/calendars.db'),
  user: new DataStore({
    filename: 'data/user.db',
    afterSerialization: line => crypto.encrypt(line, USR_DATA),
    beforeDeserialization: line => crypto.decrypt(line, USR_DATA)
  }),
  accounts: createDataStore('data/accounts.db')
};

//first, initialize user db to get db encryption
databases.user.loadDatabase(err => err && console.warn('nedb error when loading user db', err));
find<NodemailUserSettings>(databases.user, {})
    .then(result => {
      if (result.length) {
        crypto.changePassword(result[0].dbpass);
        return Promise.resolve(result[0]);
      } else {
        return insert(databases.user, DEFAULT_USER);
      }
    })
    .then(userResult => {
      console.log('initializing database with user ', userResult);
      init();
      console.log('initialization done');
    })
    .catch(error => console.warn(error));

function init() {
  for (let dbName in databases) {
    if (dbName != 'user' && databases.hasOwnProperty(dbName)) {
      databases[dbName].loadDatabase(err => err && console.warn(`nedb error when loading ${dbName} db`, err));
    }
  }

  let testDocument = {
    hello: 'world',
    n: 5,
    today: new Date(),
    nedbIsAwesome: true,
    notthere: null,
    notToBeSaved: undefined // Will not be saved
            ,
    fruits: ['apple', 'orange', 'pear'],
    infos: { name: 'nedb' }
  };

  insert(databases.mails, testDocument)
        .then((newDoc) => console.log('document created', newDoc))
        .catch(error => console.error(error));

  find(databases.mails, { n: 5 })
        .then(docs => console.log('got documents', docs))
        .catch(error => console.warn('couldn\'t get docs', error));

  crypto.addPasswordChangedListener((oldPass: string, newPass: string) => {
    let curPromise;
    //don't use promise.all here, otherwise file access is screwed up if stuff is going to be reverted
    for (let dbName in databases) {
      if (dbName != 'user' && databases.hasOwnProperty(dbName)) {
        if (!curPromise) {
          curPromise = changeDbPassword(dbName, oldPass, newPass);
        } else {
          curPromise = curPromise.then(() => changeDbPassword(dbName, oldPass, newPass));
        }
      }
    }
    curPromise!
    .catch(err => {
      console.warn('Reverting password changes because an error occurred', err);
      let promises = [];
      for (let dbName in databases) {
        if (databases.hasOwnProperty(dbName) && dbName != 'user') {
          promises.push(revertPasswordChange(dbName));
        }
      }
      return Promise
        .all(promises)
        .then(err => Promise.reject(err));
    })
    .then(() => update(databases.user, {}, { $set: { dbpass: newPass } }))
    .then(() => {
      let promises = [];
      for (let dbName in databases) {
        if (databases.hasOwnProperty(dbName) && dbName != 'user') {
          promises.push(file.remove(`data/${dbName}_new.db`));
          promises.push(file.remove(`data/${dbName}.db_`));
        }
      }
      return Promise.all(promises);
    });
  });
}

function revertPasswordChange(db: keyof typeof databases, oldPass?: string) {
  console.log('reverting password change for db ' + db);
  let dbPath = `data/${db}.db`;
  let dbBackupPath = `data/${db}.db_`;
  let dbNewPath = `data/${db}_new.db`;
  return file.exists(dbBackupPath).then<Promise<any>>(exists => {
    console.log('File exists result: ', exists);
    if (exists) {
      return file.remove(dbPath)
        .then(() => file.copy(dbBackupPath, dbPath))
        .then(() => file.remove(dbBackupPath));
    }
    return Promise.resolve();
  })
  .then(() => file.exists(dbNewPath))
  .then(exists => exists && file.remove(dbNewPath))
  .then(() => {
    databases[db] = new DataStore({
      filename: dbPath,
      afterSerialization: line => crypto.encrypt(line, oldPass),
      beforeDeserialization: line => crypto.decrypt(line, oldPass)
    });
    databases[db].loadDatabase(err => err && console.error(err));
  });
}

function changeDbPassword(db:keyof typeof databases, oldPass: string, newPass: string) {
  let dataBase = databases[db];
  let dbPath = `data/${db}.db`;
  let dbBackupPath = `data/${db}.db_`;
  let dbNewPath = `data/${db}_new.db`;
  return find(dataBase, {})
  .then(results => {
    let newDb = new DataStore({
      filename: dbNewPath,
      afterSerialization: line => crypto.encrypt(line, newPass),
      beforeDeserialization: line => crypto.decrypt(line, newPass)
    });
    return new Promise((resolve, reject) => {
      newDb.loadDatabase(err => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    }).then(() => insert(newDb, results));
  })
  .then(() => file.copy(dbPath, dbBackupPath))
  .then(() => file.remove(dbPath))
  .then(() => file.copy(dbNewPath, dbPath))
  .then(() => {
    console.log('starting new data store for ' + db);
    let newDb = new DataStore({
      filename: dbPath,
      afterSerialization: line => crypto.encrypt(line, newPass),
      beforeDeserialization: line => crypto.decrypt(line, newPass)
    });
    return new Promise<void>((resolve, reject) => {
      newDb.loadDatabase(err => {
        if (err) {
          reject(err);
        } else {
          databases[db] = newDb;
          resolve();
        }
      });
    });
  });
}

function insert<T>(db: DataStore, args: T) {
  console.log('insert db entry', args);
  return new Promise<T>((resolve, reject) => {
    db.insert(args, (err, newDoc) => {
      if (err) {
        reject(err);
      } else {
        resolve(newDoc);
      }
    });
  });
}

function find<T>(db: DataStore, args?: any): Promise<T[]> {
  console.log('find db entries', args, db);
  return new Promise<T[]>((resolve, reject) => {
    db.find(args || {}, (err: Error, docs: T[]) => {
      console.log('received', err, docs);
      if (err) {
        reject(err);
      } else {
        resolve(docs);
      }
    });
  });
}

function update(db: DataStore, query: any, update: any, args?: any) {
  console.log('update db entries', query, update, args, db);
  return new Promise<number>((resolve, reject) => {
    db.update(query, update, args || {}, (err, numReplaced) => {
      if (err) {
        reject(err);
      } else {
        resolve(numReplaced);
      }
    });
  });
}

function remove(db: DataStore, query: any, args?: any) {
  console.log('remove db entries', query, args, db);
  return new Promise<number>((resolve, reject) => {
    db.remove(query, args || {}, (err, numRemoved) => {
      if (err) {
        reject(err);
      } else {
        resolve(numRemoved);
      }
    });
  });
}

function getDb(dbName: keyof typeof databases) {
  return databases[dbName];
}

function get(something: any, db: DataStore) {
  db.find(something);
}

function findMails(args: any) {
  return find(databases.mails, args || {});
}


export { get, insert, find, findMails, getDb, update, remove };
