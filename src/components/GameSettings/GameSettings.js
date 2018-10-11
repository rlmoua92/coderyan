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
  } = props;

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
      {
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
    	      <button className="modal-content-button flex-50" onClick={() => {startGame(); toggleSettings();}}>
        	    START GAME
          	</button>
        	</div>
      }
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