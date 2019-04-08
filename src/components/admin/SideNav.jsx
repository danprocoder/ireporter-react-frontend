import React from 'react';
import SideNavMenuItem from './SideNavMenuItem';
import '../../../assets/scss/admin/sidenav.scss';

export default () => (
  <div className="sidenav">
    <div className="sidenav-menus">
      <ul>
        <SideNavMenuItem url="/admin" icon="dashboard" text="Dashboard" />
        <SideNavMenuItem url="/admin/red-flags" icon="flag" text="Red Flags" />
        <SideNavMenuItem url="/admin/interventions" icon="question" text="Interventions" />
        <SideNavMenuItem url="/admin/users" icon="users" text="Users" />
      </ul>
    </div>
  </div>
);
