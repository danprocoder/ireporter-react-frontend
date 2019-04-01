import { appAction } from '../actiontypes/app';

export default (state={ state: 'loaded' }, action) => {
  if (action.type === appAction.READY) {
    state.state = 'ready';
  }

  return state;
};
