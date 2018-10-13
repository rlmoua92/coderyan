const roomKey = (state = window.location.pathname === '/' ? '' : window.location.pathname.replace(/(\/.*?\/)/,''), action) => {
  switch (action.type) {
    case 'SET_ROOM_KEY':
      return action.roomKey;
    default:
      return state;
  }
};

export default roomKey;