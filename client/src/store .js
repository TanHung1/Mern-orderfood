import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import cartReducer from "./reducers/reducers";

const rootReducer = combineReducers({
  cartReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
