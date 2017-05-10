import { find, getDb, insert, remove } from './nedb';
let db = getDb('accounts');
function findAccount(id) {
  return find(db, {id});
}

function findAllAccounts() {
  return find(db);
}

function addAccount(account) {
  return insert(db, account).then(account => account.id);
}

function deleteAccount(accountId) {
  return remove(db, {id : accountId});
}

export default findAccount;
export { findAllAccounts, findAccount, addAccount, deleteAccount };