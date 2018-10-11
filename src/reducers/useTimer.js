const useTimer = (state = true, action) => {
	switch (action.type) {
		case 'TOGGLE_USE_TIMER':
			return !state;
    default:
      return state;
	}
};

export default useTimer;