import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import Template from './Template';
import TableRowLoading from '../skeletonscreens/TableRowLoading';
import '../../../assets/css/tab.css';

class Incident extends Component {
  constructor(props) {
    super(props);

    const type = props.type;
    this.state = {
      title: (type === 'red-flag' ? 'Red Flags' : 'Interventions'),
      incidents: [],
      incidentsState: 'fetching'
    };
  }

  fetchIncidents() {
    axios.get(`${this.props.type}s`, {
      baseURL: API_HOST,
      headers: {
        'x-access-token': this.props.user.authToken
      }
    })
      .then(response => {
        this.setState({
          incidents: response.data.data,
          incidentsState: 'loaded'
        });
      })
      .catch(error => {

      });
  }

  componentWillMount() {
    this.fetchIncidents();
  }

  render() {
    return (
      <Template>

        <div class="content">
          <div class="inner">
            <div class="navigation header">{this.state.title}</div>

            <div>
              <div class="filter-container clearfix">

                <div class="f-right">
                  <div class="search-box">
                    <input type="text" placeholder="Search title" name="q" class="text-field" />
                    <button><i class="fa fa-search"></i></button>
                  </div>
                </div>

                <ul class="tab f-left">
                  <li><a href="#">In Draft</a></li>
                  <li><a href="#">Resolved</a></li>
                  <li><a href="#">Investigating</a></li>
                  <li><a href="#">Rejected</a></li>
                  <li class="active"><a href="#">All</a></li>
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
                      {this.state.incidentsState === 'fetching' ? (
                      <TableRowLoading cols={5} rows={3} />
                      ) : (
                      this.state.incidents.map((record, index) => <tr>
                        <td>{index + 1}</td>
                        <td><Link to={`/admin/${this.props.type}/${record.id}`}>{record.title}</Link></td>
                        <td>{record.createdon}</td>
                        <td>{record.status}</td>
                        <td>Like</td>
                      </tr>)
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
				    </div>
          </div>	
        </div>

      </Template>
    )
  }
}

const state2props = (state) => {
  const reducer = state.usersReducer;
  const { authToken } = reducer.user;
  return {
    user: {
      authToken,
    }
  }
};
export default connect(state2props)(Incident);
