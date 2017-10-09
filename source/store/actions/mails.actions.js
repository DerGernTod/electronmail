import Constants from '../../constants';
import ActionTypes from './ActionTypes';
export function loadMails(accounts, folder) {
  return {
    type: ActionTypes.LOAD_MAILS,
    payload: Constants.MAILS
  };
  /*return dispatch => {

  };*/

}
