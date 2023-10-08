import React, { useContext } from 'react'
import { WebPlayerContext } from '../context/WebPlayerContext'
import { FaPlay } from 'react-icons/fa'
import { ImPause2 } from 'react-icons/im'
import { IconButton, Icon } from '@chakra-ui/react'

// import { IconContext } from 'react-icons';

function SpotifyControls (props) {
  const { track } = props
  const { isPaused, togglePlay } = useContext(WebPlayerContext)
  return (
    <div className='mb-3'>
      {isPaused
        ? (
          <IconButton
            aria-label='Play music'
            icon={<Icon as={FaPlay} w={5} h={5} />}
            colorScheme='teal'
            onClick={() => togglePlay(track)}
          />
          )
        : (
          <IconButton
            aria-label='Pause music'
            icon={<Icon as={ImPause2} w={5} h={5} />}
            colorScheme='teal'
            onClick={() => togglePlay(track)}
          />
          )}
    </div>
  )
}

export default SpotifyControls
