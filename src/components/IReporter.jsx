import React, { Component } from 'react';
import { func as funcProps, string as stringProps } from 'prop-types';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { appAction } from '../actiontypes/app';
import { userActionCreator } from '../actions/users';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import AdminDashboard from './admin/Dashboard';
import AdminUsers from './admin/Users';
import AdminIncidents from './admin/Incidents';
import AdminViewIncident from './admin/ViewIncident';
import UserLandingPage from './user/LandingPage';
import UserCreateIncident from './user/CreateIncident';
import NotFound from './NotFound';
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
        <div>
          <h1>iReporter</h1>
          <div>Loading....</div>
        </div>
      );
    }

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />

          <Route path="/dashboard" component={UserLandingPage} />

          <Route key="new-red-flag" path="/red-flag/new" render={props => <UserCreateIncident incidentType="red-flag" {...props} />} />
          <Route key="new-intervention" path="/intervention/new" render={props => <UserCreateIncident incidentType="intervention" {...props} />} />

          <Route path="/(red-flag|intervention)s" />
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
