import React from 'react';
import { Link } from 'react-router-dom';
import './Home.scss';

const Home = (props) => {
  const {
    randKey,
    onRoomKeyChange
  } = props;

  const roomType = "cn";

  return (
    <div className="home flex v-align-center">
      <div className="home-content flex flex-column">
        <h1>.codeRyan</h1>
        <div className="roomKey">
          <label>ENTER A ROOM KEY:</label>
          <input type="text" value={randKey} onChange={onRoomKeyChange} />
          {randKey.length <= 0 ? <div className="input-error">ERROR: KEY CANNOT BE BLANK</div> : null}
        </div>
        <Link to={"/" + roomType + "/" + randKey} className="button flex-100">START GAME</Link>
      </div>
    </div>
  );
}

export default Home;