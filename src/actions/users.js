import userAction from '../actiontypes/users';

export default {
  logUserIn(token, data) {
    return {
      type: userAction.LOG_IN,
      payload: {
        authToken: token,
        data,
      },
    };
  },

  logUserOut() {
    window.localStorage.removeItem('authToken');

    return {
      type: userAction.LOGOUT,
    };
  },
};
