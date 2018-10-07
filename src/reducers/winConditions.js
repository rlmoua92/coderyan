import uheprng from 'random-seed';

const winConditions = (state = {}, action) => {
	switch (action.type) {
		case 'SET_WIN_CONDITIONS':
			return {"red": action.redWin, "blue": action.blueWin};
    default:
    	const randKey = state.roomKey ? state.roomKey : window.location.pathname.replace('/','');
      const gen = uheprng.create(randKey);
      const firstPlayer = gen(100) % 2;
      return {"red": firstPlayer ? 9 : 8, "blue": firstPlayer ? 8 : 9};
	}
};

export default winConditions;