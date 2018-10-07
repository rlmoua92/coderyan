const timerOn = (state = false, action) => {
	switch (action.type) {
		case 'TOGGLE_TIMER_ON':
			return !state;
    default:
      return state;
	}
};

export default timerOn;