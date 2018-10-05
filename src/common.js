import React  from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRedo } from '@fortawesome/free-solid-svg-icons';

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomString(len) {
  let result = [];
  let alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  for (let i = 0; i < len; i ++) {
    let randInd = getRandomInt(0, alpha.length);
    let randLetter = alpha[randInd];
    result.push(randLetter);
  }
  return result.join("");
}

const RotateMessage = () => {
  return (
    <div className="rotate-container flex v-align-center">
      <div className="rotate-content">
        <div className="rotate-text">PLEASE ROTATE YOUR DEVICE</div>
        <div className="rotate-icon"><FontAwesomeIcon icon={faRedo} /></div>
      </div>
    </div>
  );
};

const withRotateMessage = (Component) => (props) => {
  return (
    window.innerWidth > window.innerHeight || window.innerWidth > 568 ?
    <Component {...props} /> :
    <RotateMessage />
  );
}

export { 
  getRandomInt, 
  getRandomString,
  RotateMessage,
  withRotateMessage
};