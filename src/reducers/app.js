import { appAction } from '../actiontypes/app';

export default (state={ ready: false }, action) => {
  if (action.type === appAction.READY) {
    state.ready = true;
  }

  return state;
};
