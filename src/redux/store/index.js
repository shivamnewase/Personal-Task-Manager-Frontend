import { legacy_createStore as createStore, applyMiddleware, compose } from "redux";
import {thunk} from "redux-thunk";
import rootReducer from "../reducer";


const initialState = {};
const middleware = [thunk];

const middlewareEnhancer = compose(applyMiddleware(...middleware));

const store = createStore(rootReducer, initialState, middlewareEnhancer);

export default store;