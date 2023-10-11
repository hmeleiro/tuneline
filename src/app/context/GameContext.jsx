import React, { createContext, useState, useRef, useContext } from 'react'
import songLibrary from '../assets/songs.json'
import { WebPlayerContext } from '../context/WebPlayerContext'

export const GameContext = createContext()

const GameProvider = ({ children }) => {
  const [gameInfo, setGameInfo] = useState()
  const [boardState, setBoardState] = useState()
  const [teams, setTeams] = useState()
  const [teamInfo, setTeamInfo] = useState()
  const [songs, setSongs] = useState()

  const { setTrackinSpotifyPlayer } = useContext(WebPlayerContext)

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

  function setRandomSong (changeTeam = true) {
    const randomSong = getRandomSong(songs)
    setTrackinSpotifyPlayer(randomSong.uri)

    // Changing the Teams state
    setTeams((prev) => {
      const updatedTeams = [...prev]
      updatedTeams[0] = [
        changeTeam
          // If changeTeam (usual behaviour) set song in team0 and pass turn to next team
          ? {
              ...randomSong,
              team:
              gameInfo.currentTeam < gameInfo.numberOfTeams
                ? gameInfo.currentTeam + 1
                : 1
            }
          // If changeTeam is false (when ChangeTrackButton is pressed) set song in team0 but leave currentTeam
          : {
              ...randomSong,
              team: gameInfo.currentTeam
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

  function handleChangeTrack () {
    const randomSong = getRandomSong(songs)
    setTrackinSpotifyPlayer(randomSong.uri)
  }

  // const setSpotifyPlaylist = (songs) => {
  //   const uris = songs.map((song) => (song.uri))
  //   fetch('https://api.spotify.com/v1/me/player/play', {
  //     method: 'PUT',
  //     headers: {
  //       Authorization: 'Bearer ' + token
  //     },
  //     body: JSON.stringify({
  //       uris
  //     })
  //   })
  // }

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
        setRandomSong,
        ref,
        scollToRef,
        handleRestart,
        handleChangeTrack
      }}
    >
      {children}
    </GameContext.Provider>
  )
}

export default GameProvider
