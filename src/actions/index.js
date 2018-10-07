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

export const toggleTimerOn = () => ({
	type: 'TOGGLE_TIMER_ON'
});

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

export const addRevealedCards = cardIndex => ({
	type: 'ADD_REVEALED_CARDS',
	cardIndex
});