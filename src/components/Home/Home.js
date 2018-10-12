import React, { Component} from 'react';
import NavBar from '../NavBar';
import GameSettings from '../GameSettings';
import { Link } from 'react-router-dom';
import './Home.scss';

class Home extends Component {

  componentDidMount(){
    this.props.newGame();
  }

  render() {
    const {
      randKey,
      onRoomKeyChange,
      onStartGame,
      gameType,
    } = this.props;
  
    const rightContent = 
    <div className="nav-settings">
      <GameSettings />
    </div>;
  
    return (
      <div className="flex flex-column height-100">
        <NavBar rightContent={rightContent} />
        <div className="home flex v-align-center">
          <div className="home-content flex flex-column">
            <h1>.codeRyan</h1>
            <div className="roomKey">
              <label>ENTER A ROOM KEY:</label>
              <input type="text" value={randKey} onChange={onRoomKeyChange} />
              {randKey.length <= 0 ? <div className="input-error">ERROR: KEY CANNOT BE BLANK</div> : null}
            </div>
            <Link to={"/" + gameType + "/" + randKey} className="button flex-100" onClick={onStartGame}>START GAME</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;