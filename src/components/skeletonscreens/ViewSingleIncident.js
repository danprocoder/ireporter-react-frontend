import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import OneLineText from './OneLineText';
import '../../../assets/scss/skeletonscreens/view-record.scss';

class ViewSingleIncident extends Component {
  render() {
    return (
      <div class="skeleton-screen-view-record">
        <div class="navigation"><Link to={`/admin/${this.props.incidentsUrlPath}`}>{this.props.navTypeText}</Link> / <OneLineText /></div>
        <div class="title"><OneLineText /></div>

        <div class="meta">
          <OneLineText className="date" />
          <OneLineText className="status" />
        </div>

        <div class="record-content">
          <OneLineText />
          <OneLineText />
          <OneLineText />
        </div>
      </div>
    );
  }
}

export default ViewSingleIncident;
