import { combineReducers } from "redux";
import studentReducers from "./studentReducers";

export default combineReducers({
  schools: studentReducers
});
