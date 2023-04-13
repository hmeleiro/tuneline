import React, { createContext, useState, useRef } from 'react';

export const GameContext = createContext();

const GameProvider = ({ children }) => {
  const [gameInfo, setGameInfo] = useState();
  const [teams, setTeams] = useState();
  const [teamInfo, setTeamInfo] = useState();
  const [songs, setSongs] = useState();

  const ref = useRef(null);
  const scollToRef = useRef(null);

  function getRandomSong(songs, isHidden = true) {
    var randomIndex = Math.floor(Math.random() * songs.length);
    const song = songs[randomIndex];
    console.log(song);

    var newSongLibrary = [...songs];
    newSongLibrary.splice(randomIndex, 1);
    setSongs(newSongLibrary);
    song.isHidden = isHidden;
    return song;
  }

  function setRandomSong() {
    const randomSong = getRandomSong(songs);

    setTeams((prev) => {
      const updatedTeams = [...prev];
      updatedTeams[0] = [
        {
          ...randomSong,
          team:
            gameInfo.currentTeam < gameInfo.numberOfTeams
              ? gameInfo.currentTeam + 1
              : 1,
        },
      ];
      return updatedTeams;
    });

    setGameInfo((prev) => ({
      ...prev,
      currentTrack: randomSong,
    }));
  }

  return (
    <GameContext.Provider
      value={{
        gameInfo,
        setGameInfo,
        teams,
        setTeams,
        teamInfo,
        setTeamInfo,
        songs,
        setSongs,
        getRandomSong,
        setRandomSong,
        ref,
        scollToRef,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameProvider;
