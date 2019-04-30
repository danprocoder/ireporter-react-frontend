import React from 'react';
import { shallow } from 'enzyme';
import { Home } from '../../src/components/Home';

let homeView;

beforeAll((done) => {
  homeView = shallow(
    <Home
      isLoggedIn={false}
      user={null}
    />,
  );

  done();
});

describe('Test homepage component', () => {
  test('It should have certain texts', (done) => {
    expect(homeView.find('.welcome-text-container .large-text').text()).toBe('WELCOME TO IREPORTER');
    done();
  });
});
