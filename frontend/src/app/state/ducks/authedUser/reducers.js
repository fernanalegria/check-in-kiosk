import * as types from './types';
import { createReducer } from '../../utils';

export default createReducer(null)({
  [types.RECEIVE_USER]: (state, action) => action.user,
  [types.UNSET_AUTHED_USER]: () => null
});
