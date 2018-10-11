const spymaster = (state = false, action) => {
	switch (action.type) {
		case 'TOGGLE_SPYMASTER':
			return !state;
    default:
      return state;
	}
};

export default spymaster;