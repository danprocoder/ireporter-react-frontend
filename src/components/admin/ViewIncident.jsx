import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import Mapbox from '../Mapbox';
import Image from '../widgets/Image';
import IncidentStatusDropdown from '../widgets/IncidentStatusDropdown';
import Template from './Template';
import ViewSingleIncidentSkeleton from '../skeletonscreens/ViewSingleIncident';
import '../../../assets/css/view-record.css';

class ViewIncident extends Component {
  constructor(props) {
    super(props);

    const { url } = props.match;

    [,, this.type] = url.split('/');
    this.state = {
      navTypeText: (this.type === 'red-flag' ? 'Red Flags' : 'Interventions'),
      incident: null,
      incidentState: 'fetching',
    };
  }

  componentWillMount() {
    this.fetchIncident();
  }

  fetchIncident() {
    const { match, authToken } = this.props;

    axios.get(`${this.type}s/${match.params.id}`, {
      baseURL: API_HOST,
      headers: {
        'x-access-token': authToken,
      },
    })
      .then(response => response.data.data[0])
      .then((incident) => {
        this.setState({
          incident,
          incidentState: 'loaded',
        });
      })
      .catch(() => {

      });
  }

  incidentHasLocation() {
    const { incident } = this.state;
    return incident.longitude && incident.latitude;
  }

  render() {
    const { incident, incidentState, navTypeText } = this.state;

    return (
      <Template>
        <div className="content view-content">
          {incidentState === 'loaded' ? (
            <div className="inner" id="incident">

              <div>
                <div className="navigation">
                  <Link to={`/admin/${this.type}s`}>{navTypeText}</Link>
                  {' '}
                  /
                  {' '}
                  {incident.title}
                </div>
                <div className="title">{incident.title}</div>
                <div className="info-wrapper">
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

                  <IncidentStatusDropdown incident={incident} className="info record-status" />
                  <div className="clearfix" />
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
          ) : (
            <ViewSingleIncidentSkeleton incidentsUrlPath={`/admin/${this.type}s`} navTypeText={navTypeText} />
          )}
        </div>
      </Template>
    );
  }
}

ViewIncident.propTypes = {
  match: PropTypes.object.isRequired,
  authToken: PropTypes.string.isRequired,
};

const state2props = (state) => {
  const { authToken } = state.usersReducer.user;
  return { authToken };
};
export default connect(state2props)(ViewIncident);
