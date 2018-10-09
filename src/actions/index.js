export const setRoomKey = roomKey => ({
  type: 'SET_ROOM_KEY',
  roomKey
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

export const toggleSettings = () => ({
  type: 'TOGGLE_SETTINGS'
});

export const setTimerOn = (timerOn) => ({
  type: 'SET_TIMER_ON',
  timerOn
});

let timer = null;

export const timerTick = () => ({
  type: 'TIMER_TICK'
});

export const startTimer = () => (dispatch, getState) => {
  const { timerOn } = getState();
  if (!timerOn) {
    timer = setInterval(() => dispatch(timerTick()), 1000);
    dispatch(setTimerOn(true));
    dispatch(timerTick());
  }
};

export const stopTimer = () => (dispatch, getState) => {
  const { timerOn } = getState();
  if (timerOn) {
    clearInterval(timer);
    dispatch(setTimerOn(false));
  }
};

export const clearTimer = () => (dispatch, getState) => {
  const { timerOn } = getState();
  if (timerOn) {
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

export const setTimerMaxSeconds = (maxSeconds) => ({
  type: 'SET_TIMER_MAX_SECONDS',
  maxSeconds
});

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

export const addRevealedCards = (cardIndex, color) => (dispatch, getState) => {
  const {
    useTimer,
    timerOn,
    player,
    score,
  } = getState();
  if (!useTimer || (useTimer && timerOn)) {
    dispatch({type: 'ADD_REVEALED_CARDS', cardIndex});
    const current_player = player ? 'red' : 'blue';
    if (color === 'red' || color === 'blue') {
      dispatch(changeScore(color, score[current_player] + 1));
    }
    if (color === 'black') {
      dispatch(setWinner(player ? 'BLUE' : 'RED'));
    }
    if (color !== current_player.toLowerCase()) {
      dispatch(clearTimer());
    }
  }
};