import React, { createContext, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export const WebPlayerContext = createContext();

const WebPlayerProvider = ({ children }) => {
  const [is_paused, setPaused] = useState(true);
  const [is_active, setActive] = useState(false);
  const [is_ready, setIsReady] = useState(false);
  const [player, setPlayer] = useState(undefined);
  const { token } = useContext(AuthContext);

  function togglePlay() {
    player.togglePlay().then(() => {
      console.log('Toggled playback!');
      setPaused((prev) => !prev);
    });
  }

  async function setTrack(track) {
    const res = await fetch('https://api.spotify.com/v1/me/player/play', {
      method: 'PUT',
      headers: {
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({
        uriS: [track],
      }),
    }).then(() => {
      fetch('https://api.spotify.com/v1/me/player/pause', {
        method: 'PUT',
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
    });
    console.log(res);
  }

  return (
    <WebPlayerContext.Provider
      value={{
        is_paused,
        setPaused,
        is_active,
        setActive,
        is_ready,
        setIsReady,
        player,
        setPlayer,
        togglePlay,
        setTrack,
      }}
    >
      {children}
    </WebPlayerContext.Provider>
  );
};

export default WebPlayerProvider;
