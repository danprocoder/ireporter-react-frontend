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
  isLoggingIn: false,
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
    default:
      return newState;
  }
  return newState;
};
