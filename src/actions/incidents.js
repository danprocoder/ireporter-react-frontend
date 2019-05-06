import { get as axiosGet } from 'axios';
import incidentAction from '../actiontypes/incidents';

export const getAllIncidents = (authToken, type) => {
  return (dispatch) => {
    dispatch({ type: incidentAction.INCIDENT_LIST_FETCHING });

    axiosGet(`${type}s`, {
      baseURL: API_HOST,
      headers: {
        'x-access-token': authToken,
      },
    })
      .then(response => response.data.data)
      .then((incidents) => {
        dispatch({
          type: incidentAction.INCIDENT_LIST_FETCHED,
          payload: incidents,
        });
      })
      .catch(() => {
        dispatch({ type: incidentAction.INCIDENT_LIST_FETCHING_ERROR });
      });
  };
};

export const a = () => 1;
