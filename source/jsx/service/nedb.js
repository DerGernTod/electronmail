import DataStore from 'nedb';
import * as crypto from './crypto';
import * as file from './filesystem';
const USR_DATA = 'electronmail_usr_data';
const DEFAULT_USER = {
  dbpass: 'abcde'
};
let databases = {
  mails: new DataStore({
    filename: 'data/mails.db',
    afterSerialization: line => crypto.encrypt(line),
    beforeDeserialization: line => crypto.decrypt(line)
  }),
  contacts: new DataStore({
    filename: 'data/contacts.db',
    afterSerialization: line => crypto.encrypt(line),
    beforeDeserialization: line => crypto.decrypt(line)
  }),
  calendars: new DataStore({
    filename: 'data/calendars.db',
    afterSerialization: line => crypto.encrypt(line),
    beforeDeserialization: line => crypto.decrypt(line)
  }),
  user: new DataStore({
    filename: 'data/user.db',
    afterSerialization: line => crypto.encrypt(line, USR_DATA),
    beforeDeserialization: line => crypto.decrypt(line, USR_DATA)
  })
};

//first, initialize user db to get db encryption
databases.user.loadDatabase(err => err && console.warn('nedb error when loading user db', err));
find(databases.user, {})
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
  databases.mails.loadDatabase(err => err && console.warn('nedb error when loading mails db', err));
  databases.contacts.loadDatabase(err => err && console.warn('nedb error when loading contacts db', err));
  databases.calendars.loadDatabase(err => err && console.warn('nedb error when loading calendars db', err));

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

  crypto.addPasswordChangedListener((oldPass, newPass) => {
        //don't use promise.all here, otherwise file access is screwed up if stuff is going to be reverted
    changeDbPassword('contacts', oldPass, newPass)
            .then(() => changeDbPassword('mails', oldPass, newPass))
            .then(() => changeDbPassword('calendars', oldPass, newPass))
            .catch(err => {
              console.warn('Reverting password changes because an error occurred', err);
              return Promise
                    .all([
                      revertPasswordChange('contacts', oldPass),
                      revertPasswordChange('mails', oldPass),
                      revertPasswordChange('calendars', oldPass)
                    ])
                    .then(err => Promise.reject(err));
            })
            .then(() => update(databases.user, {}, { $set: { dbpass: newPass } }))
            .then(() => Promise.all([
              file.remove('data/calendars_new.db'),
              file.remove('data/calendars.db_'),
              file.remove('data/contacts_new.db'),
              file.remove('data/contacts.db_'),
              file.remove('data/mails_new.db'),
              file.remove('data/mails.db_')
            ]));
  });
}

function revertPasswordChange(db, oldPass) {
  console.log('reverting password change for db ' + db);
  let dbPath = `data/${db}.db`;
  let dbBackupPath = `data/${db}.db_`;
  let dbNewPath = `data/${db}_new.db`;
  return file.exists(dbBackupPath).then(exists => {
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

function changeDbPassword(db, oldPass, newPass) {
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
          return new Promise((resolve, reject) => {
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

function insert(db, args) {
  console.log('insert db entry', args);
  return new Promise((resolve, reject) => {
    db.insert(args, (err, newDoc) => {
      if (err) {
        reject(err);
      } else {
        resolve(newDoc);
      }
    });
  });
}

function find(db, args) {
  console.log('find db entries', args, db);
  return new Promise((resolve, reject) => {
    db.find(args, (err, docs) => {
      console.log('received', err, docs);
      if (err) {
        reject(err);
      } else {
        resolve(docs);
      }
    });
  });
}

function update(db, query, update, settings) {
  console.log('update db entries', query, update, settings, db);
  return new Promise((resolve, reject) => {
    db.update(query, update, settings || {}, (err, numReplaced) => {
      if (err) {
        reject(err);
      } else {
        resolve(numReplaced);
      }
    });
  });
}

function get(something, db) {
  db.find(something);
}

function findMails(args) {
  return find(databases.mails, args || {});
}

export {get, insert, find, findMails };