const gameWidth = (state = 5, action) => {
	switch (action.type) {
		case 'SET_WIDTH':
			return action.width;
    default:
      return state;
	}
};

export default gameWidth;