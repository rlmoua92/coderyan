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

const updateRoomData = (roomKey, dataKey, dataValue, callback) => {
  if (!roomKey) {
    return;
  }
  const database = firebase.database();
  const updates = {};
  updates[dataKey] = dataValue;

  database.ref(`games/${roomKey}`).update(updates, (error) => {
    if (error) {
      console.log('error');
      console.log(error);
    } else if (callback) {
      callback();
    }
  });
};

const togglePlayer = (roomKey, player) => {
  updateRoomData(roomKey, 'player', !player);
};

let timer = null;

const initializeTimer = (roomKey) => {
  if (!timer) {
    timer = setInterval(() => timerTick(roomKey), 1000);
  }
};

const timerTick = (roomKey) => {
  firebase.database().ref(`/games/${roomKey}`).once('value').then((snapshot) => {
    if (!snapshot.val()) return;
    const { timerSeconds, timerOn, spymaster, timerMaxSeconds, player } = snapshot.val();
    if (timerSeconds > 0) {
      updateRoomData(roomKey, 'timerSeconds', timerSeconds - 1);
    } else {
      clearTimer(roomKey, timerOn, spymaster, timerMaxSeconds, player);
    }
  });
};

const startTimer = (roomKey, timerOn) => {
  if (!timerOn && !timer) {
    initializeTimer(roomKey);
    updateRoomData(roomKey, 'timerOn', true, () => timerTick(roomKey));
  }
};

const stopTimer = (roomKey, timerOn) => {
  if (timerOn) {
    clearInterval(timer);
    timer = null;
    updateRoomData(roomKey, 'timerOn', false);
  }
};

const clearTimer = (roomKey, timerOn, spymaster, timerMaxSeconds, player) => {
  if (timerOn) {
    stopTimer(roomKey, timerOn, spymaster, timerMaxSeconds);
    updateRoomData(roomKey, 'timerSeconds', timerMaxSeconds);
    togglePlayer(roomKey, player);
  }
};

const setMaxSeconds = (roomKey, timerMaxSeconds) => {
  updateRoomData(roomKey, 'timerMaxSeconds', timerMaxSeconds);
  updateRoomData(roomKey, 'timerSeconds', timerMaxSeconds);
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

const checkWin = (roomKey, score, winConditions) => {
  if (score['red'] === winConditions['red']) {
    updateRoomData(roomKey, `winner`, 'red');
  } else if (score['blue'] === winConditions['blue']) {
    updateRoomData(roomKey, `winner`, 'blue');
  }
};

const cardClick = (roomKey, isHidden, useTimer, timerOn ,spymaster, winner, cardIndex, player, team, score, winConditions, timerMaxSeconds) => {
  if (isHidden) {
    if ((!useTimer || (useTimer && timerOn)) && !spymaster && !winner) {
      updateRoomData(roomKey, `cards/${cardIndex}/isHidden`, false);
      const current_player = player ? "red" : "blue";
      if (team === "red" || team === "blue") {
        const newScore = {...score};
        newScore[team] += 1;
        updateRoomData(roomKey, `score/${team}`, newScore[team]);
        checkWin(roomKey, newScore, winConditions);
      }
      if (team === "black") {
        const winner = player ? "BLUE" : "RED";
        updateRoomData(roomKey, `winner`,winner);
      }
      if (team !== current_player.toLowerCase()) {
        if (useTimer) {
          if (timerOn && !spymaster) {
            stopTimer(roomKey, timerOn, spymaster)
            updateRoomData(roomKey, 'timerSeconds', timerMaxSeconds);
            togglePlayer(roomKey, player);
          }
        } else {
          togglePlayer(roomKey, player);
        }
      }
    }
  }
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
    const data = snapshot.val();

    updateStore(data);
    if (data.timerOn) {
      initializeTimer(data.roomKey);
    }
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
  updateRoomData,
  initializeGame,
  linkToDatabase,
  togglePlayer,
  startTimer,
  stopTimer,
  clearTimer,
  setMaxSeconds,
  cardClick,
};