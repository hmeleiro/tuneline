import React, { useContext } from 'react'
import { GameContext } from '../context/GameContext'
import { WebPlayerContext } from '../context/WebPlayerContext'
import { Button, Text } from '@chakra-ui/react'
import bandNames from '../assets/band-names.json'

import './form.css'

function TeamSelection () {
  const { setGameInfo, setTeams, setTeamInfo, songs, getRandomSong } =
    useContext(GameContext)
  const { setTrackinSpotifyPlayer } = useContext(WebPlayerContext)

  const colorPalette = [
    '#264653',
    '#287271',
    '#2a9d8f',
    '#8ab17d',
    '#e9c46a',
    '#f4a261',
    '#ee8959',
    '#e76f51'
  ]

  const submitHandler = (e) => {
    e.preventDefault()

    const form = e.target
    const formData = new FormData(form)
    const formJson = Object.fromEntries(formData.entries())

    //
    const updatedTeams = []
    const updatedTeamInfo = [{ color: null, numberOfJokers: null }]

    // Establezco la primera canción oculta (elemento 1 del array Teams)
    const currentTrack = getRandomSong(songs)
    updatedTeams[0] = [{ ...currentTrack, team: 1 }]
    setTrackinSpotifyPlayer(currentTrack.uri)

    // Establezco las canciones iniciales para cada uno de los equipos
    for (let i = 0; i < formJson.numberOfTeams; i++) {
      updatedTeams[i + 1] = [getRandomSong(songs, false)].sort(
        // Ordenamos el tuneline por año de publicacion
        (a, b) => a.release_date.slice(0, 4) - b.release_date.slice(0, 4)
      )

      const bandIndex = Math.floor(Math.random() * bandNames.length)
      updatedTeamInfo.push({
        name: bandNames[bandIndex],
        color: colorPalette[i],
        numberOfJokers: 3
      })

      bandNames.splice(bandNames, 1)
    }

    setTeams(updatedTeams)
    setTeamInfo(updatedTeamInfo)

    let updatedGameInfo = {}
    updatedGameInfo = {
      currentTeam: 1,
      numberOfTeams: +formJson.numberOfTeams,
      currentTrack
    }
    setGameInfo((gameInfo) => ({
      ...gameInfo,
      ...updatedGameInfo
    }))
  }

  return (
    <div className='flex flex-col h-screen justify-center items-center'>
      <Text
        maxWidth={200}
        align='center'
        fontSize='lg'
        className='ml-9 mr-9'
      >
        Selecciona el número de equipos que van a jugar.
      </Text>
      <form method='post' onSubmit={submitHandler}>
        <div className='form-control'>
          <input
            type='number'
            min={1}
            max={6}
            name='numberOfTeams'
            autoComplete='off'
            required
          />
          {/* https://uiverse.io/liyaxu123/warm-eel-62 */}
          {/* https://tailwindcss.com/docs/transition-property */}
          <label>
            <span className='input transition-delay:0ms'>N</span>
            <span className='transition ease-in-out delay-75'>ú</span>
            <span className='transition ease-in-out delay-100'>m</span>
            <span className='transition ease-in-out delay-150'>e</span>
            <span className='transition ease-in-out delay-200'>r</span>
            <span className='transition ease-in-out delay-[250]'>o</span>
            <span className='transition ease-in-out delay-[300]'> </span>
            <span className='transition ease-in-out delay-[300]'>d</span>
            <span className='transition ease-in-out delay-[350]'>e</span>
            <span className='transition ease-in-out delay-[350]'> </span>
            <span className='transition ease-in-out delay-[400]'>e</span>
            <span className='transition ease-in-out delay-[450]'>q</span>
            <span className='transition ease-in-out delay-[500]'>u</span>
            <span className='transition ease-in-out delay-[550]'>i</span>
            <span className='transition ease-in-out delay-[600]'>p</span>
            <span className='transition ease-in-out delay-[650]'>o</span>
            <span className='transition ease-in-out delay-[700]'>s</span>
          </label>
          <Button type='submit' colorScheme='blue' className='mt-2'>
            Continuar
          </Button>
        </div>
      </form>
    </div>
  )
}

export default TeamSelection
