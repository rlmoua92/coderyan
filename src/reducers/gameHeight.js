const gameHeight = (state = 5, action) => {
	switch (action.type) {
		case 'SET_HEIGHT':
			return action.height;
    default:
      return state;
	}
};

export default gameHeight;