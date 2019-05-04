import React from 'react';
import { mount } from 'enzyme';
import { TopNav } from '../../../src/components/admin/Nav';

let topNav;
let logoutClicked = false;
let logoutRdrPath;

beforeAll((done) => {
  topNav = mount(
    <TopNav
      username="adminuser"
      logout={() => {
        logoutClicked = true;
      }}
      history={{
        push(path) {
          logoutRdrPath = path;
        },
      }}
    />,
  );

  done();
});

describe('Test <Dashboard/> component', () => {
  test('It should render the topnav page', () => {
    expect(topNav.find('.navbar-menu .username').text()).toBe('adminuser');
  });

  test('It should show dropdown menu', () => {
    topNav.find('.navbar-menu .dropdown > a').simulate('click', { preventDefault: () => 1 });
    expect(topNav.state().showUserDropdown).toBe(true);
  });

  test('It should logout of the application ', () => {
    topNav.find('.navbar-menu .dropdown-menu .auth-logout').simulate('click', { preventDefault: () => 1 });
    expect(logoutClicked).toBe(true);
    expect(logoutRdrPath).toBe('/');
  });
});
