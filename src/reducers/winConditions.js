import uheprng from 'random-seed';

const winConditions = (state, action, roomKey) => {
	switch (action.type) {
		case 'SET_WIN_CONDITIONS':
			return {"red": action.redWin, "blue": action.blueWin};
    default:
    	const randKey = roomKey ? roomKey : window.location.pathname.replace('/','');
      const gen = uheprng.create(randKey);
      const firstPlayer = gen(100) % 2;
      return state ? state : {"red": firstPlayer ? 9 : 8, "blue": firstPlayer ? 8 : 9};
	}
};

export default winConditions;