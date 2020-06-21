import React from 'react';
import Modal from '../Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import './GameSettings.scss';

const GameSettings = (props) => {
  const {
    useTimer,
    onTimerCheck,
    isSpyMaster,
    onSpyMasterClick,
    timerMaxSeconds,
    onTimerMaxChange,
    toggleSettings,
    gameStarted,
    startGame,
    isHome,
    onGameTypeChange,
    gameType,
  } = props;

  const timerSettings = 
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
    </div>;

  const spymasterSettings =
    <div>
      <label>
        <input type="checkbox" checked={isSpyMaster} onChange={onSpyMasterClick} />
        Spymaster
      </label>
    </div>;

  const settingsGameButtons =
    gameStarted ? 
    <div className="flex v-align-bottom modal-content-button-container">
      <Link className="modal-content-button flex-50 button" to="/">
        NEW GAME
      </Link>
      <button className="modal-content-button flex-50" onClick={toggleSettings}>
        RETURN TO GAME
      </button>
    </div> : isHome ?
      null : 
      <div className="flex v-align-bottom modal-content-button-container">
        <button className="modal-content-button flex-50" onClick={(e) => {startGame(); toggleSettings();}}>
          START GAME
        </button>
      </div>;

  const gameTypeSettings =
    <div className="flex flex-column gametype-settings">
      <strong>Game Type</strong>
        <div className="flex v-align-center">
          <label><input type="radio" value="cn" checked={gameType === "cn"} onChange={onGameTypeChange} disabled={!isHome} />Default</label>
          <label><input type="radio" value="dt" checked={gameType === "dt"} onChange={onGameTypeChange} disabled={true} />Extended</label>
        </div>
    </div>;

  const settingsContent = 
    <div className="flex flex-column flex-100">
      <h2>SETTINGS</h2>
      {/* {timerSettings} */}
      {spymasterSettings}
      {/* {gameTypeSettings} */}
      {settingsGameButtons}
    </div>;
  const settingsButton = <FontAwesomeIcon icon={faCog} />;

  return (
    <Modal
        modalContent={settingsContent}
        buttonContent={settingsButton}
      />
  );
};

export default GameSettings;