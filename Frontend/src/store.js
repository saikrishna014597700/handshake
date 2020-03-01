import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers/index";

const initiaState = {};

const middleware = [thunk];

const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  initiaState,
  storeEnhancers(applyMiddleware(...middleware))
);

export default store;
