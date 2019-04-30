import React, { Component } from 'react';
import { post as axiosPost } from 'axios';
import DefaultNav from './DefaultNav';
import LoadingButton from './LoadingButton';
import FormErrorText from './FormErrorText';
import '../../assets/css/form.css';
import '../../assets/scss/user-form.scss';

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fieldValues: {
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        phoneNumber: '',
        password: '',
      },
      fieldErrors: {
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        phoneNumber: '',
        password: '',
      },
      isWorking: false,
    };
  }

  onTextEntered({ target }) {
    const { fieldValues } = this.state;

    fieldValues[target.name] = target.value;

    this.setState({ fieldValues });
  }

  submitForm(event) {
    const { fieldValues } = this.state;
    this.setState({
      isWorking: true,
    });

    axiosPost('auth/signup', fieldValues, {
      baseURL: API_HOST,
    })
      .then(response => response.data.data[0])
      .then((data) => {
        localStorage.setItem('authToken', data.token);

        window.location = (data.user.isAdmin ? '/admin' : '/dashboard');
      })
      .catch((error) => {
        const newState = { isWorking: false };
        if (error.response) {
          if (typeof error.response.data === 'object') {
            newState.fieldErrors = error.response.data.error;
          }
        }

        this.setState(newState);
      });

    if (event) {
      event.preventDefault();
    }
  }

  render() {
    const { isWorking, fieldErrors } = this.state;

    return (
      <div>
        <DefaultNav />
        <div className="user-form-container">
          <div className="form-container">
            <form className="signup" id="signup-form" method="post">
              <div className="header-container t-center">
                <div className="header">Sign Up</div>
                <hr />
                <small className="info">All fields are required</small>
              </div>
              <div className="padding">
                <div className="field-section grid-container clearfix">
                  <div className="grid-50">
                    <label htmlFor="firstname">Your Firstname</label>
                    <input type="text" name="firstname" id="firstname" className="text-field" onChange={this.onTextEntered.bind(this)} />
                    <FormErrorText message={fieldErrors.firstname} />
                  </div>
                  <div className="grid-50 m-top-768">
                    <label htmlFor="lastname">Your Lastname</label>
                    <input type="text" name="lastname" id="lastname" className="text-field" onChange={this.onTextEntered.bind(this)} />
                    <FormErrorText message={fieldErrors.lastname} />
                  </div>
                </div>
                <div className="field-section grid-container clearfix">
                  <div className="grid-50">
                    <label htmlFor="username">Your Username</label>
                    <input type="text" name="username" id="username" className="text-field" onChange={this.onTextEntered.bind(this)} />
                    <FormErrorText message={fieldErrors.username} />
                  </div>
                  <div className="grid-50 m-top-768">
                    <label htmlFor="email">Your Email</label>
                    <input type="text" id="email" name="email" className="text-field" onChange={this.onTextEntered.bind(this)} />
                    <FormErrorText message={fieldErrors.email} />
                  </div>
                </div>
                <div className="field-section grid-container clearfix">
                  <div className="grid-50">
                    <label htmlFor="phoneNumber">Your Mobile Number</label>
                    <input type="text" name="phoneNumber" id="phoneNumber" className="text-field" onChange={this.onTextEntered.bind(this)} />
                    <FormErrorText message={fieldErrors.phoneNumber} />
                  </div>
                  <div className="grid-50 m-top-768">
                    <label htmlFor="password">Your Password</label>
                    <input type="password" id="password" name="password" className="text-field" onChange={this.onTextEntered.bind(this)} />
                    <FormErrorText message={fieldErrors.password} />
                  </div>
                </div>
                <div className="field-section t-center button-section">
                  <LoadingButton
                    loading={isWorking}
                    value="Become a Reporter"
                    onClick={() => this.submitForm()}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Signup;
