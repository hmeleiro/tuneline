import React, { useContext } from 'react'
import { WebPlayerContext } from '../context/WebPlayerContext'
import { GameContext } from '../context/GameContext'

import { FaPlay } from 'react-icons/fa'
import { ImPause2 } from 'react-icons/im'
import { IconButton, Icon } from '@chakra-ui/react'

function SpotifyControls () {
  const { isPaused, togglePlay } = useContext(WebPlayerContext)
  const { buttonSize, iconSize } = useContext(GameContext)

  return (
    <div className='mb-3'>
      {isPaused
        ? (
          <IconButton
            aria-label='Play music'
            // icon={<Icon as={FaPlay} boxSize={iconSize(scale)} />}
            icon={<Icon as={FaPlay} boxSize={iconSize() - 1} />}
            colorScheme='blue'
            onClick={togglePlay}
            size={buttonSize()}
          />
          )
        : (
          <IconButton
            aria-label='Pause music'
            icon={<Icon as={ImPause2} boxSize={iconSize() - 1} />}
            colorScheme='blue'
            onClick={togglePlay}
            size={buttonSize()}
          />
          )}
    </div>
  )
}

export default SpotifyControls
