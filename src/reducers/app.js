import { appAction } from '../actiontypes/app';

export default (state = { state: 'loaded' }, action) => {
  if (action.type === appAction.READY) {
    return {
      state: 'ready',
    };
  }

  return state;
};
