import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  string as stringProp,
  object as objectProp,
  array as arrayProp,
  func as funcProp,
} from 'prop-types';
import Template from './Template';
import TableRowLoading from '../skeletonscreens/TableRowLoading';
import IncidentStatusDropdown from '../widgets/IncidentStatusDropdown';
import { getAllIncidents } from '../../actions/incidents';
import '../../../assets/css/tab.css';

class Incident extends Component {
  constructor(props) {
    super(props);

    const { type } = props;
    this.state = {
      title: (type === 'red-flag' ? 'Red Flags' : 'Interventions'),
    };
  }

  componentWillMount() {
    this.fetchIncidents();
  }

  fetchIncidents() {
    const { type, user, getIncidents } = this.props;

    getIncidents(user.authToken, type);
  }

  render() {
    const { title } = this.state;

    const { incidents, incidentFetchState, type } = this.props;

    return (
      <Template>

        <div className="content">
          <div className="inner">
            <div className="navigation header">{title}</div>

            <div>
              <div className="filter-container clearfix">

                <div className="f-right">
                  <div className="search-box">
                    <input type="text" placeholder="Search title" name="q" className="text-field" />
                    <button type="button"><i className="fa fa-search" /></button>
                  </div>
                </div>

                <ul className="tab f-left">
                  <li><a href="#">In Draft</a></li>
                  <li><a href="#">Resolved</a></li>
                  <li><a href="#">Investigating</a></li>
                  <li><a href="#">Rejected</a></li>
                  <li className="active"><a href="#">All</a></li>
                </ul>

              </div>

              <div id="incident">
                <div className="table-wrapper">
                  <table id="incident-table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Created At</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {incidentFetchState === 'fetching' ? (
                        <TableRowLoading cols={4} rows={3} />
                      ) : (
                        incidents.map((record, index) => (
                          <tr key={index.toString()}>
                            <td>{index + 1}</td>
                            <td><Link to={`/admin/${type}/${record.id}`}>{record.title}</Link></td>
                            <td>{record.createdon}</td>
                            <td>
                              <IncidentStatusDropdown incident={record} />
                            </td>
                          </tr>
                        )))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>

          </div>

        </div>

      </Template>
    );
  }
}

Incident.propTypes = {
  user: objectProp.isRequired,
  type: stringProp.isRequired,
  getIncidents: funcProp.isRequired,
  incidents: arrayProp.isRequired,
  incidentFetchState: stringProp.isRequired,
};

const state2props = ({ usersReducer, incidentsReducer }) => {
  const { authToken } = usersReducer.user;
  return {
    user: {
      authToken,
    },
    incidents: incidentsReducer.incidents,
    incidentFetchState: incidentsReducer.incidentFetchState,
  };
};

const dispatch2props = dispatch => bindActionCreators({
  getIncidents: getAllIncidents,
}, dispatch);

export default connect(state2props, dispatch2props)(Incident);
