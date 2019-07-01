import * as types from './types';
import { createReducer } from '../../utils';

export default createReducer({})({
  [types.RECEIVE_STATES]: (state, action) => action.states
});
