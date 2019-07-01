import * as types from './types';
import { createReducer } from '../../utils';

export default createReducer({})({
  [types.RECEIVE_CITIES]: (state, action) => action.cities
});
