import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";

import App from "./app";
import store from "./services/store";


const rootContainer = document.getElementById("root");

render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootContainer
);