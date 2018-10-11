import { getRandomString } from '../common.js';

const roomKey = (state = '', action) => {
  switch (action.type) {
    case 'SET_ROOM_KEY':
      return action.roomKey;
    default:
      return state;
  }
};

export default roomKey;