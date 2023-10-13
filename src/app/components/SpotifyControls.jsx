import React, { useContext } from 'react'
import { WebPlayerContext } from '../context/WebPlayerContext'
import { GameContext } from '../context/GameContext'

import { FaPlay } from 'react-icons/fa'
import { ImPause2 } from 'react-icons/im'
import { IconButton, Icon } from '@chakra-ui/react'

// import { IconContext } from 'react-icons';

function SpotifyControls () {
  const { isPaused, togglePlay } = useContext(WebPlayerContext)
  const { buttonSize, screenSize } = useContext(GameContext)

  return (
    <div className='mb-3'>
      {isPaused
        ? (
          <IconButton
            aria-label='Play music'
            icon={<Icon as={FaPlay} w={5} h={5} />}
            colorScheme='blue'
            onClick={togglePlay}
            size={buttonSize(screenSize.width)}
          />
          )
        : (
          <IconButton
            aria-label='Pause music'
            icon={<Icon as={ImPause2} w={5} h={5} />}
            colorScheme='blue'
            onClick={togglePlay}
            size={buttonSize(screenSize.width)}
          />
          )}
    </div>
  )
}

export default SpotifyControls
