import React from 'react';
import { createStore } from 'redux';
import Provider from 'react-redux';
import { shallow } from 'enzyme';
import Home from '../../src/components/Home';

let homeView;

beforeAll((done) => {
  homeView = shallow(
    <Provider store={createStore(() => 1)}>
      <Home
        isLoggedIn={false}
        user={null}
      />
    </Provider>,
  );

  done();
});

describe('Test homepage component', () => {
  test('It should have certain texts', (done) => {
    expect(homeView.find('.welcome-text-container .large-text')).toBe('WELCOME TO IREPORTER');
    done();
  });
});
