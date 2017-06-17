import { find, getDb, insert, remove, update } from './nedb';
let db = getDb('accounts');
function findAccount(id) {
  return find(db, {id}).then(accounts => Promise.resolve(accounts[0]));
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

function updateAccount(account) {
  return update(db, {id : account.id}, account);
}

export default findAccount;
export { findAllAccounts, findAccount, addAccount, deleteAccount, updateAccount };
