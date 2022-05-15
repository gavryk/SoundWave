import React from "react";
import style from "./Library.module.scss";
import LibrarySong from "./LibrarySong/LibrarySong";

const Library = ({ songs, setCurrentSong, audioRef, isPlaying, setSongs, libraryOpen }) => {
  return (
    <div className={`${style.library} ${libraryOpen ? style.toggle : ''}`}>
      <h2 className={style.libraryTitle}>Library</h2>
      <div className={style.librarySongs}>
        {songs.map((song) => {
          return (
            <LibrarySong
              key={song.id}
              {...song}
              songs={songs}
              setCurrentSong={setCurrentSong}
              audioRef={audioRef}
              isPlaying={isPlaying}
              setSongs={setSongs}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Library;
