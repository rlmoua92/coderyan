import { getRandomString } from '../common.js';

const roomKey = (state = getRandomString(5), action) => {
  switch (action.type) {
    case 'SET_ROOM_KEY':
      return action.roomKey;
    default:
      return window.location.pathname === "/" ? state : window.location.pathname.replace('/','');
  }
};

export default roomKey;