import React, { Component } from 'react';
import { func as funcProps, string as stringProps } from 'prop-types';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { appAction } from '../actiontypes/app';
import { userActionCreator } from '../actions/users';
import HomeView from './Home';
import Login from './Login';
import Signup from './Signup';
import AdminDashboard from './admin/Dashboard';
import AdminUsers from './admin/Users';
import AdminIncidents from './admin/Incidents';
import AdminViewIncident from './admin/ViewIncident';
import UserLandingPage from './user/LandingPage';
import UserCreateIncident from './user/CreateIncident';
import UserViewIncidentList from './user/ViewIncidentList';
import NotFound from './NotFound';
import '../../assets/scss/loading-page.scss';
import '../../assets/css/app.css';

class IReporter extends Component {
  componentWillMount() {
    const { dispatch } = this.props;

    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      axios.get('auth', {
        baseURL: API_HOST,
        headers: {
          'x-access-token': authToken,
        },
      })
        .then((response) => {
          dispatch(userActionCreator.logUserIn(authToken, response.data.data[0]));
          dispatch({ type: appAction.READY });
        })
        .catch(() => {
        });
    } else {
      dispatch({ type: appAction.READY });
    }
  }

  render() {
    const { appState } = this.props;

    if (appState !== 'ready') {
      return (
        <div className="loading-page">
          <div className="center">
            <div className="icon">
              <i className="fa fa-bullhorn fa-2x" />
            </div>
            <br />
            <div className="circle-container">
              <span className="circle circle-1" />
              <span className="circle circle-2" />
              <span className="circle circle-3" />
              <span className="circle circle-4" />
            </div>
          </div>
        </div>
      );
    }

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={HomeView} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />

          <Route path="/dashboard" component={UserLandingPage} />

          <Route key="new-red-flag" path="/red-flag/new" render={props => <UserCreateIncident incidentType="red-flag" {...props} />} />
          <Route key="new-intervention" path="/intervention/new" render={props => <UserCreateIncident incidentType="intervention" {...props} />} />

          <Route key="user-red-flags" path="/red-flags" component={UserViewIncidentList} />
          <Route key="user-interventions" path="/interventions" component={UserViewIncidentList} />

          <Route path="/(red-flag|intervention)/edit/:id" />
          <Route path="/(red-flag|intervention)/:id" />
          <Route path="/profile" />

          {/* Admin routes. */}
          <Route key="red-flags" path="/admin/red-flags" render={props => <AdminIncidents type="red-flag" {...props} />} />
          <Route key="interventions" path="/admin/interventions" render={props => <AdminIncidents type="intervention" {...props} />} />

          <Route key="view-red-flag" path="/admin/red-flag/:id" component={AdminViewIncident} />
          <Route key="view-intervention" path="/admin/intervention/:id" component={AdminViewIncident} />

          <Route path="/admin/users" component={AdminUsers} />
          <Route exact path="/admin" component={AdminDashboard} />

          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    );
  }
}

IReporter.propTypes = {
  dispatch: funcProps.isRequired,
  appState: stringProps.isRequired,
};

const state2Props = state => ({
  appState: state.appReducer.state,
});

export default connect(state2Props)(IReporter);
