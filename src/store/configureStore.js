import { createStore, compose } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from "../reducers/rootReducer.js";

// adding redux dev tools extension
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//config for store persistor andd setting it up in localStorage
const persistConfig = {
  key: "primary",
  storage
};

//define what reducers we need to persist
const reducersToPersist = persistReducer(persistConfig, rootReducer);

//define store
const store = createStore(reducersToPersist, composeEnhancers());

export const persistor = persistStore(store);
//define persistor object to Window object, to purge store from console
window.persistor = persistor;
export default store;
