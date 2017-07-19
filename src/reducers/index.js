import {combineReducers} from 'redux';
import courses from './courseReducer';
import authors from './authorReducer';
import ajaxCallsInProcess from './ajaxStatusReducer';


const rootReducer = combineReducers({
  courses,
  authors,
  ajaxCallsInProcess
});

export default rootReducer;
