import incidentAction from '../actiontypes/incidents';

const getInitialState = () => ({
  incidentFetchState: 'fetching',
  incidents: [],
});

export default (state = getInitialState(), action) => {
  const newState = { ...state };

  switch (action.type) {
    case incidentAction.INCIDENT_LIST_FETCHING:
      newState.incidentFetchState = 'fetching';
      break;
    case incidentAction.INCIDENT_LIST_FETCHED:
      newState.incidentFetchState = 'fetched';
      newState.incidents = action.payload;
      break;
    case incidentAction.INCIDENT_LIST_FETCHING_ERROR:
      newState.incidentFetchState = 'error';
      break;
    default:
      return newState;
  }

  return newState;
};
