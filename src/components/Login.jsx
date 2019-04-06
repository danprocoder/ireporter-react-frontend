import React, { Component } from 'react';
import axios from 'axios';
import LoadingButton from './LoadingButton.jsx';
import FormErrorText from './FormErrorText';
import '../../assets/css/form.css';
import '../../assets/css/user-form.css';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      fieldValues: {
        email: '',
        password: '',
      },
      fieldError: {
        email: '',
        password: '',
      },
      isWorking: false,
    };
  }

  onChange({ target }) {
    const { fieldValues } = this.state;

    fieldValues[target.name] = target.value;
    this.setState({
      fieldValues,
    });
  }

  authenticateUser() {
    const { fieldValues } = this.state;

    const workingState = this.state;
    workingState.isWorking = true;
    this.setState(workingState);

    axios.post(`${API_HOST}/auth/login`, {
      email: fieldValues.email,
      password: fieldValues.password,
    })
      .then((response) => {
        const data = response.data.data[0];
        localStorage.setItem('authToken', data.token);

        window.location = (data.user.isAdmin ? '/admin' : '/dashboard');
      })
      .catch((error) => {
        const newState = this.state;
        newState.isWorking = false;

        if (error.response) {
          if (typeof error.response.data.error === 'object') {
            newState.fieldError = error.response.data.error;
          } else {
            // Snackbar goes here.
          }
        }

        this.setState(newState);
      });
  }

  render() {
    const { fieldError, isWorking } = this.state;

    return (
      <div className="form-container">
        <form className="login" id="login-form" onSubmit={e => e.preventDefault()}>
          <div className="header-container">
            <div className="header t-center">Log In</div>
          </div>
          <div className="field-section">
            <label htmlFor="email-field">Your Email</label>
            <input type="text" id="email-field" name="email" className="text-field" onChange={this.onChange.bind(this)} />
            <FormErrorText message={fieldError.email} />
          </div>
          <div className="field-section">
            <label htmlFor="password-field">Your Password</label>
            <input type="password" id="password-field" name="password" className="text-field" onChange={this.onChange.bind(this)} />
            <FormErrorText message={fieldError.password} />
          </div>
          <div className="field-section t-center button-section">
            <LoadingButton loading={isWorking} value="Log In" onClick={() => this.authenticateUser()} />
          </div>
        </form>
      </div>
    );
  }
}

export default Login;