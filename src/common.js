import React  from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRedo } from '@fortawesome/free-solid-svg-icons';

/*Functions to generate a random number or a random string*/
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

/*Functions to generate random word and color associations*/
function randomWordPicker(randGen, wordList, numWords) {
  let numList = [];
  while (numList.length < numWords) {
    let randNum = randGen(wordList.length);
    if (!numList.includes(randNum)) {
      numList.push(randNum);
    }
  }
  let result = numList.map(num => wordList[num].toUpperCase());
  return result;
}

function createColor(count, color) {
  return {
    "count": count,
    "color": color,
  }
}

function addColorsToList(...args) {
  let result = []
  for (let i = 0; i < args.length; i++) {
    for (let j = 0; j < args[i].count; j++) {
      result.push(args[i].color);
    }
  }
  return result;
}

function randomWordColorAssociation(randGen, wordList, colorList) {
  if (wordList.length !== colorList.length) {
    return;
  }
  let result = [];
  while (wordList.length > 0) {
    let randWordInd = randGen(wordList.length);
    let randColorInd = randGen(colorList.length);
    result.push({'value': wordList[randWordInd], 'color': colorList[randColorInd]});
    wordList.splice(randWordInd,1);
    colorList.splice(randColorInd,1);
  }
  return result;
}

/*Add message to rotate device at widths lower than 568px*/
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
  randomWordPicker,
  createColor,
  addColorsToList,
  randomWordColorAssociation,
  RotateMessage,
  withRotateMessage
};