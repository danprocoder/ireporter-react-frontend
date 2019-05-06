import appReducer from '../../../src/reducers/app';
import appAction from '../../../src/actiontypes/app';

let state;

describe('Test app reducer', () => {
  test('It should return a default state is no action type is passed', () => {
    state = appReducer(undefined, {});

    expect(typeof state).toBe('object');
    expect(state.state).toBe('loaded');
  });

  test('It should return a new state when "ready" action is passed', () => {
    state = appReducer(state, { type: appAction.READY });

    expect(state.state).toBe('ready');
  });
});
