import { combineReducers } from 'redux';


import trackBoardData from './slices/trackBoardData';

const rootReducer = combineReducers({
  trackBoardData: trackBoardData,

});

export { rootReducer };
