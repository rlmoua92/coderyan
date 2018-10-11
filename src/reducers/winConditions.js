import uheprng from 'random-seed';

const winConditions = (state, action, roomKey) => {
	switch (action.type) {
		case 'SET_WIN_CONDITIONS':
			return {"red": action.redWin, "blue": action.blueWin};
    default:
      const gen = uheprng.create(roomKey);
      const firstPlayer = gen(100) % 2;
      return state ? state : {"red": firstPlayer ? 9 : 8, "blue": firstPlayer ? 8 : 9};
	}
};

export default winConditions;