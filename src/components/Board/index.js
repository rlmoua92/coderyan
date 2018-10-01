import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Card from '../Card/index.js';

class Board extends Component {
	render() {
		return (
			<div>
				<div className="card-row">
					<Card />
					<Card />
					<Card />
					<Card />
					<Card />
				</div>
				<div className="card-row">
					<Card />
					<Card />
					<Card />
					<Card />
					<Card />
				</div>
				<div className="card-row">
					<Card />
					<Card />
					<Card />
					<Card />
					<Card />
				</div>
				<div className="card-row">
					<Card />
					<Card />
					<Card />
					<Card />
					<Card />
				</div>
				<div className="card-row">
					<Card />
					<Card />
					<Card />
					<Card />
					<Card />
				</div>
			</div>
		);
	}
}

export default Board;