import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { appAction } from '../actiontypes/app';
import { userActionCreator } from '../actions/users';
import Nav from './Nav';
import Home from './Home.jsx';
import Login from './Login';
import Signup from './Signup';
import AdminDashboard from './admin/Dashboard';
import AdminUsers from './admin/Users';
import AdminIncidents from './admin/Incidents.jsx';
import AdminViewIncident from './admin/ViewIncident.jsx';
import NotFound from './NotFound';
import '../../assets/css/app.css';

class IReporter extends React.Component {
  componentWillMount() {
    const { dispatch } = this.props;

    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      axios.get('auth', {
        baseURL: API_HOST,
        headers: {
          'x-access-token': authToken,
        }
      })
        .then(response => {
          dispatch(userActionCreator.logUserIn(authToken, response.data.data[0]));
          dispatch({ type: appAction.READY });
        })
        .catch(error => {
          console.error(error);
        });
    } else {
      dispatch({ type: appAction.READY });
    }
  }

  render() {
    if (this.props.appState !== 'ready') {
      return null;
    }

    return (
      <BrowserRouter>
        <div>
          <Nav />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />

            <Route path="/dashboard" />
            <Route path="/(red-flag|intervention)/new" />
            <Route path="/(red-flag|intervention)s" />
            <Route path="/(red-flag|intervention)/edit/:id" />
            <Route path="/(red-flag|intervention)/:id" />
            <Route path="/profile" />

            {/* Admin routes. */}
            <Route key="red-flags" path="/admin/red-flags" render={(props) => <AdminIncidents type="red-flag" {...props} />} />
            <Route key="interventions" path="/admin/interventions" render={(props) => <AdminIncidents type="intervention" {...props} />} />

            <Route key="view-red-flag" path="/admin/red-flag/:id" component={AdminViewIncident} />
            <Route key="view-intervention" path="/admin/intervention/:id" component={AdminViewIncident} />

            <Route path="/admin/users" component={AdminUsers} />
            <Route exact path="/admin" component={AdminDashboard} />
            
            <Route component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

const state2Props = (state) => {
  return {
    appState: state.appReducer.state,
  };
};

export default connect(state2Props)(IReporter);
