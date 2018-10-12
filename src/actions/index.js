import {
  randomWordPicker,
  createColor,
  addColorsToList,
  randomWordColorAssociation,
  getRandomString
} from '../common.js';
import wordList from '../words.json';
import uheprng from 'random-seed';

export const setRoomKey = (roomKey) => ({
  type: 'SET_ROOM_KEY',
  roomKey
});

export const setGameType = gameType => ({
  type: 'SET_GAME_TYPE',
  gameType
});

export const changeScore = (team, amount) => ({
  type: 'CHANGE_SCORE',
  team,
  amount
});

export const togglePlayer = () => ({
  type: 'TOGGLE_PLAYER',
});

export const setPlayer = player => ({
  type: 'SET_PLAYER',
  player
});

export const toggleSpymaster = () => ({
  type: 'TOGGLE_SPYMASTER',
});

export const setWinner = team => ({
  type: 'SET_WINNER',
  team
});

export const toggleUseTimer = () => ({
  type: 'TOGGLE_USE_TIMER'
});

export const setWinConditions = (redWin, blueWin) => ({
  type: 'SET_WIN_CONDITIONS',
  redWin,
  blueWin
});

export const setHeight = height => ({
  type: 'SET_HEIGHT',
  height
});

export const setWidth = width => ({
  type: 'SET_WIDTH',
  width
});

export const setSettings = settings => ({
  type: 'SET_SETTINGS',
  settings
});

export const toggleSettings = () => (dispatch, getState) => {
  const {
    timerOn,
    settings,
  } = getState();
  if (!settings && timerOn) {
    dispatch(stopTimer());
  }
  dispatch({type: 'TOGGLE_SETTINGS'});
};

export const modalClick = (e) => (dispatch, getState) => {
  const {
    settings,
    gameStarted,
  } = getState();
  if(settings && e.target.className === "modal-container" && (gameStarted || window.location.pathname === "/")) {
    dispatch(toggleSettings());
  }
};

export const setTimerOn = (timerOn) => ({
  type: 'SET_TIMER_ON',
  timerOn
});

let timer = null;

export const timerTick = () => (dispatch, getState) => {
  const {
    timerSeconds
  } = getState();
  if (timerSeconds > 0) {
    dispatch({type: 'TIMER_TICK'});
  } else {
    dispatch(clearTimer());
  }
};

export const startTimer = () => (dispatch, getState) => {
  const { 
    timerOn,
    spymaster,
  } = getState();
  if (!timerOn && !spymaster) {
    timer = setInterval(() => dispatch(timerTick()), 1000);
    dispatch(setTimerOn(true));
    dispatch(timerTick());
  }
};

export const stopTimer = () => (dispatch, getState) => {
  const { timerOn,
    spymaster,
  } = getState();
  if (timerOn && !spymaster) {
    clearInterval(timer);
    dispatch(setTimerOn(false));
  }
};

export const clearTimer = () => (dispatch, getState) => {
  const { timerOn,
    spymaster,
  } = getState();
  if (timerOn && !spymaster) {
    dispatch(stopTimer());
    const { timerMaxSeconds } = getState();
    dispatch(setTimerSeconds(timerMaxSeconds));
    dispatch(togglePlayer());
  }
};

export const setTimerSeconds = seconds => ({
  type: 'SET_TIMER_SECONDS',
  seconds
});

export const setTimerMaxSeconds = (maxSeconds) => (dispatch) => {
  if (maxSeconds > 0) {
    dispatch({type: 'SET_TIMER_MAX_SECONDS', maxSeconds});
  } else {
    dispatch({type: 'SET_TIMER_MAX_SECONDS', maxSeconds: 1});
  }
  dispatch(setTimerSeconds(maxSeconds));
};

export const setGameStarted = gameStarted => ({
  type: 'SET_GAME_STARTED',
  gameStarted
});

export const setWindowWidth = windowWidth => ({
  type: 'SET_WINDOW_WIDTH',
  windowWidth
});

export const setWindowHeight = windowHeight => ({
  type: 'SET_WINDOW_HEIGHT',
  windowHeight
});

export const windowResize = (windowWidth, windowHeight) => (dispatch) => {
  dispatch(setWindowWidth(windowWidth));
  dispatch(setWindowHeight(windowHeight));
};

let newCardIndex = 0;
export const addCard = (value, team) => ({
  type: 'ADD_CARD',
  value,
  team,
  cardIndex: newCardIndex++,
});

export const revealCard = (cardIndex) => ({
  type: 'REVEAL_CARD', 
  cardIndex
});

export const initializeBoard = () => (dispatch, gameState) => {
  const { 
    roomKey,
    gameType,
    gameHeight,
    gameWidth,
    winConditions,

  } = gameState();

  let words = [];
  if (gameType === "cn") {
    /*"cn" will use the default words provided by wordList.json*/
    words = wordList.words;
  } else if (gameType === "dt") {
    /*"dt" will pull words from the dictionary API*/

  }

  const gen = uheprng.create(gameType + '-' + roomKey);

  const neutralCount = (gameHeight * gameWidth) - 1 - winConditions.red - winConditions.blue;
  const cardColors = addColorsToList(createColor(winConditions.red,"red"),createColor(winConditions.blue,"blue"),createColor(neutralCount,"neutral"),createColor(1,"black"));
  const randomWords = randomWordPicker(gen, words, gameHeight * gameWidth);
  const cards = randomWordColorAssociation(gen, randomWords, cardColors);
  for (let i = 0; i < cards.length; i++) {
    dispatch(addCard(cards[i].value, cards[i].color, i));
  }
};

export const newGame = () => (dispatch, gameState) => {
  dispatch(setRoomKey(getRandomString(5)));
  dispatch(setSettings(false));
  dispatch(setGameStarted(false));
};

export const homeStartGame = () => (dispatch, gameState) => {
  dispatch(setSettings(true));
  dispatch(setGameStarted(false));
};

export const startGame = () => (dispatch, gameState) => {
  dispatch(initializeBoard());
  dispatch(setGameStarted(true));
};

export const cardClick = (cardIndex, color) => (dispatch, getState) => {
  const {
    useTimer,
    timerOn,
    player,
    spymaster,
    winner,
  } = getState();
  if ((!useTimer || (useTimer && timerOn)) && !spymaster && !winner) {
    dispatch(revealCard(cardIndex));
    const current_player = player ? 'red' : 'blue';
    if (color === 'red' || color === 'blue') {
      dispatch(changeScore(color, 1));
      const { score } = getState();
      dispatch(checkWin(color, score[color]));
    }
    if (color === 'black') {
      dispatch(setWinner(player ? 'BLUE' : 'RED'));
    }
    if (color !== current_player.toLowerCase()) {
      useTimer ? dispatch(clearTimer()) : dispatch(togglePlayer());
    }
  }
};

export const checkWin = (color, score) => (dispatch, getState) => {
  const { winConditions } = getState();
  if (score === winConditions[color]) {
    dispatch(setWinner(color.toUpperCase()));
  }
};