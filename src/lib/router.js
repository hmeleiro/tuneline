const express = require('express');
const dotenv = require('dotenv');
const axios = require('axios');

const router = express.Router();

dotenv.config();

var spotify_client_id = process.env.SPOTIFY_CLIENT_ID;
var spotify_client_secret = process.env.SPOTIFY_CLIENT_SECRET;
var spotify_redirect_uri = process.env.SPOTIFY_REDIRECT_URI;

router.get('/hello', async (_req, res) => {
  res.status(200).json({ message: 'Hello World!' });
});

var generateRandomString = function (length) {
  var text = '';
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

// Authorization workflow
router.get('/auth/login', (req, res) => {
  console.log('Sending user to Spotify login page...', Date());
  var scope =
    'streaming user-read-email user-read-private ugc-image-upload user-read-playback-state user-modify-playback-state';

  var state = generateRandomString(16);

  var auth_query_parameters = new URLSearchParams({
    response_type: 'code',
    client_id: spotify_client_id,
    scope: scope,
    redirect_uri: spotify_redirect_uri,
    state: state,
  });

  res.redirect(
    'https://accounts.spotify.com/authorize/?' +
      auth_query_parameters.toString()
  );
});

router.get('/auth/callback', async (req, res) => {
  console.log('User logged in Spotify. Soliciting access_token...', Date());

  try {
    const response = await axios({
      method: 'post',
      url: 'https://accounts.spotify.com/api/token',
      data: {
        code: req.query.code,
        redirect_uri: spotify_redirect_uri,
        grant_type: 'authorization_code',
      },
      headers: {
        Authorization:
          'Basic ' +
          Buffer.from(spotify_client_id + ':' + spotify_client_secret).toString(
            'base64'
          ),
        'content-type': 'application/x-www-form-urlencoded',
      },
    });

    const params = new URLSearchParams(response.data).toString();
    console.log('Redirecting user to index...', Date());
    res.redirect('/?' + params);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.get('/auth/refresh_token', async (req, res) => {
  var refresh_token = req.query.refresh_token;
  console.log('Refreshing token...', Date());

  try {
    const response = await axios({
      method: 'post',
      url: 'https://accounts.spotify.com/api/token',
      headers: {
        Authorization:
          'Basic ' +
          Buffer.from(spotify_client_id + ':' + spotify_client_secret).toString(
            'base64'
          ),
        'content-type': 'application/x-www-form-urlencoded',
      },
      data: {
        refresh_token: refresh_token,
        grant_type: 'refresh_token',
      },
    });

    res.send(response.data);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

///////////////////////////////////

module.exports = router;
