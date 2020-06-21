const useTimer = (state = true, action) => {
	switch (action.type) {
		case 'SET_USE_TIMER':
			return action.useTimer;
		case 'TOGGLE_USE_TIMER':
			return !state;
    default:
      return state;
	}
};

export default useTimer;