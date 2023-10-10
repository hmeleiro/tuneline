import React, { createContext, useState, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

export const WebPlayerContext = createContext()

const WebPlayerProvider = ({ children }) => {
  const [isPaused, setPaused] = useState(true)
  const [isActive, setActive] = useState(false)
  const [isReady, setIsReady] = useState(false)
  const [player, setPlayer] = useState(undefined)
  const { token, refreshToken, getRefreshedToken } = useContext(AuthContext)

  function togglePlay (track) {
    // Si no hay track simplemente alterna play/pause
    if (!track) {
      player.togglePlay().then(() => {
        setPaused((prev) => !prev)
      })
      return
    }

    player.getCurrentState().then(async (state) => {
      if (!state) {
        console.error('User is not playing music through the Web Playback SDK')
        return
      }
      // Miramos si la canción que está pinchada en el reproductor
      // es la que está en juego
      const currentTrack = state.track_window.current_track

      // Si no es la misma pinchamos la que está en juego...
      if (currentTrack.uri !== track.uri) {
        console.log(track)
        console.log(currentTrack)
        console.log('Holaaaa')
        fetch('https://api.spotify.com/v1/me/player/play', {
          method: 'PUT',
          headers: {
            Authorization: 'Bearer ' + token
          },
          body: JSON.stringify({
            uris: [track.uri]
          })
        }).then(() => {
          setPaused((prev) => !prev)
        }).catch((err) => {
          // if (refreshToken) {
          //   getRefreshedToken(refreshToken)
          // }
          console.log(err)
        })

        // Si es la misma simplemente alternamos play/pause
      } else {
        console.log(track)
        console.log(currentTrack)
        player.togglePlay().then(() => {
          setPaused((prev) => !prev)
        })
      }
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
        togglePlay
      }}
    >
      {children}
    </WebPlayerContext.Provider>
  )
}

export default WebPlayerProvider
