import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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
        total: 0,
      },
      interventions: {
        inDraft: 0,
        underInvestigation: 0,
        rejected: 0,
        total: 0,
      },
      adminCoordinates: {
        lng: 0,
        lat: 0,
      },
      locationStatus: 'fetching',
      locationText: 'Getting your location...',
    };
  }

  componentWillMount() {
    // Load total number of users.
    this.loadNumUsers();

    // Load total number of incidents.
    Promise.all([
      this.loadIncidentStats('red-flags'),
      this.loadIncidentStats('interventions'),
    ])
      .then((response) => {
        const newState = {
          totalResolved: 0,
          totalIncidents: 0,
        };

        response.forEach((val) => {
          newState.totalResolved += parseInt(val.resolved, 10);

          const totalIncidents = (
            parseInt(val['in-draft'], 10)
            + parseInt(val['under-investigation'], 10)
            + parseInt(val.resolved, 10)
            + parseInt(val.rejected, 10)
          );
          newState.totalIncidents += totalIncidents;

          const incidentStats = {
            total: totalIncidents,
            inDraft: val['in-draft'],
            underInvestigation: val['under-investigation'],
            rejected: val.rejected,
          };

          if (val.type === 'red-flags') {
            newState.redFlags = incidentStats;
          } else {
            newState.interventions = incidentStats;
          }
        });

        this.setState(newState);
      })
      .catch(() => {
        // Pass
      });

    // Get users location
    this.getUsersLocation();
  }

  onLocationError() {
    this.setState({
      locationText: 'Unable to get your location',
      locationStatus: 'failed',
    });
  }

  getUsersLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.setState({
          adminCoordinates: {
            lng: position.coords.longitude,
            lat: position.coords.latitude,
          },
          locationStatus: 'ready',
        });
      }, this.onLocationError);
    }
  }

  loadNumUsers() {
    const { user } = this.props;

    axios.get('admin/users/count', {
      baseURL: API_HOST,
      headers: {
        'x-access-token': user.authToken,
      },
    })
      .then((response) => {
        this.setState({
          numUsers: response.data.data[0].count,
        });
      })
      .catch((error) => {
        if (error.response) {
          // Pass
        } else {
          // Pass
        }
      });

    return this;
  }

  loadIncidentStats(urlPath) {
    const { user } = this.props;

    return axios.get(`${urlPath}/stats`, {
      baseURL: API_HOST,
      headers: {
        'x-access-token': user.authToken,
      },
    })
      .then(response => response.data.data[0])
      .then((response) => {
        response.type = urlPath;
        return response;
      });
  }

  widget(icon, label, value) {
    return (
      <div className="widget counter">
        <div className="num">{value}</div>
        <div className="label">{label}</div>
        <i className={`fa fa-${icon}`} />
      </div>
    );
  }

  overview(header, stats, extraClassName = '') {
    let className = 'widget overview';
    if (extraClassName) {
      className += ` ${extraClassName}`;
    }

    return (
      <div className={className}>
        <div className="top">
          <i className="fa fa-flag" />
          <div className="header">
            {header}
            {' '}
            Overview
          </div>
          <div className="total">
            <b>{stats.total}</b>
            {' '}
            Total
          </div>
        </div>
        <div className="body">
          <div>
            <div className="c in-draft">
              <div className="num">{stats.inDraft}</div>
              <div className="label">In Draft</div>
            </div>
            <div className="c under-investigation">
              <div className="num">{stats.underInvestigation}</div>
              <div className="label">Investigating</div>
            </div>
            <div className="c rejected">
              <div className="num">{stats.rejected}</div>
              <div className="label">Rejected</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const {
      numUsers,
      totalIncidents,
      totalResolved,
      redFlags,
      interventions,
      adminCoordinates,
      locationStatus,
      locationText,
    } = this.state;

    return (
      <Template>

        <div className="content">
          <div className="inner">
            <div className="navigation header">Dashboard</div>

            <div className="margin-top">
              {this.widget('users', 'Registered Users', numUsers)}
              {this.widget('bullhorn', 'Total Incidents', totalIncidents)}
              {this.widget('check', 'Total Resolved', totalResolved)}
              <div className="clearfix" />
            </div>

            <div className="margin-top">
              {this.overview('Red Flags', redFlags)}
              {this.overview('Interventions', interventions, 'no-m-right')}
              <div className="clearfix" />
            </div>

            <div className="margin-top">
              <div className="widget map">
                <div className="top">
                  <div className="header">Where you are</div>
                </div>
                {locationStatus === 'ready' ? (
                  <Mapbox coords={adminCoordinates} />
                ) : (
                  <div id="map-container">{locationText}</div>
                )}
              </div>
            </div>

          </div>
        </div>

      </Template>
    );
  }
}

Dashboard.propTypes = {
  user: PropTypes.object.isRequired,
};

const state2Props = (state) => {
  const reducer = state.usersReducer;

  const isLoggedIn = (reducer.user.data != null);
  return {
    user: {
      isLoggedIn,
      authToken: isLoggedIn ? reducer.user.authToken : null,
    },
  };
};

export default connect(state2Props)(Dashboard);
