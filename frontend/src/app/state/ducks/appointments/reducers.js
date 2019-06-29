import * as types from './types';
import { createReducer } from '../../utils';

export default createReducer({})({
  [types.RECEIVE_APPOINTMENTS]: (state, action) => ({
    ...state,
    ...action.appointments
  })
});
