const player = (state = true, action) => {
  switch (action.type) {
    case 'TOGGLE_PLAYER':
      return !state;
    case 'SET_PLAYER':
      return action.player;
    default:
      return state;
  }
};

export default player;