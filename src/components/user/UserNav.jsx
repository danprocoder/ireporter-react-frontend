import React, { Component } from 'react';
import { string as stringProp, object as objectProp, func as funcProp } from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import userActionCreator from '../../actions/users';
import '../../../assets/scss/user/user-nav.scss';

class UserNav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showUserDropdown: false,
    };
  }

  componentDidMount() {
    window.matchMedia('(min-width: 769px)').addListener(() => {
      this.navBar.classList.remove('shown');
    });
  }

  onLogoutClicked(e) {
    const { logout, history } = this.props;

    logout();
    history.push('/');

    e.preventDefault();
  }

  toggleUserDropdown(e) {
    const { showUserDropdown } = this.state;
    this.setState({ showUserDropdown: !showUserDropdown });

    e.preventDefault();
  }

  toggleNavMobile() {
    const { classList } = this.navBar;
    if (classList.contains('shown')) {
      classList.remove('shown');
    } else {
      classList.add('shown');
    }
  }

  render() {
    const { username } = this.props;

    const { showUserDropdown } = this.state;

    return (
      <div className="user-nav red-bg">
        <div id="navbar">
          <div className="container clearfix">
            <Link to="/dashboard" className="sitename f-left">
              <i className="fa fa-bullhorn" />
              {' '}
              iReporter
            </Link>
            <div className="navbar-menu f-right" ref={(ref) => { this.navBar = ref; }}>
              <ul>
                <li><Link to="/red-flags">Red Flags</Link></li>
                <li><Link to="/interventions">Interventions</Link></li>
                <li className="dropdown">
                  <a href="#" onClick={e => this.toggleUserDropdown(e)}>
                    {username}
                    {' '}
                    <i className="fa fa-angle-down" />
                  </a>
                  {showUserDropdown && (
                  <ul className="dropdown-menu">
                    <li><Link to="/profile">My Profile</Link></li>
                    <li><a href="#" className="auth-logout" onClick={e => this.onLogoutClicked(e)}>Log out</a></li>
                  </ul>
                  )}
                </li>
              </ul>
            </div>
            <button
              className="nav-toggle-responsive f-right"
              type="button"
              onClick={() => this.toggleNavMobile()}
            >
              <i className="fa fa-bars" />
            </button>
          </div>
        </div>
      </div>
    );
  }
}

UserNav.propTypes = {
  username: stringProp.isRequired,
  logout: funcProp.isRequired,
  history: objectProp.isRequired,
};

const dispatch2props = dispatch => bindActionCreators({
  logout: userActionCreator.logUserOut,
}, dispatch);

const state2props = state => ({
  username: state.usersReducer.user.data.username,
});

export default withRouter(connect(state2props, dispatch2props)(UserNav));
