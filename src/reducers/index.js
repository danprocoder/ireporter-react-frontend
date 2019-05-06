import { combineReducers } from 'redux';
import usersReducer from './users';
import appReducer from './app';
import incidentsReducer from './incidents';

export default combineReducers({
  usersReducer,
  appReducer,
  incidentsReducer,
});
