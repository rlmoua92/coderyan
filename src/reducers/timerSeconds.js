const timerSeconds = (state = 60, action, timerOn) => {
	switch (action.type) {
		case 'SET_TIMER_SECONDS':
			return action.seconds;
		case 'TIMER_TICK':
			return timerOn ? state - 1 : null;
    	default:
      		return state;
	}
};

export default timerSeconds;