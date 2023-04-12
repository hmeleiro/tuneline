import { useContext, useEffect } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';
import SpotifyWebApi from 'spotify-web-api-js';
import { WebPlayerContext } from '../context/WebPlayerContext';

var spotifyApi = new SpotifyWebApi();
function Player(props) {
  const { uri, token } = props;
  const { setSpotify } = useContext(WebPlayerContext);

  useEffect(() => {
    spotifyApi.setAccessToken(token);
    setSpotify(spotifyApi);
  }, []);

  return <SpotifyPlayer name="Tuneline Game" token={token} uris={[uri]} />;
}

export default Player;
