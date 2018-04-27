import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";

import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import "./dist/semantic.min.css";
import "./index.css";
import lawReducer from "./store/reducers/law";
import searchReducer from "./store/reducers/search";
import newsReducer from "./store/reducers/news";
import { watchGetLaws, watchNews } from "./store/sagas/index";

const composeEnhancers =
  process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || compose;

const rootReducer = combineReducers({
  laws: lawReducer,
  search: searchReducer,
  news: newsReducer
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(watchGetLaws);
sagaMiddleware.run(watchNews);

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));
registerServiceWorker();
