import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import reducer from '../../../src/reducers/users';
import userAction from '../../../src/actions/users';

let store = createStore(reducer, applyMiddleware(thunk));

beforeEach(() => {
  moxios.install();
});

afterEach(() => {
  moxios.uninstall();
});

describe('Test user action', () => {
  test('Test action to log user in.', () => {
    moxios.stubRequest(`${API_HOST}/auth/login`, {
      status: 200,
      response: {
        status: 200,
        data: [{ token: 'hello', user: {} }],
      },
    });
    store.dispatch(userAction.logUserIn('zzz', 'dresf'));
  });

  test('Test action to log user in with incorrect details', () => {
    moxios.stubRequest(`${API_HOST}/auth/login`, {
      status: 400,
      response: {
        status: 400,
        error: 'Incorrect username/password',
      },
    });
    store.dispatch(userAction.logUserIn('zzz', 'dresf'));
  });

  test('Test action to create user', () => {
    moxios.stubRequest(`${API_HOST}/auth/signup`, {
      status: 200,
      response: {
        status: 200,
        data: [{ token: 'hello', user: {} }],
      },
    });
    store.dispatch(userAction.createNewUser({}));
  });

  test('Test action to create user with invalid input', () => {
    moxios.stubRequest(`${API_HOST}/auth/signup`, {
      status: 400,
      response: {
        status: 400,
        error: {},
      },
    });
    store.dispatch(userAction.createNewUser({}));
  });

  test('Test action to fetch user details', () => {
    moxios.stubRequest(`${API_HOST}/auth`, {
      status: 200,
      response: {
        status: 200,
        error: {},
      },
    });
    store.dispatch(userAction.fetchUserDetails('token'));
  });

  test('Test action to fetch user details with an incorrect token', () => {
    moxios.stubRequest(`${API_HOST}/auth`, {
      status: 400,
      response: {
        status: 400,
        error: 'Invalid token',
      },
    });
    store.dispatch(userAction.fetchUserDetails('token'));
  });

  test('Test action to log user out', () => {
    store.dispatch(userAction.logUserOut());
  });
});
