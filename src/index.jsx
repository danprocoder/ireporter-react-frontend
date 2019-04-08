import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers';
import IReporter from './components/IReporter';

const store = createStore(reducers);

ReactDOM.render(
  <Provider store={store}>
    <IReporter />
  </Provider>,
  document.getElementById('root'),
);
