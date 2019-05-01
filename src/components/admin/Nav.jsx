import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import userActionCreator from '../../actions/users';
import '../../../assets/scss/admin/nav.scss';

class TopNav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showUserDropdown: false,
    };
  }

  onLogoutClicked(e) {
    const { logout, history } = this.props;

    logout();
    history.push('/');

    e.preventDefault();
  }

  toggleUserDropdownDisplay() {
    const { showUserDropdown } = this.state;
    this.setState({
      showUserDropdown: !showUserDropdown,
    });
  }

  render() {
    const { username } = this.props;

    const { showUserDropdown } = this.state;

    return (
      <div id="top" className="float-area">
        <div className="sitename f-left">
          <a href="index.html">
            <i className="fa fa-bullhorn" />
            {' '}
            <span className="hide-responsive text">iReporter</span>
          </a>
        </div>

        <a href="#" className="f-left responsive-toggle"><i className="fa fa-bars" /></a>

        <ul className="navbar-menu f-right">
          <li>
            <a href="#"><i className="fa fa-bell" /></a>
          </li>
          <li className="dropdown">
            <a href="#" onClick={() => this.toggleUserDropdownDisplay()}>
              {username}
              {' '}
              <i className="fa fa-angle-down" />
            </a>
            {showUserDropdown && (
            <div className="dropdown-menu">
              <ul>
                <li><a href="#" className="auth-logout" onClick={e => this.onLogoutClicked(e)}>Logout</a></li>
              </ul>
            </div>
            )}
          </li>
        </ul>
        <div className="clearfix" />
      </div>
    );
  }
}

TopNav.propTypes = {
  username: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

const state2props = state => ({
  username: state.usersReducer.user.data.username,
});

const dispatch2props = dispatch => bindActionCreators({
  logout: userActionCreator.logUserOut,
}, dispatch);

export default withRouter(connect(state2props, dispatch2props)(TopNav));
