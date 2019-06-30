import { combineReducers } from 'redux';
import { default as authedUser, authedUserActions } from './authedUser';
import { default as appointments, appointmentActions } from './appointments';
import { default as waitingTime, waitingTimeActions } from './waitingTime';
import { loadingBarReducer as loadingBar } from 'react-redux-loading';

export default combineReducers({
  authedUser,
  appointments,
  waitingTime,
  loadingBar
});

export { authedUserActions, appointmentActions, waitingTimeActions };
