import { post as axiosPost, get as axiosGet } from 'axios';
import { toast } from 'react-toastify';
import userAction from '../actiontypes/users';
import appAction from '../actiontypes/app';
import 'react-toastify/dist/ReactToastify.css';

export default {
  logUserIn(login, password) {
    return (dispatch) => {
      dispatch({ type: userAction.LOGGING_IN });

      axiosPost('auth/login', {
        email: login,
        password,
      }, {
        baseURL: API_HOST,
      })
        .then(response => response.data.data[0])
        .then(({ token, user }) => {
          localStorage.setItem('authToken', token);

          dispatch({
            type: userAction.LOG_IN,
            payload: {
              authToken: token,
              data: user,
            },
          });
        })
        .catch((error) => {
          const action = { type: userAction.LOG_IN_ERROR, payload: {} };
          if (typeof error.response.data.error === 'object') {
            action.payload.fieldErrors = error.response.data.error;
          } else {
            toast.error('Incorrect email/password');
          }

          dispatch(action);
        });
    };
  },

  fetchUserDetails(authToken) {
    return (dispatch) => {
      if (authToken) {
        axiosGet('auth', {
          baseURL: API_HOST,
          headers: {
            'x-access-token': authToken,
          },
        })
          .then((response) => {
            dispatch({
              type: userAction.LOG_IN,
              payload: {
                authToken,
                data: response.data.data[0],
              },
            });
            dispatch({ type: appAction.READY });
          })
          .catch(() => {
          });
      } else {
        dispatch({ type: appAction.READY });
      }
    };
  },

  createNewUser(fieldData) {
    return dispatch => 1;
  },

  logUserOut() {
    window.localStorage.removeItem('authToken');

    return {
      type: userAction.LOGOUT,
    };
  },
};
