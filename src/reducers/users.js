import { userAction } from '../actiontypes/users';

export default (state, action) => {
  const newState = { ...state };
  switch (action.type) {
    case userAction.LOG_IN:
      newState.user = action.payload;
      break;
    case userAction.LOGOUT:
      newState.user = null;
      break;
  }
  return newState;
};
