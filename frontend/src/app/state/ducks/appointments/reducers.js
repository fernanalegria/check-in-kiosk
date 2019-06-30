import * as types from './types';
import { createReducer } from '../../utils';
import { isToday, pick } from '../../../utils/helpers';

export default createReducer({})({
  [types.RECEIVE_APPOINTMENTS]: (state, action) => {
    const todaysAppointments = Object.keys(state).filter(id =>
      isToday(state[id].scheduled_time)
    );
    return {
      ...pick(state, ...todaysAppointments),
      ...action.appointments
    };
  },
  [types.UPDATE_STATUS]: (state, action) => ({
    ...state,
    [action.id]: {
      ...state[action.id],
      status: action.status 
    }
  })
});
