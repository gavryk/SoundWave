import React from "react";
import style from "./Song.module.scss";

const Song = () => {
  return (
    <div className={style.songContainer}>
      <h1>Picture</h1>
      <h2>Song Name</h2>
      <h3>Artist</h3>
    </div>
  );
};

export default Song;
