import React from 'react';
import ReactDOM from 'react-dom';
import Game from './components/Game/index.js';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Game />, document.getElementById('root'));
registerServiceWorker();
