import React, { Component } from 'react';
import SideNavMenuItem from './SideNavMenuItem';

class SideNav extends Component {
  render() {
    return (
      <div className="sidenav">
        <div className="sidenav-menus">
          <ul>
            <SideNavMenuItem url="/admin" text="Dashboard" />
            <SideNavMenuItem url="/admin/red-flags" text="Red-Flags" />
            <SideNavMenuItem url="/admin/interventions" text="Interventions" />
            <SideNavMenuItem url="/admin/users" text="Users" />
          </ul>
        </div>
      </div>
    );
  }
}

export default SideNav;
