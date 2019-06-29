import * as types from './types';
import {
  getAppointments,
  updateAppointmentStatus
} from '../../../../server/api';

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

/**
 * Calls the API to update the appointment status
 * @returns  {Promise}
 */
export const handleUpdateAppointmentStatus = (id, status) => dispatch => {
  return updateAppointmentStatus(id, status).then(() => {
    dispatch(updateStatus(id, status));
  });
};

/**
 * Update the appointment status in the Redux store
 * @param  {number} id
 * @param  {string} status
 * @returns  {Object} Action
 */
export const updateStatus = (id, status) => ({
  type: types.UPDATE_STATUS,
  id,
  status
});
