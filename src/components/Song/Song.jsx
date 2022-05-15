import React from "react";
import style from "./Song.module.scss";

const Song = ({cover, name, artist}) => {
  return (
    <div className={style.songContainer}>
      <div className={style.cover}>
        <img src={cover} alt="" />
      </div>
      <div className={style.name}>
        <h2>{name}</h2>
      </div>
      <div className={style.artist}>
        <h3>{artist}</h3>
      </div>
    </div>
  );
};

export default Song;
