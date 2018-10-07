import gameWidth from './gameWidth';
import gameHeight from './gameHeight';
import gameStarted from './gameStarted';
import revealedCards from './revealedCards';
import roomKey from './roomkey';
import score from './score';
import settings from './settings';
import spymaster from './spymaster';
import player from './player';
import winConditions from './winConditions';
import timerOn from './timerOn';
import timerMaxSeconds from './timerMaxSeconds';
import timerSeconds from './timerSeconds';
import useTimer from './useTimer';
import windowWidth from './windowWidth';
import windowHeight from './windowHeight';
import winner from './winner';

const rootReducer = (state = {}, action) => {
  return {
    gameWidth: gameWidth(state.gameWidth, action),
    gameHeight: gameHeight(state.gameHeight, action),
    revealedCards: revealedCards(state.revealedCards, action),
    roomKey: roomKey(state.roomKey, action),
    score: score(state.score, action),
    settings: settings(state.settings, action),
    spymaster: spymaster(state.spymaster, action),
    player: player(state, action),
    timerOn: timerOn(state.timerOn, action),
    timerMaxSeconds: timerMaxSeconds(state.timerMaxSeconds, action),
    timerSeconds: timerSeconds(state.timerSeconds, action),
    useTimer: useTimer(state.useTimer, action),
    windowWidth: windowWidth(state.windowWidth, action),
    windowHeight: windowHeight(state.windowHeight, action),
    winner: winner(state.winner, action),
    gameStarted: gameStarted(state.gameStarted, action),
    winConditions: winConditions(state, action),
  };
};

export default rootReducer;