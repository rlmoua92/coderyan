import React, { Component } from 'react';
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



class BoardContainer extends Component {
  constructor(props) {
    super(props);

    const gen = uheprng.create(this.props.randKey);

    const neutralCount = (this.props.height * this.props.width) - 1 - this.props.redTotal - this.props.blueTotal;
    const cardColors = addColorsToList(createColor(this.props.redTotal,"red"),createColor(this.props.blueTotal,"blue"),createColor(neutralCount,"neutral"),createColor(1,"black"));
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