import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import Mapbox from '../Mapbox';
import Image from '../widgets/Image';
import Template from './Template';
import ViewSingleIncidentSkeleton from '../skeletonscreens/ViewSingleIncident';
import '../../../assets/css/view-record.css';

class ViewIncident extends Component {
  constructor(props) {
    super(props);

    this.type = this.props.match.url.split('/')[2];
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
      .catch((error) => {

      });
  }

  incidentHasLocation() {
    const { incident } = this.state;
    return incident.longitude && incident.latitude;
  }

  render() {
    return (
      <Template>
        <div className="content view-content">
          {this.state.incidentState === 'loaded' ? (
            <div className="inner" id="incident">

            <div>
              <div className="navigation">
<Link to={`/admin/${this.type}s`}>{this.state.navTypeText}</Link>
{' '}
/
{' '}
{this.state.incident.title}
</div>
              <div className="title">{this.state.incident.title}</div>
              <div className="info-wrapper">
                <span className="info date">{this.state.incident.createdon}</span>
                {this.incidentHasLocation() && (
                <span className="info map"><a href="#map-area" title="View map">
<i class="fa fa-map"></i>
{' '}
Map
</a></span>
                )}
                <span className="info record-status dropdown" id="status-dd">
                  <span className="selected">{this.state.incident.status}</span> 
{' '}
<i class="fa fa-caret-down"></i>
                  <ul className="dropdown-menu">
                    <li><a href="#">In Draft</a></li>
                    <li><a href="#">Under Investigation</a></li>
                    <li><a href="#">Resolved</a></li>
                    <li><a href="#">Rejected</a></li>
                  </ul>
                </span>
                <div className="clearfix" />
              </div>
            </div>

            <div className="record-content">
              <div className="comment">{this.state.incident.comment}</div>

              {this.incidentHasLocation() && (
              <div className="map-wrapper" id="map-area">
                <div className="location-text">
<i class="fa fa-map-marker"></i> 
{' '}
{this.state.incident.longitude}
&deg;,
{' '}
{this.state.incident.latitude}
&deg;
</div>
                <Mapbox coords={{ lat: parseFloat(this.state.incident.latitude), lng: parseFloat(this.state.incident.longitude) }} />
              </div>
              )}

              {this.state.incident.Images.length > 0 && (
              <div className="media-section images">
                <div className="section-header">
<i class="fa fa-image"></i>
{' '}
Images
</div>
                <div className="media-wrapper">
                  {this.state.incident.Images.map((src, index) => <Image key={index} src={src} />)}
                </div>
              </div>
              )}
            </div>

          </div>
          ) : (
            <ViewSingleIncidentSkeleton incidentsUrlPath={`${this.type}s`} navTypeText={this.state.navTypeText} />
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
