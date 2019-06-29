import { combineReducers } from 'redux';
import { default as authedUser } from './authedUser';
import { loadingBarReducer as loadingBar } from 'react-redux-loading';

export default combineReducers({
  authedUser,
  loadingBar
});
