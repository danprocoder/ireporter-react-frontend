import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import Template from './Template';
import TableRowLoading from '../skeletonscreens/TableRowLoading';
import IncidentStatusDropdown from '../widgets/IncidentStatusDropdown';
import '../../../assets/css/tab.css';

class Incident extends Component {
  constructor(props) {
    super(props);

    const { type } = props;
    this.state = {
      title: (type === 'red-flag' ? 'Red Flags' : 'Interventions'),
      incidents: [],
      incidentsState: 'fetching',
    };
  }

  componentWillMount() {
    this.fetchIncidents();
  }

  fetchIncidents() {
    const { type, user } = this.props;

    axios.get(`${type}s`, {
      baseURL: API_HOST,
      headers: {
        'x-access-token': user.authToken,
      },
    })
      .then((response) => {
        this.setState({
          incidents: response.data.data,
          incidentsState: 'loaded',
        });
      })
      .catch(() => {

      });
  }

  render() {
    const { title, incidents, incidentsState } = this.state;

    const { type } = this.props;

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
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {incidentsState === 'fetching' ? (
                        <TableRowLoading cols={5} rows={3} />
                      ) : (
                        incidents.map((record, index) => (
                          <tr key={index.toString()}>
                            <td>{index + 1}</td>
                            <td><Link to={`/admin/${type}/${record.id}`}>{record.title}</Link></td>
                            <td>{record.createdon}</td>
                            <td>
                              <IncidentStatusDropdown incident={record} />
                            </td>
                            <td>Like</td>
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
  user: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
};

const state2props = (state) => {
  const reducer = state.usersReducer;
  const { authToken } = reducer.user;
  return {
    user: {
      authToken,
    },
  };
};
export default connect(state2props)(Incident);
