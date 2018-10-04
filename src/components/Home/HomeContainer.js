import React, { Component }  from 'react';
import { getRandomString } from '../../common.js';
import Home from './Home.js';

class HomeContainer extends Component {
  constructor(props) {
    super(props);

    const roomKey = getRandomString(5);

    this.state= {
      randKey: roomKey,
    }

    this.onRoomKeyChange = this.onRoomKeyChange.bind(this);
  }

  onRoomKeyChange(e) {
    this.setState({
      randKey: e.target.value
    });
  }

  render() {
    const {
      randKey 
    } = this.state;

    return (
      <Home 
        randKey = {randKey}
        onRoomKeyChange= {this.onRoomKeyChange}
      />
    );
  }
}

export default HomeContainer;