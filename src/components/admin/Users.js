import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Template from './Template';
import TableRowLoading from '../skeletonscreens/TableRowLoading';
import '../../../assets/css/table.css';
import '../../../assets/css/admin/table.css';

class Users extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      contentState: 'fetching'
    };
  }

  componentWillMount() {
    axios.get('admin/users', {
      baseURL: API_HOST,
      headers: {
        'x-access-token': this.props.user.authToken,
      }
    })
      .then(response => response.data.data)
      .then(responseData => {
        this.setState({
          users: responseData,
          contentState: 'loaded'
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <Template>

        <div className="content">
          <div className="inner">
            <div className="navigation header">Registered Users</div>
            <div className="preload users-container" id="users">
              <div className="table-wrapper">
                <table id="users-table" className="striped">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Fullname</th>
                      <th>Username</th>
                      <th>Email</th>
                      <th>Mobile</th>
                    </tr>
                  </thead>
                  <tbody>
                  {this.state.contentState === 'fetching' ? (
                    <TableRowLoading cols={5} rows={4} />
                  ) : (
                    this.state.users.map(user => (
                      <tr key={user.email}>
                        <td>&nbsp;</td>
                        <td>{user.firstname} {user.lastname}</td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>{user.phonenumber}</td>
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

const state2props = (state) => {
  const reducer = state.usersReducer;

  const isLoggedIn = (reducer.user.data != null);
  return {
    user: {
      isLoggedIn,
      authToken: isLoggedIn ? reducer.user.authToken : null
    }
  };
};

export default connect(state2props)(Users);
