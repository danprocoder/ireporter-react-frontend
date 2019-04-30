import React, { Component } from 'react';
import { connect } from 'react-redux';
import { object as objectProp, string as stringProp } from 'prop-types';
import { Link } from 'react-router-dom';
import { get as axiosGet } from 'axios';
import Template from './Template';
import TableRowLoadingSkeletonScreen from '../skeletonscreens/TableRowLoading';
import '../../../assets/scss/user/view-records.scss';

class ViewIncidentList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      incidents: [],
      incidentsLoadingState: 'loading',
    };

    [, this.type] = props.match.url.split('/');
    this.type = this.type.substr(0, this.type.length - 1);
  }

  componentDidMount() {
    const { authToken } = this.props;

    axiosGet(`${this.type}s`, {
      baseURL: API_HOST,
      headers: {
        'x-access-token': authToken,
      },
    })
      .then(response => response.data.data)
      .then((incidents) => {
        this.setState({
          incidents,
          incidentsLoadingState: 'fetched',
        });
      })
      .catch(() => {
        this.setState({
          incidentsLoadingState: 'error',
        });
      });
  }

  incidentStatusView(status) {
    return (
      <span>
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
    const { incidents, incidentsLoadingState } = this.state;

    return (
      <Template>
        <div className="user-incidents">
          <div className="container">
            <div className="header-container">
              <div className="clearfix">
                <span className="header">{this.type === 'intervention' ? 'Interventions' : 'Red Flags'}</span>
                <Link to={`${this.type}/new`} className="button small f-right" style={{ marginLeft: '20px' }}>
                  <i className="fa fa-pencil" />
                  {' '}
                  Create
                  {' '}
                  {this.type === 'intervention' ? 'an Intervention' : 'a Red Flag'}
                </Link>
              </div>
            </div>

            <div className="filter-container clearfix">
              <div className="f-right">
                <div className="search-box">
                  <input type="text" placeholder="Search title" name="q" className="text-field" />
                  <button type="button"><i className="fa fa-search" /></button>
                </div>
              </div>

              <ul className="tab f-left">
                <li><a href="#">Pending</a></li>
                <li><a href="#">Resolved</a></li>
                <li><a href="#">Under Investigation</a></li>
                <li><a href="#">Rejected</a></li>
                <li className="active"><a href="#">All</a></li>
              </ul>
            </div>

            <div className="content" id="incidents">
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
                    {incidentsLoadingState === 'loading' ? (
                      <TableRowLoadingSkeletonScreen rows={3} cols={5} />
                    ) : (
                      incidents.map((incident, index) => (
                        <tr key={index.toString()}>
                          <td>{index + 1}</td>
                          <td>
                            <Link to={`/${this.type}/${incident.id}`}>
                              {incident.title}
                            </Link>
                          </td>
                          <td>{incident.createdon}</td>
                          <td>{this.incidentStatusView(incident.status)}</td>
                          <td className="actions">
                            <Link to="/">
                              <i className="fa fa-pencil-alt" />
                              {' '}
                              Edit
                            </Link>
                            <Link to="/">
                              <i className="fa fa-trash" />
                              {' '}
                              Delete
                            </Link>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </Template>
    );
  }
}

ViewIncidentList.propTypes = {
  match: objectProp.isRequired,
  authToken: stringProp.isRequired,
};

const state2props = state => ({
  authToken: state.usersReducer.user.authToken,
});

export default connect(state2props)(ViewIncidentList);
