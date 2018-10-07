const gameStarted = (state = false, action) => {
	switch (action.type) {
		case 'SET_GAME_STARTED':
			return action.gameStarted;
    default:
      return state;
	}
};

export default gameStarted;