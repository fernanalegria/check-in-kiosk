import * as types from './types';
import { createReducer } from '../../utils';

export default createReducer(null)({
  [types.RECEIVE_WAITING_TIME]: (state, action) =>
    action.waitingTime.waiting_time
});
