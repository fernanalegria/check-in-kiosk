import * as types from './types';
import { createReducer } from '../../utils';

export default createReducer({})({
  [types.SET_AUTHED_USER]: (state, action) => action.user,
  [types.UNSET_AUTHED_USER]: () => {}
});
