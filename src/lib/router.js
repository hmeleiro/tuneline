const express = require('express')
const dotenv = require('dotenv')
const axios = require('axios')

const router = express.Router()

dotenv.config()

const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET
const SPOTIFY_REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI

router.get('/hello', async (_req, res) => {
  res.status(200).json({ message: 'Hello World!' })
})

const generateRandomString = function (length) {
  let text = ''
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}

// Authorization workflow
router.get('/auth/login', (req, res) => {
  console.log('Sending user to Spotify login page...', Date())
  const scope =
    'streaming user-read-email user-read-private ugc-image-upload user-read-playback-state user-modify-playback-state'

  const state = generateRandomString(16)

  const authQueryParameters = new URLSearchParams({
    response_type: 'code',
    client_id: SPOTIFY_CLIENT_ID,
    scope,
    redirect_uri: SPOTIFY_REDIRECT_URI,
    state
  })

  res.redirect(
    'https://accounts.spotify.com/authorize/?' +
      authQueryParameters.toString()
  )
})

router.get('/auth/callback', async (req, res) => {
  console.log('User logged in Spotify. Soliciting access_token...', Date())

  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        Authorization:
          'Basic ' +
          Buffer.from(SPOTIFY_CLIENT_ID + ':' + SPOTIFY_CLIENT_SECRET).toString(
            'base64'
          ),
        'content-type': 'application/x-www-form-urlencoded'
      },

      body: new URLSearchParams({
        code: req.query.code,
        redirect_uri: SPOTIFY_REDIRECT_URI,
        grant_type: 'authorization_code'
      })
    })
      .then(res => res.json())
      .then(data => data)

    const userData = await fetch('https://api.spotify.com/v1/me', {
      headers: {
        Authorization:
                'Bearer ' + response.access_token
      }
    }
    )
      .then(res => res.json())
      .then(data => data)

    const params = {
      ...response,
      ...userData
    }

    console.log('Redirecting user to index...', Date())
    res.cookie('access_token', response.access_token, { maxAge: 1000 * response.expires_in, httpOnly: false })
    res.cookie('refresh_token', response.refresh_token)

    res.redirect('/?' + new URLSearchParams(params).toString())
  } catch (err) {
    res.status(500).json({ message: err })
  }
})

router.get('/auth/refresh_token', async (req, res) => {
  const refreshToken = req.query.refresh_token
  console.log('Refreshing token...', Date())
  try {
    const response = await axios({
      method: 'post',
      url: 'https://accounts.spotify.com/api/token',
      headers: {
        Authorization:
          'Basic ' +
          Buffer.from(SPOTIFY_CLIENT_ID + ':' + SPOTIFY_CLIENT_SECRET).toString(
            'base64'
          ),
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        refresh_token: refreshToken,
        grant_type: 'refresh_token'
      }
    })

    res.cookie('access_token', response.data.access_token, { maxAge: 1000 * response.data.expires_in, httpOnly: false })
    res.send(response.data)
  } catch (err) {
    res.status(500).json({ message: err })
  }
})

/// ////////////////////////////////

module.exports = router
