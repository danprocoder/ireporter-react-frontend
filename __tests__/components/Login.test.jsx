import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import reducers from '../../src/reducers';
import Login from '../../src/components/Login';

let login;

beforeAll((done) => {
  login = mount(
    <Provider store={createStore(reducers)}>
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    </Provider>,
  );

  done();
});

describe('Test <Login /> component', () => {
  test('It should have a login form', () => {
    expect(login.find('form').exists()).toBe(true);
  });
});
