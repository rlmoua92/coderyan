const gameType = (state = 'cn', action) => {
  switch (action.type) {
    case 'SET_GAME_TYPE':
      return action.gameType;
    default:
      return state;
  }
};

export default gameType;