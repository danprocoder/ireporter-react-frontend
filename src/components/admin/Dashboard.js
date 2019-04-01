import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import Mapbox from '../Mapbox';
import Template from './Template';
import '../../../assets/css/admin/dashboard.css';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      numUsers: 0,
      totalIncidents: 0,
      totalResolved: 0,
      redFlags: {
        inDraft: 0,
        underInvestigation: 0,
        rejected: 0,
        total: 0
      },
      interventions: {
        inDraft: 0,
        underInvestigation: 0,
        rejected: 0,
        total: 0
      },
      adminCoordinates: {
        lng: 0,
        lat: 0
      },
      locationReceived: false,
      locationText: 'Getting your location...'
    };
  }

  loadNumUsers() {
    axios.get('admin/users/count', {
      baseURL: API_HOST,
      headers: {
        'x-access-token': this.props.user.authToken
      }
    })
      .then(response => {
        this.setState({
          numUsers: response.data.data[0].count,
        });
      })
      .catch(error => {
        if (error.response) {
          console.error(error.response);
        } else {
          console.error('Failed to connect error');
        }
      });

    return this;
  }

  loadIncidentStats(urlPath) {
    return axios.get(`${urlPath}/stats`, {
      baseURL: API_HOST,
      headers: {
        'x-access-token': this.props.user.authToken
      }
    })
      .then(response => {
        response = response.data.data[0];
        response.type = urlPath;
        return response;
      });
  }

  getUsersLocation() {
    if (navigator.geolocation) {
	  	navigator.geolocation.getCurrentPosition((position) => {
        this.setState({
          adminCoordinates: {
            lng: position.coords.longitude,
            lat: position.coords.latitude
          },
          locationReceived: true
        });
	  	});
	  }
  }

  componentWillMount() {
    // Load total number of users.
    this.loadNumUsers();

    // Load total number of incidents.
    Promise.all([
      this.loadIncidentStats('red-flags'),
      this.loadIncidentStats('interventions')
    ])
      .then(response => {
        const newState = {
          totalResolved: 0,
          totalIncidents: 0
        };

        response.forEach((val) => {
          newState.totalResolved += parseInt(val.resolved);

          const totalIncidents = parseInt(val['in-draft']) + parseInt(val['under-investigation']) + parseInt(val.resolved) + parseInt(val.rejected);
          newState.totalIncidents += totalIncidents;

          const incidentStats = {
            total: totalIncidents,
            inDraft: val['in-draft'],
            underInvestigation: val['under-investigation'],
            rejected: val.rejected
          };

          if (val.type == 'red-flags') {
            newState.redFlags = incidentStats;
          } else {
            newState.interventions = incidentStats;
          }
        });

        this.setState(newState);
      })
      .catch(error => {
        console.error(error);
      });

    // Get users location
    this.getUsersLocation();
  }

  render() {
    return (
      <Template>

        <div class="content">
          <div class="inner">
            <div class="navigation header">Dashboard</div>

            <div class="margin-top">
              <div class="widget counter total-users">
                <div class="num">{this.state.numUsers}</div>
                <div class="label">Registered Users</div>
                <FontAwesomeIcon icon={['fas', 'users']} />
              </div>
              <div class="widget counter total-incidents">
                <div class="num">{this.state.totalIncidents}</div>
                <div class="label">Total Incidents</div>
                <FontAwesomeIcon icon={['fas', 'bullhorn']} />
              </div>
              <div class="widget counter total-incidents">
                <div class="num">{this.state.totalResolved}</div>
                <div class="label">Total Resolved</div>
                <FontAwesomeIcon icon={['fas', 'check']} />
              </div>

              <div class="clearfix"></div>
            </div>


            <div class="margin-top">
            
              <div class="widget overview red-flags">
                <div class="top">
                  <i class="fa fa-flag"></i>
                  <div class="header">Red Flags Overview</div>
                  <div class="total"><b>{this.state.redFlags.total}</b> Total</div>
                </div>
                <div class="body">
                  <div>
                    <div class="c in-draft">
                      <div class="num">{this.state.redFlags.inDraft}</div>
                      <div class="label">In Draft</div>
                    </div>
                    <div class="c under-investigation">
                      <div class="num">{this.state.redFlags.underInvestigation}</div>
                      <div class="label">Investigating</div>
                    </div>
                    <div class="c rejected">
                      <div class="num">{this.state.redFlags.rejected}</div>
                      <div class="label">Rejected</div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="widget overview interventions">
                <div class="top">
                  <i class="fa fa-question"></i>
                  <div class="header">Interventions Overview</div>
                  <div class="total"><b>{this.state.interventions.total}</b> Total</div>
                </div>
                <div class="body">
                  <div>
                    <div class="c in-draft">
                      <div class="num">{this.state.interventions.inDraft}</div>
                      <div class="label">In Draft</div>
                    </div>
                    <div class="c under-investigation">
                      <div class="num">{this.state.interventions.underInvestigation}</div>
                      <div class="label">Investigating</div>
                    </div>
                    <div class="c rejected">
                      <div class="num">{this.state.interventions.rejected}</div>
                      <div class="label">Rejected</div>
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
                {this.state.locationReceived ? (
                  <Mapbox coords={this.state.adminCoordinates} />
                ) : (
                  <div id="map-container">{this.state.locationText}</div>
                )}
              </div>
            </div>

          </div>
        </div>
        
      </Template>
    );
  }
}

const state2Props = (state) => {
  const reducer = state.usersReducer;

  const isLoggedIn = (reducer.user.data != null);
  return {
    user: {
      isLoggedIn,
      authToken: isLoggedIn ? reducer.user.authToken : null
    }
  };
};

export default connect(state2Props)(Dashboard);
