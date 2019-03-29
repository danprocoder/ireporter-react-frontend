import { userAction } from '../actiontypes/users';
import axios from 'axios';

export const userActionCreator = {
  logUserIn(token, data) {
    return {
      type: userAction.LOG_IN,
      payload: {
        authToken: token,
        data
      }
    };
  },

  logUserOut() {
    return {
      type: userAction.LOGOUT
    };
  }
};
