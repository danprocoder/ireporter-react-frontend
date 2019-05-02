import userAction from '../actiontypes/users';

const initialState = {
  user: {
    authToken: null,
    data: null,
  },
};

export default (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case userAction.LOG_IN:
      newState.user = action.payload;
      break;
    case userAction.LOGOUT:
      newState.user = {
        authToken: null,
        data: null,
      };
      break;
    default:
      return newState;
  }
  return newState;
};
