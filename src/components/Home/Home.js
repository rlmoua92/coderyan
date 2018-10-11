import React from 'react';
import NavBar from '../NavBar';
import Modal from '../Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import './Home.scss';

const Home = (props) => {
  const {
    randKey,
    onRoomKeyChange,
    useTimer,
    onTimerCheck,
    timerMaxSeconds,
    onTimerMaxChange,
    isSpyMaster,
    onSpyMasterClick,
    onStartGame,
  } = props;

  const roomType = "cn";

  const settingsContent = 
    <div className="flex flex-column flex-100">
      <h2>SETTINGS</h2>
      <div className="timer-settings">
        <label>
          <input type="checkbox" checked={useTimer} onChange={onTimerCheck} />
          Use Timer
        </label>
        {useTimer ?
        <div>
          <input type="number" value={timerMaxSeconds} onChange={onTimerMaxChange} /> seconds
        </div> : 
          null
        }
      </div>
      <div>
        <label>
          <input type="checkbox" checked={isSpyMaster} onChange={onSpyMasterClick} />
          Spymaster
        </label>
      </div>
    </div>;
  const settingsButton = <FontAwesomeIcon icon={faCog} />;

  const rightContent = 
  <div className="nav-settings">
    <Modal
      modalContent={settingsContent}
      buttonContent={settingsButton}
    />
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
          <Link to={"/" + roomType + "/" + randKey} className="button flex-100" onClick={onStartGame}>START GAME</Link>
        </div>
      </div>
    </div>
  );
}

export default Home;