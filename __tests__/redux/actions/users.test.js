import userActionCreators from '../../../src/actions/users';
import userAction from '../../../src/actiontypes/users';

describe('Test user action creator', () => {
  test('It should return action to logout user in', () => {
    const action = userActionCreators.logUserIn(
      'token',
      {
        username: 'hello',
      },
    );
    expect(action.type).toBe(userAction.LOG_IN);
    expect(action.payload.authToken).toBe('token');
    expect(action.payload.data.username).toBe('hello');
  });

  test('It should return action to log out user out', () => {
    const action = userActionCreators.logUserOut();
    expect(action.type).toBe(userAction.LOGOUT);
  });
});
