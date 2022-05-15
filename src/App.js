import React, { useState } from 'react';
import { PlayerControler, Song } from "./components";
//Import Musics
import data from './data';

const App = () => {
  //State
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="App">
      <Song {...currentSong} />
      <PlayerControler
        {...currentSong}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
      />
    </div>
  );
}

export default App
