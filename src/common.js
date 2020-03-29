import * as firebase from 'firebase/app';
import 'firebase/database';
import uheprng from 'random-seed';
import React  from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRedo } from '@fortawesome/free-solid-svg-icons';
import deafultWordList from './words.json';

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

const checkIfRoomExists = async (key) => {
  if (!key) {
    return false;
  }
  const database = firebase.database();
  const room = await database.ref(`games/${key}`).once('value');

  return room.exists();
};

const setRoomData = (key, data) => {
  if (!key) {
    return;
  }
  const database = firebase.database();
  database.ref(`games/${key}`).set(data);
};

const addCard = (value, team, cardIndex) => {
  const result = {
    [cardIndex]: {
      value,
      team,
      cardIndex,
      isHidden: true,
    }
  };
  return result;
};

const initializeBoard = (gen, data) => {
  const { 
    gameType,
    gameHeight,
    gameWidth,
    winConditions,
  } = data;

  let words = [];
  if (gameType === "cn") {
    /*"cn" will use the default words provided by wordList.json*/
    words = deafultWordList.words;
  } else if (gameType === "dt") {
    /*"dt" will pull words from the dictionary API*/

  }

  const neutralCount = (gameHeight * gameWidth) - 1 - winConditions.red - winConditions.blue;
  const cardColors = addColorsToList(createColor(winConditions.red,"red"),createColor(winConditions.blue,"blue"),createColor(neutralCount,"neutral"),createColor(1,"black"));
  const randomWords = randomWordPicker(gen, words, gameHeight * gameWidth);
  const cards = randomWordColorAssociation(gen, randomWords, cardColors);

  let board = {};
  for (let i = 0; i < cards.length; i++) {
    board = { ...board, ...addCard(cards[i].value, cards[i].color, i) };
  }

  return board;
};

const initializeGame = (key) => {
  const gen = uheprng.create(`cn-${key}`);
  const firstPlayer = gen(100) % 2;
  const options = {
    gameType: 'cn',
    gameStarted: false,
    winner: null,
    score: { 'red': 0, 'blue': 0 },
    player: firstPlayer,
    winConditions: firstPlayer ? { 'red': 9, 'blue': 8 } : { 'red': 8, 'blue': 9 },
    gameHeight: 5,
    gameWidth: 5,
    timerOn: false,
    timerMaxSeconds: 60,
    timerSeconds: 60,
    useTimer: true,
  };
  options.cards = initializeBoard(gen, options);

  setRoomData(key, options);
};

const linkToDatabase = (key, updateStore) => {
  if (!key) {
    return;
  }
  const database = firebase.database();
  const room = database.ref(`games/${key}`);

  room.on('value', (snapshot) => {
    if (!snapshot.val()) {
      return;
    }

    updateStore(snapshot.val());
  });
};

export { 
  getRandomInt, 
  getRandomString,
  randomWordPicker,
  createColor,
  addColorsToList,
  randomWordColorAssociation,
  RotateMessage,
  withRotateMessage,
  checkIfRoomExists,
  setRoomData,
  initializeGame,
  linkToDatabase,
};