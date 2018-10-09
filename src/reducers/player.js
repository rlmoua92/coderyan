import uheprng from 'random-seed';

const player = (state, action, roomKey) => {
	switch (action.type) {
		case 'TOGGLE_PLAYER':
			return !state;
		case 'SET_PLAYER':
			return action.player;
    default:
      const randKey = roomKey ? roomKey : window.location.pathname.replace('/','');
      const gen = uheprng.create(randKey);
      const firstPlayer = gen(100) % 2;
      return state ? state : firstPlayer;
	}
};

export default player;