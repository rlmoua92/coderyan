const roomLoading = (state = '', action) => {
    switch (action.type) {
      case 'SET_ROOM_LOADING':
        return action.roomLoading;
      default:
        return state;
    }
  };
  
  export default roomLoading;