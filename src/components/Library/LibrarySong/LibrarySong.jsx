import React from "react";
import { playAudio } from "../../../utils/util";
import style from "./LibrarySong.module.scss";

const LibrarySong = ({
  name,
  artist,
  cover,
  active,
  id,
  setCurrentSong,
  songs,
  audioRef,
  isPlaying,
  setSongs,
}) => {
  const songSelectHandler = () => {
    const selectedSong = songs.filter((state) => state.id === id);
    setCurrentSong(selectedSong[0]);
    //Add Active Class
    const newSongs = songs.map((song) => {
      if (song.id === id) {
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
    //Check of Song is playing
    playAudio(isPlaying, audioRef);
  };

  return (
    <div
      onClick={songSelectHandler}
      className={`${style.librarySong} ${active ? style.active : ""}`}
    >
      <div className={style.cover}>
        <img src={cover} alt={name} />
      </div>
      <div className={style.info}>
        <div className={style.name}>
          <h4>{name}</h4>
        </div>
        <div className={style.artist}>
          <h5>{artist}</h5>
        </div>
      </div>
    </div>
  );
};

export default LibrarySong;
