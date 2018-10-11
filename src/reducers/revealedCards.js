const revealedCards = (state = [], action) => {
	switch (action.type) {
		case 'ADD_REVEALED_CARDS':
			const result = state.slice();
			result.push(action.cardIndex);
			return result;
    default:
      return state;
	}
};

export default revealedCards;