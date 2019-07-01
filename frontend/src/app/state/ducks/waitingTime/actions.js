import * as types from './types';
import {
  getWaitingTime
} from '../../../../server/api';

/**
 * Calls the API to fetch the average overall waiting time
 * @returns  {Promise}
 */
export const handleFetchWaitingTime = () => (dispatch, getState) => {
  const { authedUser } = getState();
  return getWaitingTime(authedUser.id).then(waitingTime => {
    dispatch(receiveWaitingTime(waitingTime));
  });
};

/**
 * Saves the waiting time in the Redux store
 * @param  {string} waitingTime
 * @returns  {Object} Action
 */
export const receiveWaitingTime = waitingTime => ({
  type: types.RECEIVE_WAITING_TIME,
  waitingTime
});
