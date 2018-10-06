import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import './common.scss';
import { BrowserRouter as Router } from 'react-router-dom';
import rootReducer from './reducers';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

const store = createStore(rootReducer)

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
