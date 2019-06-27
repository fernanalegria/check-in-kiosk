import * as types from './types';
import { getUser } from '../../../../server/api';

const setAuthedUser = user => ({
  type: types.SET_AUTHED_USER,
  user
});

const unsetAuthedUser = () => ({
  type: types.UNSET_AUTHED_USER
});

export const handleSetAuthedUser = (username, password) => dispatch => {
  return getUser(username, password).then(user => {
    dispatch(setAuthedUser(user));
  });
};

export const handleUnsetAuthedUser = () => dispatch => {
  dispatch(unsetAuthedUser());
  return Promise.resolve();
};
