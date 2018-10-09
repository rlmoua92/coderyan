const timerOn = (state = false, action) => {
	switch (action.type) {
		case 'SET_TIMER_ON':
			return action.timerOn;
    default:
      return state;
	}
};

export default timerOn;