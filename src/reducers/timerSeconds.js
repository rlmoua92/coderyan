const timerSeconds = (state = 60, action) => {
	switch (action.type) {
		case 'SET_TIMER_SECONDS':
			return action.timerSeconds;
    default:
      return state;
	}
};

export default timerSeconds;