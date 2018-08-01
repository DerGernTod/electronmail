import { find, getDb, insert, remove, update } from './nedb';
import { NodemailAccount } from '@/typings';
let db = getDb('accounts');
function findAccount(id: number) {
  return find<NodemailAccount>(db, {id}).then(accounts => Promise.resolve(accounts[0]));
}

function findAllAccounts() {
  return find<NodemailAccount>(db);
}

function addAccount(account: NodemailAccount) {
  return insert(db, account).then(account => account.id);
}

function deleteAccount(accountId: number) {
  return remove(db, {id : accountId});
}

function updateAccount(account: NodemailAccount) {
  return update(db, {id : account.id}, account);
}

export default findAccount;
export { findAllAccounts, findAccount, addAccount, deleteAccount, updateAccount };
