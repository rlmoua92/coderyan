import React, { Component }  from 'react';
import Home from '../Home';
import Game from '../Game';
import { 
  Switch,
  Route,
} from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/:roomkey" exact component={Game} />
        <Route render={() => {return <h1>This page doesn't exist.</h1>;}} />
      </Switch>
    );
  }
}

export default App;