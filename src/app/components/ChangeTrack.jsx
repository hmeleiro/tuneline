import React, { useContext } from 'react'
import {
  IconButton, Icon
} from '@chakra-ui/react'
import { VscDebugRestart } from 'react-icons/vsc'
import { GameContext } from '../context/GameContext'

function ChangeTrack () {
  const { setRandomSong } = useContext(GameContext)

  return (
    <IconButton
      onClick={setRandomSong}
      aria-label='Reset'
      icon={<Icon as={VscDebugRestart} w={5} h={5} color='red' />}
      colorScheme='blue'
      className='mb-3'
    />
  )
}

export default ChangeTrack
