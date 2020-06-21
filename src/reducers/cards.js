const cards = (state = {}, action) => {
	switch (action.type) {
		case 'REVEAL_CARD':
			let result = Object.assign({}, state);
			result[action.cardIndex].isHidden = false;
			return result;
		case 'SET_CARDS': 
			return action.cards;
		case 'CLEAR_CARDS':
			return {};
    default:
    	return state;
	}
};

export default cards;