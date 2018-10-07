import uheprng from 'random-seed';

const player = (state = {}, action) => {
	switch (action.type) {
		case 'TOGGLE_PLAYER':
			return !state.player;
		case 'SET_PLAYER':
			return action.player;
    default:
      const randKey = state.roomKey ? state.roomKey : window.location.pathname.replace('/','');
      const gen = uheprng.create(randKey);
      const firstPlayer = gen(100) % 2;
      return firstPlayer;
	}
};

export default player;