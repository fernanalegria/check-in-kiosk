import * as types from './types';

/**
 * Saves a list of cities in the Redux store
 * @param  {Object} cities
 * @returns  {Object} Action
 */
export const receiveCities = cities => ({
  type: types.RECEIVE_CITIES,
  cities
});
