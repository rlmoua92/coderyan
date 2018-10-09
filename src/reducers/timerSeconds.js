const timerSeconds = (state = {}, action) => {
	switch (action.type) {
		case 'SET_TIMER_SECONDS':
			return action.timerSeconds;
		case 'TIMER_TICK':
			return state.timerOn ? state.timerSeconds - 1 : action.timerSeconds;
    	default:
      		return state.timerSeconds;
	}
};

export default timerSeconds;