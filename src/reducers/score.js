const initial_score = {'red': 0, 'blue': 0};

const score = (state = initial_score, action) => {
	switch (action.type) {
		case 'CHANGE_SCORE':
			let newState = Object.assign({}, state);
			newState[action.team] += action.amount;
			return newState;
		case 'SET_SCORE':
			newState = Object.assign({}, state);
			newState[action.team] = action.score;
			return newState;
    default:
      return state;
	}
};

export default score;