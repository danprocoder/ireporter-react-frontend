import reducer from '../../../src/reducers/incidents';
import action from '../../../src/actiontypes/incidents';

let state;

describe('Test incidents reducer', () => {
  test('It should return a default state if no action is dispatched', () => {
    state = reducer(undefined, {});
    expect(typeof state).toBe('object');
  });

  test('It should return a new state if fetching action is dispatched', () => {
    state = reducer(state, {
      type: action.INCIDENT_LIST_FETCHING,
    });

    expect(state.incidentFetchState).toBe('fetching');
  });

  test('It should return a new state if fetched action is dispatched', () => {
    state = reducer(state, {
      type: action.INCIDENT_LIST_FETCHED,
      payload: ['a'],
    });

    expect(state.incidentFetchState).toBe('fetched');
    expect(state.incidents.length).toBe(1);
  });

  test('It should return a new state if fetch error action is dispatched', () => {
    state = reducer(state, {
      type: action.INCIDENT_LIST_FETCHING_ERROR,
    });

    expect(state.incidentFetchState).toBe('error');
  });
});
