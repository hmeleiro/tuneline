import React, { createContext, useState, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { GameContext } from '../context/GameContext'

export const WebPlayerContext = createContext()

const WebPlayerProvider = ({ children }) => {
  const [isPaused, setPaused] = useState(true)
  const [isActive, setActive] = useState(false)
  const [isReady, setIsReady] = useState(false)
  const [player, setPlayer] = useState(undefined)
  const { token } = useContext(AuthContext)
  const { gameInfo, setTeams, setTeamInfo, setGameInfo, getRandomSong } = useContext(GameContext)

  const authHeaders = {
    Authorization: 'Bearer ' + token
  }

  const setTrackInGame = (track, nextTeam = true) => {
    console.log(track.release_date)
    // Changing the Teams state
    setTeams((prev) => {
      const updatedTeams = [...prev]
      updatedTeams[0] = [
        nextTeam
          // If nextTeam (usual behaviour) set song in team0 and pass turn to next team
          ? {
              ...track,
              team:
              gameInfo.currentTeam < gameInfo.numberOfTeams
                ? gameInfo.currentTeam + 1
                : 1
            }
          // If nextTeam is false (when ChangeTrackButton is pressed) set song in team0 but leave currentTeam
          : {
              ...track,
              team: gameInfo.currentTeam
            }

      ]
      return updatedTeams
    })

    setGameInfo((prev) => ({
      ...prev,
      currentTrack: track
    }))
  }

  const playTrack = async (trackUri) => {
    fetch('https://api.spotify.com/v1/me/player/play', {
      method: 'PUT',
      headers: authHeaders,
      body: JSON.stringify({
        uris: [trackUri]
      })
    })
      .catch((error) => {
        console.log(error)
      })
  }

  function togglePlay () {
    player.getCurrentState().then(async (state) => {
      if (!state) {
        console.error('User is not playing music through the Web Playback SDK')
        return
      }
      // Miramos si la canción que está pinchada en el reproductor
      // es la que está en juego...
      const currentTrackInPlayer = state.track_window.current_track
      const currentTrackInGame = gameInfo.currentTrack

      // ...si no es la misma pinchamos la que está en juego:
      if (currentTrackInPlayer.uri !== currentTrackInGame.uri) {
        playTrack(currentTrackInGame.uri)
        // ...si es la misma simplemente alternamos play/pause:
      } else {
        player.togglePlay().then(() => {
          setPaused((prev) => !prev)
        })
      }
    })
  }

  function handleChangeTrack () {
    if (!isPaused) {
      player.pause().then(() => {
        // setPaused(true)
      })
    }
    const randomSong = getRandomSong()
    setTrackInGame(randomSong, false)

    setTeamInfo(prev => {
      const updatedTeamInfo = [...prev]
      updatedTeamInfo[gameInfo.currentTeam].numberOfJokers -= 1
      return updatedTeamInfo
    })
  }

  return (
    <WebPlayerContext.Provider
      value={{
        isPaused,
        setPaused,
        isActive,
        setActive,
        isReady,
        setIsReady,
        player,
        setPlayer,
        togglePlay,
        setTrackInGame,
        handleChangeTrack
      }}
    >
      {children}
    </WebPlayerContext.Provider>
  )
}

export default WebPlayerProvider
