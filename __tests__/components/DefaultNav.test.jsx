import React from 'react';
import { mount } from 'enzyme';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import DefaultNavConnected from '../../src/components/DefaultNav';
import userAction from '../../src/actiontypes/users';
import reducers from '../../src/reducers';

let connected;
let store;

beforeAll((done) => {
  store = createStore(reducers);

  connected = mount(
    <Provider store={store}>
      <BrowserRouter>
        <DefaultNavConnected />
      </BrowserRouter>
    </Provider>,
  );

  done();
});

describe('Test <DefaultNav /> component', () => {
  test('It should contain sitename', () => {
    expect(connected.find('.sitename span').text()).toBe('iReporter');
  });

  test('It should have a login and sign up link if the user is not logged in', () => {
    expect(connected.find('.navbar-menu li Link').at(0).text()).toBe('Log In');
    expect(connected.find('.navbar-menu li Link').at(1).text()).toBe('Sign Up');
  });

  test('It should have a link to the user\'s dashboard if the user is logged in', () => {
    store.dispatch({
      type: userAction.LOG_IN,
      payload: {
        authToken: 'token',
        data: {
          firstname: 'Whistleblower',
          isAdmin: false,
        },
      },
    });
    connected.update();

    expect(connected.find('.navbar-menu li Link').at(0).text()).toBe('Continue as Whistleblower →');
  });
});
