const winConditions = (state, action) => {
  switch (action.type) {
    case 'SET_WIN_CONDITIONS':
      return {"red": action.redWin, "blue": action.blueWin};
    default:
      return state;
  }
};

export default winConditions;