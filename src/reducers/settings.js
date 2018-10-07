const settings = (state = true, action) => {
	switch (action.type) {
		case 'TOGGLE_SETTINGS':
			return !state;
    default:
      return state;
	}
};

export default settings;