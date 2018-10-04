import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Board from './Board.js';
import wordList from '../../words.json';
import uheprng from 'random-seed';

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

function addMultipleToList(...args) {
  let result = []
  for (let i = 0; i < args.length; i++) {
    for (let j = 0; j < args[i][0]; j++) {
      result.push(args[i][1]);
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
    let randWordInd = randGen(0, wordList.length);
    let randColorInd = randGen(0, colorList.length);
    result.push({'value': wordList[randWordInd], 'color': colorList[randColorInd]});
    wordList.splice(randWordInd,1);
    colorList.splice(randColorInd,1);
  }
  return result;
}



class BoardContainer extends Component {
  constructor(props) {
    super(props);

    const gen = uheprng.create(this.props.randKey);

    const neutralCount = (this.props.height * this.props.width) - 1 - this.props.redTotal - this.props.blueTotal;
    const cardColors = addMultipleToList([this.props.redTotal,"red"],[this.props.blueTotal,"blue"],[neutralCount,"neutral"],[1,"black"]);
    const randomWords = randomWordPicker(gen, words, this.props.height * this.props.width);
    this.cards = randomWordColorAssociation(gen, randomWords, cardColors);
  }

  render() {
    const { 
      height, 
      width,
      onCardClick,
      isSpyMaster,
      winner,
      timerOn,
      useTimer,
    } = this.props;
    return (
      <Board 
        height={height} 
        width={width} 
        cards={this.cards} 
        onCardClick={onCardClick} 
        isSpyMaster={isSpyMaster} 
        winner={winner}
        timerOn={timerOn}
        useTimer={useTimer}
      />
    );
  }
}

BoardContainer.defaultProps = {
  height: 5,
  width: 5
};

export default BoardContainer;