import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { userActionCreator } from '../actions/users.js';
import LoadingButton from './LoadingButton';
import FormErrorText from './FormErrorText';
import '../../assets/css/form.css';
import '../../assets/css/user-form.css';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      fieldValues: {
        email: '',
        password: ''
      },
      fieldError: {
        email: '',
        password: ''
      },
      isWorking: false
    }
  }

  onChange(e) {
    const state = this.state;
    const target = e.target;
    state.fieldValues[target.name] = target.value;
    this.setState(state);
  }
  
  authenticateUser() {
    const { dispatch } = this.props;

    const { email, password } = this.state.fieldValues;

    const workingState = this.state;
    workingState.isWorking = true;
    this.setState(workingState);

    axios.post(`${API_HOST}/auth/login`, { email, password })
      .then((response) => {
        const data = response.data.data[0];
        localStorage.setItem('authToken', data.token);

        window.location = (data.user.isAdmin ? '/admin' : '/dashboard');
      })
      .catch((error) => {
        const state = this.state;
        state.isWorking = false;

        if (error.response) {
          if (typeof error.response.data.error == 'object') {
            state.fieldError = error.response.data.error;
          } else {
            // Snackbar goes here.
          }
        }

        this.setState(state);
      });
  }
  
  render() {
    return (
      <div class="form-container">
        <form role="form" class="login" id="login-form" onSubmit={(e) => e.preventDefault()}>
          <div class="header-container">
            <div class="header t-center">Log In</div>
          </div>
          <div class="field-section">
            <label>Your Email</label>
            <input type="text" name="email" class="text-field" onChange={this.onChange.bind(this)} />
            <FormErrorText message={this.state.fieldError.email} />
          </div>
          <div class="field-section">
            <label>Your Password</label>
            <input type="password" name="password" class="text-field" onChange={this.onChange.bind(this)} />
            <FormErrorText message={this.state.fieldError.password} />
          </div>
          <div class="field-section t-center button-section">
            <LoadingButton loading={this.state.isWorking} value="Log In" onClick={this.authenticateUser.bind(this)} />
          </div>
        </form>
      </div>
    );
  }
}

export default connect()(Login);
