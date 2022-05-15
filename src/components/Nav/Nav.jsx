import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";
import style from "./Nav.module.scss";

const Nav = ({ setLibraryOpen, libraryOpen }) => {
  const openLibrary = () => {
    setLibraryOpen(!libraryOpen);
  };

  return (
    <nav className={style.navigation}>
      <h1>SoundWave</h1>
      <button onClick={openLibrary}>
        Library
        <FontAwesomeIcon icon={faMusic} />
      </button>
    </nav>
  );
};

export default Nav;
