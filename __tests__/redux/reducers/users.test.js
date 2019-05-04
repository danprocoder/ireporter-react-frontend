import userReducer from '../../../src/reducers/users';
import userActionCreators from '../../../src/actions/users';

let state;

describe('Test users reducer', () => {
  test('It should return a default state', () => {
    state = userReducer(undefined, {});

    expect(typeof state.user).toBe('object');
    expect(state.user.authToken).toBe(null);
    expect(state.user.data).toBe(null);
  });

  test('It should return a new state when log in action is passed', () => {
    state = userReducer(state, userActionCreators.logUserIn(
      'token',
      {
        username: 'hello',
      },
    ));

    expect(state.user.authToken).toBe('token');
    expect(state.user.data.username).toBe('hello');
  });

  test('It should return a new state when logout action is passed', () => {
    state = userReducer(state, userActionCreators.logUserOut());

    expect(state.user.authToken).toBe(null);
    expect(state.user.data).toBe(null);
  });
});
