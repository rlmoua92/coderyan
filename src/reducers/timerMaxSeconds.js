const timerMaxSeconds = (state = 60, action) => {
	switch (action.type) {
		case 'SET_TIMER_MAX_SECONDS':
			return action.maxSeconds;
    default:
      return state;
	}
};

export default timerMaxSeconds;