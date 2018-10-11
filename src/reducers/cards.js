const cards = (state = {}, action) => {
	switch (action.type) {
		case 'REVEAL_CARD':
			let result = Object.assign({}, state);
			result[action.cardIndex].isHidden = false;
			return result;
		case 'ADD_CARD':
			result = Object.assign({}, state, {
				[action.cardIndex]: {
					value: action.value,
					team: action.team,
					cardIndex: action.cardIndex,
					isHidden: true,
				}
			});
			return result;
    default:
      return state;
	}
};

export default cards;