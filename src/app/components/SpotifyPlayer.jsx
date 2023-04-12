import React, { useEffect, useContext, useState } from 'react';
import { WebPlayerContext } from '../context/WebPlayerContext';
import SpotifyWebApi from 'spotify-web-api-js';
import { Button } from '@chakra-ui/react';
import { Text } from '@chakra-ui/react';

var spotifyApi = new SpotifyWebApi();
function SpotifyTransfer(props) {
  const { token } = props;
  const {
    setPaused,
    is_active,
    setActive,
    is_ready,
    setIsReady,
    setPlayer,
    spotify,
    setSpotify,
  } = useContext(WebPlayerContext);

  useEffect(() => {
    spotifyApi.setAccessToken(token);
    setSpotify(spotifyApi);
  }, []);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://sdk.scdn.co/spotify-player.js';
    script.async = true;

    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: 'Tuneline Game',
        getOAuthToken: (cb) => {
          cb(props.token);
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

  function transferDevice() {
    spotify.getMyDevices(function (err, data) {
      if (err) {
        console.error(err);
      } else {
        const devices = data.devices.find((d) => d.name === 'Tuneline Game');
        spotify.transferMyPlayback(
          [devices?.id],
          { play: false },
          function (err) {
            if (err) {
              console.log(err);
            }
          }
        );
      }
    });
  }
}

export default SpotifyTransfer;
