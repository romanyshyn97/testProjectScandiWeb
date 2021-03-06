import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./rootReducer";


const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

// composeWithDevTools(applyMiddleware(...middleware)

export default store;