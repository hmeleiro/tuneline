import { createContext, useState } from 'react';

export const WebPlayerContext = createContext();

const WebPlayerProvider = ({ children }) => {
  const [is_paused, setPaused] = useState(true);
  const [is_active, setActive] = useState(false);
  const [is_ready, setIsReady] = useState(false);
  const [player, setPlayer] = useState(undefined);
  const [spotify, setSpotify] = useState();

  function togglePlay(track) {
    // var currentlyPlaying;
    // var isTrackCurrentlyPlaying;
    // spotify.getMyCurrentPlayingTrack(function (err, data) {
    //   if (err) {
    //     console.log(err);
    //   } else {
    //     console.log(data);
    //     currentlyPlaying = data.item;

    //     console.log(currentlyPlaying);

    //     isTrackCurrentlyPlaying =
    //       currentlyPlaying.track.uri === track.track.uri;

    //     console.log(isTrackCurrentlyPlaying);

    //     if (isTrackCurrentlyPlaying) {
    //       is_paused ? spotify.play() : spotify.pause();
    //     } else {
    //       is_paused
    //         ? spotify.play({ uris: [track.track.uri] })
    //         : spotify.pause();
    //     }
    //   }
    // });

    if (track) {
      is_paused
        ? spotify.play({ uris: [track.uri] }, (err) => {
            if (err) {
              console.log(err);
            }
          })
        : spotify.pause();
    } else {
      is_paused ? spotify.play() : spotify.pause();
    }

    setPaused((prev) => !prev);
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
        spotify,
        setSpotify,
        togglePlay,
      }}
    >
      {children}
    </WebPlayerContext.Provider>
  );
};

export default WebPlayerProvider;
