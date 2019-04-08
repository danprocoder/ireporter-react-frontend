import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../../../assets/scss/admin/nav.scss';

class TopNav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showUserDropdown: false,
    };
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
                <li><a href="#" className="auth-logout">Logout</a></li>
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
};

const state2props = state => ({
  username: state.usersReducer.user.data.username,
});

export default connect(state2props)(TopNav);
