import React from 'react';
import { Link } from 'react-router-dom';
import { string as stringProp } from 'prop-types';
import OneLineText from './OneLineText';
import '../../../assets/scss/skeletonscreens/view-record.scss';

const ViewSingleIncident = ({ incidentsUrlPath, navTypeText }) => (
  <div className="skeleton-screen-view-record">
    <div className="navigation">
      <Link to={incidentsUrlPath}>{navTypeText}</Link>
      {' '}
      /
      {' '}
      <OneLineText />
    </div>
    <div className="title"><OneLineText /></div>

    <div className="meta">
      <OneLineText className="date" />
      <OneLineText className="status" />
    </div>

    <div className="record-content">
      <OneLineText />
      <OneLineText />
      <OneLineText />
    </div>
  </div>
);

ViewSingleIncident.propTypes = {
  incidentsUrlPath: stringProp.isRequired,
  navTypeText: stringProp.isRequired,
};

export default ViewSingleIncident;
