import React, { createContext, useState, useRef } from 'react'
import songLibrary from '../assets/tuneline-songs.json'

export const GameContext = createContext()

const GameProvider = ({ children }) => {
  const [gameInfo, setGameInfo] = useState()
  const [boardState, setBoardState] = useState()
  const [teams, setTeams] = useState()
  const [teamInfo, setTeamInfo] = useState()
  const [songs, setSongs] = useState(songLibrary)
  const [screenSize, setScreenSize] = useState(getCurrentDimension())

  const ref = useRef(null)
  const scollToRef = useRef(null)

  function getRandomSong (isHidden = true) {
    const songsLibrary = [...songs]
    const initSongIndex = Math.floor(Math.random() * songsLibrary.length)
    const randomSong = songsLibrary.splice(initSongIndex, 1)[0]
    randomSong.isHidden = isHidden
    songsLibrary.splice(initSongIndex, 1)
    setSongs(songsLibrary)
    return randomSong
  }

  function handleRestart () {
    window.localStorage.removeItem('gameInfo')
    window.localStorage.removeItem('teams')
    window.localStorage.removeItem('teamInfo')
    window.localStorage.removeItem('boardState')

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

  function getCurrentDimension () {
    return {
      width: window.innerWidth,
      height: window.innerHeight
    }
  }

  const buttonSize = (w) => {
    switch (true) {
      case w <= 640:
        return 'xs'
      case w <= 768:
        return 'sm'
      case w <= 1024:
        return 'md'
      default:
        return 'lg'
    }
  }

  return (
    <GameContext.Provider
      value={{
        gameInfo,
        setGameInfo,
        boardState,
        setBoardState,
        teams,
        setTeams,
        teamInfo,
        setTeamInfo,
        songs,
        setSongs,
        getRandomSong,
        ref,
        scollToRef,
        handleRestart,
        screenSize,
        setScreenSize,
        getCurrentDimension,
        buttonSize
      }}
    >
      {children}
    </GameContext.Provider>
  )
}

export default GameProvider
