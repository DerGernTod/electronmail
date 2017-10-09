import ActionTypes from '../actions/ActionTypes';
export default (state = [], action) => {
  switch (action.type) {
  case ActionTypes.LOAD_MAILS:
    state = action.payload && action.payload.slice() || [];
    break;
  }
  return state;
};
