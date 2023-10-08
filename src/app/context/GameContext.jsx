import React, { createContext, useState, useRef } from 'react'
import songLibrary from '../assets/songs.json'

export const GameContext = createContext()

const GameProvider = ({ children }) => {
  const [gameInfo, setGameInfo] = useState()
  const [teams, setTeams] = useState()
  const [teamInfo, setTeamInfo] = useState()
  const [songs, setSongs] = useState()

  const ref = useRef(null)
  const scollToRef = useRef(null)

  function getRandomSong (songs, isHidden = true) {
    const randomIndex = Math.floor(Math.random() * songs.length)
    const song = songs[randomIndex]
    const newSongLibrary = [...songs]
    newSongLibrary.splice(randomIndex, 1)
    setSongs(newSongLibrary)
    song.isHidden = isHidden
    return song
  }

  function setRandomSong () {
    const randomSong = getRandomSong(songs)

    setTeams((prev) => {
      const updatedTeams = [...prev]
      updatedTeams[0] = [
        {
          ...randomSong,
          team:
            gameInfo.currentTeam < gameInfo.numberOfTeams
              ? gameInfo.currentTeam + 1
              : 1
        }
      ]
      return updatedTeams
    })

    setGameInfo((prev) => ({
      ...prev,
      currentTrack: randomSong
    }))
  }

  function handleRestart () {
    window.localStorage.removeItem('gameInfo')
    window.localStorage.removeItem('teams')
    window.localStorage.removeItem('teamInfo')
    window.localStorage.removeItem('gameState')

    window.localStorage.setItem(
      'gameInfo',
      JSON.stringify({
        numberOfTeams: null,
        currentTeam: 0,
        winner: null
      })
    )
    window.localStorage.setItem('teams', JSON.stringify([]))
    window.localStorage.setItem('songs', JSON.stringify(songLibrary))
    window.location.reload()
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
        handleRestart
      }}
    >
      {children}
    </GameContext.Provider>
  )
}

export default GameProvider
