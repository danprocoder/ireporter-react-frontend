import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import { DefaultNav } from '../../src/components/DefaultNav';

let defaultNav;

beforeAll((done) => {
  defaultNav = mount(
    <BrowserRouter>
      <DefaultNav
        isLoggedIn={false}
        user={null}
      />
    </BrowserRouter>,
  );

  done();
});

describe('Test <DefaultNav /> component', () => {
  test('It should contain sitename', () => {
    expect(defaultNav.find('.sitename span').text()).toBe('iReporter');
  });

  test('It should have a login and sign up link if the user is not logged in', () => {
    expect(defaultNav.find('.navbar-menu li Link').at(0).text()).toBe('Log In');
    expect(defaultNav.find('.navbar-menu li Link').at(1).text()).toBe('Sign Up');
  });

  test('It should have a link to the user\'s dashboard if the user is logged in', () => {
    defaultNav = mount(
      <BrowserRouter>
        <DefaultNav
          isLoggedIn
          user={{
            isAdmin: false,
            firstname: 'Whistleblower',
          }}
        />
      </BrowserRouter>,
    );
    expect(defaultNav.find('.navbar-menu li Link').at(0).text()).toBe('Continue as Whistleblower →');
  });
});
