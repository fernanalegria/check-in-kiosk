import { getStaticData } from '../../../../server/api';
import { cityActions } from '../cities';
import { stateActions } from '../states';

/**
 * Calls API to fetch the static data and save it into the Redux store
 * @returns  {Promise}
 */
export const handleFetchStaticData = () => dispatch => {
  return getStaticData().then(({ cities, states }) => {
    dispatch(cityActions.receiveCities(cities));
    dispatch(stateActions.receiveStates(states));
  });
};
