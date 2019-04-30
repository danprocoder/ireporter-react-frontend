import React, { Component } from 'react';
import { object as objectProp, string as stringProp } from 'prop-types';
import { connect } from 'react-redux';
import { get as axiosGet } from 'axios';
import { Link } from 'react-router-dom';
import Template from './Template';
import Image from '../widgets/Image';
import Mapbox from '../Mapbox';
import ViewSingleIncidentSkeletonScreen from '../skeletonscreens/ViewSingleIncident';
import '../../../assets/css/view-record.css';

class ViewIncident extends Component {
  constructor(props) {
    super(props);

    this.state = {
      incident: null,
      incidentState: 'fetching',
    };

    [, this.type] = props.match.url.split('/');
  }

  componentDidMount() {
    const { authToken, match } = this.props;

    axiosGet(`/${this.type}s/${match.params.id}`, {
      baseURL: API_HOST,
      headers: {
        'x-access-token': authToken,
      },
    })
      .then(response => response.data.data[0])
      .then((incident) => {
        this.setState({ incident, incidentState: 'loaded' });
      })
      .catch(() => {
        this.setState({
          incidentState: 'error',
        });
      });
  }

  incidentHasLocation() {
    const { incident } = this.state;
    return incident.longitude && incident.latitude;
  }

  incidentStatusView(status) {
    return (
      <span className="info record-status">
        {{
          'in-draft': 'In Draft',
          'under-investigation': 'Under Investigation',
          resolved: 'Resolved',
          rejected: 'Rejected',
        }[status]}
      </span>
    );
  }

  render() {
    const { incident, incidentState } = this.state;

    return (
      <Template>
        <div className="user-incident view-content">
          <div className="container">
            {incidentState === 'fetching' ? (
              <ViewSingleIncidentSkeletonScreen
                incidentsUrlPath={this.type === 'red-flag' ? '/red-flags' : '/interventions'}
                navTypeText={this.type === 'red-flag' ? 'Red Flags' : 'Interventions'}
              />
            ) : (
              <div className="inner" id="incident">

                <div>
                  <div className="navigation">
                    <Link to={this.type === 'red-flag' ? '/red-flags' : '/interventions'}>{this.type === 'red-flag' ? 'Red Flags' : 'Interventions'}</Link>
                    {' '}
                    /
                    {' '}
                    {incident.title}
                  </div>
                  <div className="title">{incident.title}</div>
                  <div className="info-wrapper clearfix">
                    <span className="info date">{incident.createdon}</span>

                    {this.incidentHasLocation() && (
                    <span className="info map">
                      <a href="#map-area" title="View map">
                        <i className="fa fa-map-marker" />
                        {' '}
                        Map
                      </a>
                    </span>
                    )}

                    {this.incidentStatusView(incident.status)}
                  </div>
                </div>

                <div className="record-content">
                  <div className="comment">{incident.comment}</div>

                  {this.incidentHasLocation() && (
                  <div className="map-wrapper" id="map-area">
                    <div className="location-text">
                      <i className="fa fa-map-marker" />
                      {' '}
                      {incident.longitude}
                      &deg;,
                      {' '}
                      {incident.latitude}
                      &deg;
                    </div>
                    <Mapbox
                      coords={{
                        lat: parseFloat(incident.latitude),
                        lng: parseFloat(incident.longitude),
                      }}
                    />
                  </div>
                  )}

                  {incident.Images.length > 0 && (
                  <div className="media-section images">
                    <div className="media-wrapper">
                      {incident.Images.map(src => <Image key={src} src={src} />)}
                    </div>
                  </div>
                  )}
                </div>

              </div>
            )}
          </div>
        </div>
      </Template>
    );
  }
}

ViewIncident.propTypes = {
  authToken: stringProp.isRequired,
  match: objectProp.isRequired,
};

const state2props = state => ({
  authToken: state.usersReducer.user.authToken,
});

export default connect(state2props)(ViewIncident);
