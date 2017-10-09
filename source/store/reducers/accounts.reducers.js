import ActionTypes from '../actions/ActionTypes';
export default (state = {}, action) => {
  switch (action.type) {
  case ActionTypes.INIT_LOAD_ACCOUNTS:
    state = {
      ...state,
      loading: true
    };
    break;
  case ActionTypes.LOAD_ACCOUNTS_COMPLETE:
    state = {
      ...state,
      data: action.payload && action.payload.slice() || [],
      loading: false
    };
    break;
  }
  return state;
};
