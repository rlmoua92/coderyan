import React from 'react';
import './NavBar.scss';

const NavBar = (props) => {
  const {
    leftContent,
    centerContent,
    rightContent,
    isPlayerRed,
  } = props;

  return (
    <div className="nav-bar flex v-align-stretch">
      <div className={`nav-bar-content nav-bar__left-container ${leftContent ? isPlayerRed ? 'is-red' : 'is-blue' : ''}`}>
        {leftContent}
      </div>
      <div className="nav-bar-content nav-bar__center-container flex v-align-center">
        {centerContent}
      </div>
      <div className="nav-bar-content nav-bar__right-container flex v-align-center">
        {rightContent}
      </div>
    </div>
  );
};

export default NavBar;