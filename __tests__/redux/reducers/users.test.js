import userReducer from '../../../src/reducers/users';
import userAction from '../../../src/actiontypes/users';

let state;

describe('Test users reducer', () => {
  test('It should return a default state', () => {
    state = userReducer(undefined, {});

    expect(typeof state.user).toBe('object');
    expect(state.user.authToken).toBe(null);
    expect(state.user.data).toBe(null);
  });

  test('It should return a new state when log in action is passed', () => {
    state = userReducer(state, {
      type: userAction.LOG_IN,
      payload: {
        authToken: 'token',
        data: {
          username: 'hello',
        },
      },
    });

    expect(state.isLoggingIn).toBe(false);
    expect(state.isCreatingUser).toBe(false);
    expect(state.user.authToken).toBe('token');
    expect(state.user.data.username).toBe('hello');
  });

  test('It should return a new state when logout action is passed', () => {
    state = userReducer(state, { type: userAction.LOGOUT });

    expect(state.user.authToken).toBe(null);
    expect(state.user.data).toBe(null);
  });

  test('It should return a new state if logging in action is dispatched', () => {
    state = userReducer(state, { type: userAction.LOGGING_IN });

    expect(state.isLoggingIn).toBe(true);
  });

  test('It should return a new state when the log in error action is dispatched', () => {
    state = userReducer(state, {
      type: userAction.LOG_IN_ERROR,
      payload: {
        fieldErrors: {
          email: 'An error occurred',
        },
      },
    });

    expect(state.isLoggingIn).toBe(false);
    expect(state.authFieldErrors.email).toBe('An error occurred');
  });

  test('It should return a new state if creating user action is dispatched', () => {
    state = userReducer(state, { type: userAction.CREATING_USER });

    expect(state.isCreatingUser).toBe(true);
  });

  test('It should return a new state if create user error is dispatched', () => {
    state = userReducer(state, {
      type: userAction.CREATE_USER_ERROR,
      payload: {
        fieldErrors: {
          email: 'An error occurred',
        },
      },
    });

    expect(state.isCreatingUser).toBe(false);
    expect(state.signUpFieldErrors.email).toBe('An error occurred');
  });
});
