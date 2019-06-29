import * as types from './types';
import { getUser } from '../../../../server/api';
import { showLoading, hideLoading } from 'react-redux-loading';

/**
 * Calls the API to fetch the logged-in user and save it into the Redux store
 * @returns  {Promise}
 */
export const handleFetchUser = () => dispatch => {
  dispatch(showLoading('initial'));
  return getUser().then(user => {
    dispatch(receiveUser(user));
    dispatch(hideLoading('initial'));
  });
};

/**
 * Saves the logged-in user in the Redux store
 * @param  {Object} user
 * @returns  {Object} Action
 */
export const receiveUser = user => ({
  type: types.RECEIVE_USER,
  user
});

/**
 * Unsets the logged in user in the Redux store
 */
const unsetAuthedUser = () => ({
  type: types.UNSET_AUTHED_USER
});

/**
 * Handles the asynchronous user removal
 * @returns  {Promise}
 */
export const handleUnsetAuthedUser = () => dispatch => {
  dispatch(unsetAuthedUser());
  return Promise.resolve();
};
