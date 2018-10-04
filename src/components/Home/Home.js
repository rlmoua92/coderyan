import React, { Component }  from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { getRandomString } from '../../common.js';

class Home extends Component {
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
      <div className="home-page">
        <h1>.codeRyan</h1>
        <div className="roomKey">
          <label>ROOM KEY</label> <input type="text" value={randKey} onChange={this.onRoomKeyChange} />
        </div>
        <Link to={"/" + randKey} className="button">START GAME</Link>
      </div>
    );
  }
}

export default Home;