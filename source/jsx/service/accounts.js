import { findAccounts } from './nedb';

function findAccount(id) {
  return findAccounts({id});
}

function findAllAccounts() {
  return findAccounts();
}

export default findAccount;
export {findAllAccounts};