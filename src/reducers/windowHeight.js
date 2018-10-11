const windowHeight = (state = 0, action) => {
	switch (action.type) {
		case 'SET_WINDOW_HEIGHT':
			return action.windowHeight;
    default:
      return state;
	}
};

export default windowHeight;