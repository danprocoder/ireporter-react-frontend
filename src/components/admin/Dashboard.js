import React, { Component } from 'react';
import SideNav from './SideNav';
import '../../../assets/css/admin/style.css';
import '../../../assets/css/admin/dashboard.css';

class Dashboard extends Component {
  render() {
    return (
      <div class="main-content">
        <SideNav />

        <div class="content">
          <div class="inner">
            <div class="navigation header">Dashboard</div>

            <div class="margin-top">

              <div class="widget counter total-users">
                <div class="num">0</div>
                <div class="label">Registered Users</div>
                <i class="fa fa-users"></i>
              </div>


              <div class="widget counter total-incidents">
                <div class="num">0</div>
                <div class="label">Total Incidents</div>
                <i class="fa fa-bullhorn"></i>
              </div>

              <div class="clearfix"></div>

            </div>


            <div class="margin-top">
            
              <div class="widget overview red-flags">
                <div class="top">
                  <i class="fa fa-flag"></i>
                  <div class="header">Red Flags Overview</div>
                  <div class="total"><b>0</b> Total</div>
                </div>
                <div class="body">
                  <div>
                    <div class="c in-draft">
                      <div class="num">0</div>
                      <div class="label">In Draft</div>
                    </div>
                    <div class="c under-investigation">
                      <div class="num">0</div>
                      <div class="label">Investigating</div>
                    </div>
                    <div class="c resolved">
                      <div class="num">0</div>
                      <div class="label">Resolved</div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="widget overview interventions">
                <div class="top">
                  <i class="fa fa-question"></i>
                  <div class="header">Interventions Overview</div>
                  <div class="total"><b>0</b> Total</div>
                </div>
                <div class="body">
                  <div>
                    <div class="c in-draft">
                      <div class="num">0</div>
                      <div class="label">In Draft</div>
                    </div>
                    <div class="c under-investigation">
                      <div class="num">0</div>
                      <div class="label">Investigating</div>
                    </div>
                    <div class="c resolved">
                      <div class="num">0</div>
                      <div class="label">Resolved</div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="clearfix"></div>

            </div>

            <div class="margin-top">
              <div class="widget map">
                <div class="top">
                  <div class="header">Where you are</div>
                </div>
                <div id="map-container"></div>
              </div>
            </div>

          </div>
        </div>	
      </div>
    );
  }
}

export default Dashboard;
