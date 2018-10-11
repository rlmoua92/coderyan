import uheprng from 'random-seed';

const player = (state, action, roomKey) => {
	switch (action.type) {
		case 'TOGGLE_PLAYER':
			return !state;
		case 'SET_PLAYER':
			return action.player;
    default:
      const gen = uheprng.create(roomKey);
      const firstPlayer = gen(100) % 2;
      return state ? state : firstPlayer;
	}
};

export default player;