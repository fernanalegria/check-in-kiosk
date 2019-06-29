import * as types from './types';
import { getAppointments } from '../../../../server/api';

/**
 * Calls the API to fetch today's appointments and saves them into the Redux store
 * @returns  {Promise}
 */
export const handleFetchAppointments = date => (dispatch, getState) => {
  const { authedUser } = getState();
  return getAppointments(date, authedUser.id).then(appointments => {
    dispatch(receiveAppointments(appointments));
  });
};

/**
 * Saves a list of appointments in the Redux store
 * @param  {Object} user
 * @returns  {Object} Action
 */
export const receiveAppointments = appointments => ({
  type: types.RECEIVE_APPOINTMENTS,
  appointments
});
