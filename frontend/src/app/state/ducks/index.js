import { combineReducers } from 'redux';
import { default as authedUser, authedUserActions } from './authedUser';
import { default as appointments, appointmentActions } from './appointments';
import { default as waitingTime, waitingTimeActions } from './waitingTime';
import { default as cities, cityActions } from './cities';
import { default as states, stateActions } from './states';
import { commonActions } from './common';
import { loadingBarReducer as loadingBar } from 'react-redux-loading';

export default combineReducers({
  authedUser,
  appointments,
  waitingTime,
  cities,
  states,
  loadingBar
});

export {
  authedUserActions,
  appointmentActions,
  waitingTimeActions,
  cityActions,
  stateActions,
  commonActions
};
