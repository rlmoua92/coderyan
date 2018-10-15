const roomKeyInput = (state = '', action) => {
  switch (action.type) {
    case 'SET_ROOM_KEY_INPUT':
      return action.roomKeyInput;
    default:
      return state;
  }
};

export default roomKeyInput;