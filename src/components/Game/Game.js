import React, { Component }  from 'react';
import ReactDOM from 'react-dom';
import Board from '../Board';
import Timer from '../Timer';
import Modal from '../Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import './Game.scss';

const Game = (props) => {
  const settingsContent = <div><h2>SETTINGS</h2>
    <div><label><input type="checkbox" checked={props.useTimer} onChange={props.handleTimerChange} />Use Timer</label></div>
    <div><label><input type="checkbox" checked={props.isSpyMaster} onChange={props.onSpyMasterClick} />Spymaster</label></div></div>;
  const settingsButton = <FontAwesomeIcon icon={faCog} />;
  return (
    <div>
      <div className="nav-bar flex v-align">
        <div>
          {props.winner ? 
            <div className="winner">WINNER: {props.winner}</div> :
            <div className="player">TURN: {props.isPlayerRed ? "RED" : "BLUE"}</div>
          }
        </div>
        <div className="game-stats flex v-align">
          <div>RED: {props.score.red}</div>
          {props.useTimer ?
            <Timer 
              onTimerEnd={props.onTimerEnd} 
              timerOn={props.timerOn} 
              seconds={props.timerSeconds}
              onStartClick={props.onStartTimerClick}
              onStopClick={props.onStopTimerClick}
              onClearClick={props.onClearTimerClick}
              tickInterval={props.timerTickInterval}
            /> :
            <div className="switch-players">
              <button className="switch-players" onClick={props.onEndTurnClick}>
                END TURN
              </button>
            </div>
          }
          <div>BLUE: {props.score.blue}</div>
        </div>
        <Modal 
          showModal={props.showSettings} 
          modalContent={settingsContent}
          buttonContent={settingsButton}
          onButtonClick={props.onSettingsClick}
        />
      </div>
      <Board 
        onCardClick={props.onCardClick} 
        isSpyMaster={props.isSpyMaster}
        winner={props.winner}
        redTotal={props.redTotal}
        blueTotal={props.blueTotal}
        height={props.height}
        width={props.width}
      />
    </div>
  );
}

export default Game;