const windowWidth = (state = 0, action) => {
	switch (action.type) {
		case 'SET_WINDOW_WIDTH':
			return action.windowWidth;
    default:
      return state;
	}
};

export default windowWidth;