import React, { useRef, useState } from 'react';
import style from "./PlayerControler.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

const PlayerControler = ({audio, isPlaying, setIsPlaying}) => {
  //State
  const [songInfo, setSongInfo] = useState({
    currentTime: null,
    duration: null
  })
  //Audio Ref
  const audioRef = useRef(null);

  //Play Handler
  const playHandler = () => {
    setIsPlaying(!isPlaying);
    !isPlaying ? audioRef.current.play() : audioRef.current.pause();
  }

  //Format Time
  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    )
  }

  //Time Update
  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    setSongInfo({
      ...songInfo,
      currentTime: current,
      duration
    })
  }
  return (
    <div className={style.playerContainer}>
      <div className={style.timeControl}>
        <p>{getTime(songInfo.currentTime)}</p>
        <input type="range" />
        <p>{getTime(songInfo.duration)}</p>
      </div>
      <div className={style.playControl}>
        <FontAwesomeIcon className="skip-back" size="2x" icon={faAngleLeft} />
        {!isPlaying ? (
          <FontAwesomeIcon
            onClick={playHandler}
            className="play"
            size="2x"
            icon={faPlay}
          />
        ) : (
          <FontAwesomeIcon
            onClick={playHandler}
            className="play"
            size="2x"
            icon={faPause}
          />
        )}
        <FontAwesomeIcon
          className="skip-forward"
          size="2x"
          icon={faAngleRight}
        />
      </div>
      <audio
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
        ref={audioRef}
        src={audio}
      ></audio>
    </div>
  );
}

export default PlayerControler;