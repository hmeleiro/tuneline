import React, { useEffect, useContext } from 'react';
import { WebPlayerContext } from '../context/WebPlayerContext';
import { Text } from '@chakra-ui/react';

function SpotifyTransfer(props) {
  const { token } = props;
  const { setPaused, is_active, setActive, is_ready, setIsReady, setPlayer } =
    useContext(WebPlayerContext);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://sdk.scdn.co/spotify-player.js';
    script.async = true;

    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: 'Tuneline Game',
        getOAuthToken: (cb) => {
          cb(token);
        },
        volume: 0.5,
      });

      setPlayer(player);

      player.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id);
        setIsReady(true);
      });

      player.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id);
        setIsReady(false);
      });

      player.addListener('initialization_error', ({ message }) => {
        console.error(message);
      });

      player.addListener('authentication_error', ({ message }) => {
        console.error(message);
      });

      player.addListener('account_error', ({ message }) => {
        console.error(message);
      });

      player.addListener('player_state_changed', (state) => {
        if (!state) {
          return;
        }
        setPaused(state.paused);

        player.getCurrentState().then((state) => {
          !state ? setActive(false) : setActive(true);
        });
      });

      player.connect();
    };
  }, []);

  if (!is_active && is_ready) {
    transferDevice();

    return (
      <div className="flex flex-col items-center justify-center">
        <Text maxWidth={200} align="center" mb={2}>
          Transfiriendo la reproducción de Spotify a este dispositivo.
        </Text>
        <span className="loader"></span>
      </div>
    );
  }

  async function transferDevice() {
    // Identifico el device_id
    const devices = await fetch(
      'https://api.spotify.com/v1/me/player/devices',
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    );
    const json = await devices.json();
    const tunelineDevice = json.devices.find((d) => d.name === 'Tuneline Game');

    // Transfiero la reproducción al device_id
    fetch('https://api.spotify.com/v1/me/player', {
      method: 'PUT',
      headers: {
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({
        device_ids: [tunelineDevice.id],
      }),
    });
  }
}

export default SpotifyTransfer;
