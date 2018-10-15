const settings = (state = window.location.pathname === "/" ? false : true, action) => {
  switch (action.type) {
    case 'TOGGLE_SETTINGS':
      return !state;
    case 'SET_SETTINGS':
      return action.settings;
    default:
      return state;
  }
};

export default settings;