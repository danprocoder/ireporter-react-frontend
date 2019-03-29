import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Nav from './Nav';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import AdminDashboard from './admin/Dashboard';
import NotFound from './NotFound';
import '../../assets/css/app.css';

class IReporter extends React.Component {
  render() {
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
            <Route path="/admin" component={AdminDashboard} />
            <Route path="/admin/(red-flag|intervention)s" />
            <Route path="/admin/(red-flag|intervention)/:id" />
            <Route path="/admin/users" />
            
            <Route component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default connect()(IReporter);
