import React from 'react';
import './NavBar.scss';

const NavBar = (props) => {
  const {
    leftContent,
    centerContent,
    rightContent,
  } = props;

  return (
    <div className="nav-bar flex v-align-center">
      <div className="flex v-align-center">
        {leftContent}
      </div>
      <div className="flex v-align-center">
        {centerContent}
      </div>
      <div className="flex v-align-center">
        {rightContent}
      </div>
    </div>
  );
};

export default NavBar;