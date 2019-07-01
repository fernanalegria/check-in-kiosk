import * as types from './types';

/**
 * Saves a list of states in the Redux store
 * @param  {Object} states
 * @returns  {Object} Action
 */
export const receiveStates = states => ({
  type: types.RECEIVE_STATES,
  states
});
