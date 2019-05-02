import { combineReducers } from 'redux';
import usersReducer from './users';
import appReducer from './app';

export default combineReducers({
  usersReducer,
  appReducer,
});
