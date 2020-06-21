import * as firebase from "firebase/app";
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import registerServiceWorker from "./registerServiceWorker";
import "./common.scss";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "./store/ConfigureStore";
import { windowResize } from "./actions";

const store = configureStore();

window.addEventListener("resize", () => {
  store.dispatch(windowResize(window.innerWidth, window.innerHeight));
});

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDrRqZdsUi5IqoB4ms2KvTL2zkEIpYFPuI",
  authDomain: "coderyan-7bba9.firebaseapp.com",
  databaseURL: "https://coderyan-7bba9.firebaseio.com",
  projectId: "coderyan-7bba9",
  storageBucket: "coderyan-7bba9.appspot.com",
  messagingSenderId: "212457522408",
  appId: "1:212457522408:web:e73326cd6b4bfccd00b55d",
  measurementId: "G-JZ6D9N0E9W"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
