import React, { Component } from 'react';
import { func as funcProp, object as objectProp, bool as boolProp } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DefaultNavBar from './DefaultNav';
import LoadingButton from './LoadingButton';
import FormErrorText from './FormErrorText';
import userAction from '../actions/users';
import '../../assets/css/form.css';
import '../../assets/scss/user-form.scss';

class Login extends Component {
  constructor(props) {
    super(props);

    const { isLoggedIn, user, history } = props;

    if (isLoggedIn) {
      history.push(user.isAdmin ? '/admin' : '/dashboard');
    }

    this.state = {
      fieldValues: {
        email: '',
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

  onChange({ target }) {
    const { fieldValues } = this.state;

    fieldValues[target.name] = target.value;
    this.setState({
      fieldValues,
    });
  }

  authenticateUser() {
    const { logIn } = this.props;
    const { fieldValues } = this.state;

    logIn(fieldValues.email, fieldValues.password);
  }

  render() {
    const { fieldErrors, isLoggingIn } = this.props;

    return (
      <div>
        <DefaultNavBar />
        <div className="user-form-container">
          <div className="form-container">
            <form className="login" id="login-form" onSubmit={e => e.preventDefault()}>
              <div className="header-container">
                <div className="header t-center">Log In</div>
              </div>
              <div className="field-section">
                <label htmlFor="email-field">Your Email</label>
                <input type="text" id="email-field" name="email" className="text-field" onChange={this.onChange.bind(this)} />
                <FormErrorText message={fieldErrors.email} />
              </div>
              <div className="field-section">
                <label htmlFor="password-field">Your Password</label>
                <input type="password" id="password-field" name="password" className="text-field" onChange={this.onChange.bind(this)} />
                <FormErrorText message={fieldErrors.password} />
              </div>
              <div className="field-section t-center button-section">
                <LoadingButton loading={isLoggingIn} value="Log In" onClick={() => this.authenticateUser()} />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  logIn: funcProp.isRequired,
  fieldErrors: objectProp.isRequired,
  isLoggingIn: boolProp.isRequired,
  isLoggedIn: boolProp.isRequired,
  user: objectProp.isRequired,
  history: objectProp.isRequired,
};

const state2props = ({ usersReducer }) => ({
  fieldErrors: usersReducer.authFieldErrors,
  isLoggingIn: usersReducer.isLoggingIn,
  isLoggedIn: usersReducer.user.data != null,
  user: usersReducer.user,
});

const dispatch2props = dispatch => bindActionCreators({
  logIn: userAction.logUserIn,
}, dispatch);

export default connect(state2props, dispatch2props)(Login);
