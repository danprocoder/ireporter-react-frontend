import React, { Component } from 'react';
import { func as funcProps, string as stringProps } from 'prop-types';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ToastContainer, Bounce } from 'react-toastify';
import userActionCreator from '../actions/users';
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
import UserViewIncident from './user/ViewIncident';
import UserProfilePage from './user/UserProfile';
import UserEditIncident from './user/EditIncident';
import NotFound from './NotFound';
import '../../assets/scss/loading-page.scss';
import '../../assets/css/app.css';

class IReporter extends Component {
  componentWillMount() {
    const { verifyToken } = this.props;

    const authToken = localStorage.getItem('authToken');
    verifyToken(authToken);
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

          <Route key="user-edit-red-flag" path="/red-flag/edit/:id" component={props => <UserEditIncident incidentType="red-flag" {...props} />} />
          <Route key="user-edit-intervention" path="/intervention/edit/:id" component={props => <UserEditIncident incidentType="intervention" {...props} />} />

          <Route key="user-red-flag" path="/red-flag/:id" component={UserViewIncident} />
          <Route key="user-intervention" path="/intervention/:id" component={UserViewIncident} />

          <Route path="/profile" component={UserProfilePage} />

          {/* Admin routes. */}
          <Route key="red-flags" path="/admin/red-flags" render={props => <AdminIncidents type="red-flag" {...props} />} />
          <Route key="interventions" path="/admin/interventions" render={props => <AdminIncidents type="intervention" {...props} />} />

          <Route key="view-red-flag" path="/admin/red-flag/:id" component={AdminViewIncident} />
          <Route key="view-intervention" path="/admin/intervention/:id" component={AdminViewIncident} />

          <Route path="/admin/users" component={AdminUsers} />
          <Route exact path="/admin" component={AdminDashboard} />

          <Route component={NotFound} />
        </Switch>
        <ToastContainer
          pauseOnFocusLoss={false}
          transition={Bounce}
          className="toast-container"
          toastClassName="default-toast"
          autoClose={4000}
          position="top-right"
        />
      </BrowserRouter>
    );
  }
}

IReporter.propTypes = {
  verifyToken: funcProps.isRequired,
  appState: stringProps.isRequired,
};

const state2Props = state => ({
  appState: state.appReducer.state,
});

const dispatch2props = dispatch => bindActionCreators({
  verifyToken: userActionCreator.fetchUserDetails,
}, dispatch);

export default connect(state2Props, dispatch2props)(IReporter);
