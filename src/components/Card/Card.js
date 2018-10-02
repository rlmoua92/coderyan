import React, { Component }  from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import './Card.scss';

const Card = (props) => {
  const {
    value,
    isHidden,
    team,
    isSpyMaster,
    onClick
  } = props;

  const cardClass = classNames(
    'card',
    { 'card-hidden': isHidden === true },
    { 'card-red': team === 'red' && (isHidden === false || isSpyMaster === true)},
    { 'card-blue': team === 'blue' && (isHidden === false || isSpyMaster === true)},
    { 'card-neutral': team === 'neutral' && (isHidden === false || isSpyMaster === true)},
    { 'card-black': team === 'black' && (isHidden === false || isSpyMaster === true)},
  );

  return (
    <span className={cardClass} onClick={onClick}>{value}</span>
  );
}

export default Card;