import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import './common.scss';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from './store/ConfigureStore';
import { getRandomString } from './common.js';
import { windowResize } from './actions';

const roomKey = (window.location.pathname === "/" ? getRandomString(5) : window.location.pathname.replace(/\/(.*?)\//,'').replace('/',''));
const gameType = "cn";
const initialState = { roomKey, gameType };
const store = configureStore(initialState);

window.addEventListener('resize', () => {
	store.dispatch(windowResize(window.innerWidth, window.innerHeight));
});

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
