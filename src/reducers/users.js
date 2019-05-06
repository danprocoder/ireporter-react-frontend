import userAction from '../actiontypes/users';

const getInitialState = () => ({
  user: {
    authToken: null,
    data: null,
  },
  authFieldErrors: {
    email: '',
    password: '',
  },
  signUpFieldErrors: {
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    phoneNumber: '',
    password: '',
  },
  isLoggingIn: false,
  isCreatingUser: false,
});

export default (state = getInitialState(), action) => {
  let newState = { ...state };
  switch (action.type) {
    case userAction.LOG_IN:
      newState.user = action.payload;
      break;
    case userAction.LOGOUT:
      newState = getInitialState();
      break;
    case userAction.LOGGING_IN:
      newState.isLoggingIn = true;
      break;
    case userAction.LOG_IN_ERROR:
      newState.isLoggingIn = false;
      if (action.payload.fieldErrors) {
        newState.authFieldErrors = action.payload.fieldErrors;
      }
      break;
    case userAction.CREATING_USER:
      newState.isCreatingUser = true;
      break;
    case userAction.CREATE_USER_ERROR:
      newState.isCreatingUser = false;
      if (action.payload.fieldErrors) {
        newState.signUpFieldErrors = action.payload.fieldErrors;
      }
      break;
    default:
      return newState;
  }
  return newState;
};
