import { combineReducers } from 'redux';
import { default as authedUser, authedUserActions } from './authedUser';
import { default as appointments, appointmentActions } from './appointments';
import { loadingBarReducer as loadingBar } from 'react-redux-loading';

export default combineReducers({
  authedUser,
  appointments,
  loadingBar
});

export { authedUserActions, appointmentActions };
