import React, { useRef, useState, useEffect } from "react";
import style from "./PlayerControler.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faAngleLeft,
  faAngleRight,
  faVolumeDown,
} from "@fortawesome/free-solid-svg-icons";

const PlayerControler = ({
  isPlaying,
  setIsPlaying,
  audioRef,
  songInfo,
  setSongInfo,
  songs,
  setCurrentSong,
  currentSong,
  setSongs
}) => {
  const vulumeMixer = useRef();
  //Vulume State
  const [activeVolume, setActiveVolume] = useState(false);

  const activeLibraryHandler = (nextPrev) => {
    const newSongs = songs.map((song) => {
      if (song.id === nextPrev.id) {
        return {
          ...song,
          active: true,
        };
      } else {
        return {
          ...song,
          active: false,
        };
      }
    });
    setSongs(newSongs);
  }

  //Play Handler
  const playHandler = () => {
    setIsPlaying(!isPlaying);
    !isPlaying ? audioRef.current.play() : audioRef.current.pause();
  };

  //Format Time
  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };

  //Drag Range Handler
  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({
      ...songInfo,
      currentTime: e.target.value,
    });
  };

  const skipTrackHandler = async (direction) => {
    let index = songs.findIndex((song) => song.id === currentSong.id);
    if (direction === "skip-next") {
      await setCurrentSong(songs[(index + 1) % songs.length]);
      activeLibraryHandler(songs[(index + 1) % songs.length]);
    }
    if (direction === "skip-back") {
      if ((index - 1) % songs.length === -1) {
        await setCurrentSong(songs[songs.length - 1]);
        activeLibraryHandler(songs[songs.length - 1]);
        if (isPlaying) audioRef.current.play();
        return;
      }
      await setCurrentSong(songs[(index - 1) % songs.length]);
      activeLibraryHandler(songs[(index - 1) % songs.length]);
    } 
    if (isPlaying) audioRef.current.play();
  };
  
  const trackAnim = {
    transform: `translateX(${songInfo.animateTrack}%)`
  }

  const changeVolume = (e) => {
    let value = e.target.value;
    audioRef.current.volume = value;
    setSongInfo({ ...songInfo, volume: value });
  };

  const clickOffVulumeMixer = (event) => {
    let path = event.path || (event.composedPath && event.composedPath());
    if (!path.includes(vulumeMixer.current)) {
      setActiveVolume(false);
    }
  };

  useEffect(() => {
    document.body.addEventListener("click", clickOffVulumeMixer);
  }, []);

  return (
    <div className={style.playerContainer}>
      <div className={style.timeControl}>
        <p>{getTime(songInfo.currentTime)}</p>
        <div
          className={style.track}
          style={{
            background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`,
          }}
        >
          <input
            onChange={dragHandler}
            min={0}
            max={songInfo.duration || 0}
            value={songInfo.currentTime}
            type="range"
          />
          <div className={style.animateTrack} style={trackAnim}></div>
        </div>
        <p>{songInfo.duration ? getTime(songInfo.duration) : "0:00"}</p>
      </div>
      <div className={style.playControl}>
        <FontAwesomeIcon
          onClick={() => skipTrackHandler("skip-back")}
          className="skip-back"
          size="2x"
          icon={faAngleLeft}
        />
        <FontAwesomeIcon
          onClick={playHandler}
          className="play"
          size="2x"
          icon={!isPlaying ? faPlay : faPause}
        />
        <FontAwesomeIcon
          onClick={() => skipTrackHandler("skip-next")}
          className="skip-forward"
          size="2x"
          icon={faAngleRight}
        />
        <div ref={vulumeMixer} className={style.vulumeMixer}>
          <FontAwesomeIcon
            onClick={() => setActiveVolume(!activeVolume)}
            icon={faVolumeDown}
          />
          {activeVolume && (
            <div className={style.mixer}>
              <input
                onChange={changeVolume}
                value={songInfo.volume}
                max="1"
                min="0"
                step="0.01"
                type="range"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlayerControler;
