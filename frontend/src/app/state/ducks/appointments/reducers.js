import * as types from './types';
import { createReducer } from '../../utils';

export default createReducer({})({
  [types.RECEIVE_APPOINTMENTS]: (state, action) => action.appointments,
  [types.UPDATE_STATUS]: (state, action) => ({
    ...state,
    [action.id]: {
      ...state[action.id],
      status: action.status
    }
  })
});
