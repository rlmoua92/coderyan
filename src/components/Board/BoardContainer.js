import Board from './Board.js';
import wordList from '../../words.json';
import uheprng from 'random-seed';
import { connect } from 'react-redux';

const words = wordList.words;

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

const mapStateToProps = (state, ownProps) => { 
  const gen = uheprng.create(ownProps.randKey);

  const neutralCount = (state.gameHeight * state.gameWidth) - 1 - state.winConditions.red - state.winConditions.blue;
  const cardColors = addColorsToList(createColor(state.winConditions.red,"red"),createColor(state.winConditions.blue,"blue"),createColor(neutralCount,"neutral"),createColor(1,"black"));
  const randomWords = randomWordPicker(gen, words, state.gameHeight * state.gameWidth);
  const cards = randomWordColorAssociation(gen, randomWords, cardColors);

  return {
    height: state.gameHeight,
    width: state.gameWidth,
    cards: cards,
  }
};

export default connect(
  mapStateToProps
)(Board);