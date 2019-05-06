import React, { Component } from 'react';
import { func as funcProp, object as objectProp, bool as boolProp } from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DefaultNavBar from './DefaultNav';
import LoadingButton from './LoadingButton';
import FormErrorText from './FormErrorText';
import userAction from '../actions/users';
import '../../assets/css/form.css';
import '../../assets/scss/user-form.scss';

class Signup extends Component {
  constructor(props) {
    super(props);

    const { isLoggedIn, user, history } = props;

    if (isLoggedIn) {
      history.push(user.isAdmin ? '/admin' : '/dashboard');
    }

    this.state = {
      fieldValues: {
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        phoneNumber: '',
        password: '',
      },
    };
  }

  componentWillReceiveProps(nextProps) {
    const { isLoggedIn, user, history } = nextProps;

    if (isLoggedIn) {
      history.push(user.isAdmin ? '/admin' : '/dashboard');
    }
  }

  onTextEntered({ target }) {
    const { fieldValues } = this.state;

    fieldValues[target.name] = target.value;

    this.setState({ fieldValues });
  }

  submitForm(event) {
    const { signUp } = this.props;

    const { fieldValues } = this.state;

    signUp(fieldValues);

    if (event) {
      event.preventDefault();
    }
  }

  render() {
    const { fieldErrors, isCreatingUser } = this.props;

    return (
      <div>
        <DefaultNavBar />
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
                    loading={isCreatingUser}
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

Signup.propTypes = {
  signUp: funcProp.isRequired,
  history: objectProp.isRequired,
  isLoggedIn: boolProp.isRequired,
  user: objectProp.isRequired,
  isCreatingUser: boolProp.isRequired,
  fieldErrors: objectProp.isRequired,
};

const state2props = ({ usersReducer }) => ({
  isCreatingUser: usersReducer.isCreatingUser,
  fieldErrors: usersReducer.signUpFieldErrors,
  isLoggedIn: usersReducer.user.data != null,
  user: usersReducer.user,
});

const dispatch2props = dispatch => bindActionCreators({
  signUp: userAction.createNewUser,
}, dispatch);

export default connect(state2props, dispatch2props)(Signup);
