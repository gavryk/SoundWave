import React, { useRef, useState } from 'react';
import { Library, Nav, PlayerControler, Song } from "./components";
//Import Musics
import data from './data';

const App = () => {
  //Audio Ref
  const audioRef = useRef(null);
  //State
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [libraryOpen, setLibraryOpen] = useState(false);

  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animateTrack: 0
  });

  //Time Update
  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    //calclate percentage
    const rounderCurrent = Math.round(current);
    const rounderDuration = Math.round(duration);
    const animateTrack = Math.round((rounderCurrent / rounderDuration) * 100);
    setSongInfo({
      ...songInfo,
      currentTime: current,
      duration,
      animateTrack, 
    });
  };

  return (
    <div className="App">
      <Nav libraryOpen={libraryOpen} setLibraryOpen={setLibraryOpen} />
      <Song {...currentSong} isPlaying={isPlaying} />
      <PlayerControler
        {...currentSong}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        audioRef={audioRef}
        songInfo={songInfo}
        setSongInfo={setSongInfo}
        songs={songs}
        setCurrentSong={setCurrentSong}
        currentSong={currentSong}
        setSongs={setSongs}
      />
      <Library
        audioRef={audioRef}
        songs={songs}
        setCurrentSong={setCurrentSong}
        isPlaying={isPlaying}
        setSongs={setSongs}
        libraryOpen={libraryOpen}
      />
      <audio
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
      ></audio>
    </div>
  );
}

export default App
