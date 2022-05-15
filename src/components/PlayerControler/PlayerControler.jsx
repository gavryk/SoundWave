import React from 'react';
import style from "./PlayerControler.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

const PlayerControler = () => {
  return (
    <div className={style.playerContainer}>
      <div className={style.timeControl}>
        <p>Start Time</p>
        <input type="range" />
        <p>End Time</p>
      </div>
      <div className={style.playControl}>
        <FontAwesomeIcon className="skip-back" size="2x" icon={faAngleLeft} />
        <FontAwesomeIcon className="play" size='2x' icon={faPlay} />
        <FontAwesomeIcon className="skip-forward" size="2x" icon={faAngleRight} />
      </div>
    </div>
  );
}

export default PlayerControler;