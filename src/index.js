import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import { ThemeProviderComponent } from './context/Theme'; 

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProviderComponent>
        <Router>
          <App />
        </Router>
      </ThemeProviderComponent>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
