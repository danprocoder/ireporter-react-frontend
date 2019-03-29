import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import axios from 'axios';
import { appAction } from './actiontypes/app';
import { userActionCreator } from './actions/users';
import reducers from './reducers';
import IReporter from './components/IReporter';

const store = createStore(reducers);
const authToken = localStorage.getItem('authToken');
if (authToken) {
  axios.get('auth', {
    baseURL: API_HOST,
    headers: {
      'x-access-token': authToken
    }
  })
    .then(response => {
      store.dispatch({ type: appAction.READY });
      store.dispatch(userActionCreator.logUserIn(authToken, response.data.data[0]));
    });
} else {
  store.dispatch(appAction.READY);
}

ReactDOM.render(
  <Provider store={store}>
    <IReporter/>
  </Provider>,
  document.getElementById('root'));
