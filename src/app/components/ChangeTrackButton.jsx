import React, { useContext } from 'react'
import {
  IconButton, Icon
} from '@chakra-ui/react'
import { PiMusicNotesFill } from 'react-icons/pi'
import { WebPlayerContext } from '../context/WebPlayerContext'
import { GameContext } from '../context/GameContext'

function ChangeTrackButton () {
  const { handleChangeTrack } = useContext(WebPlayerContext)
  const { teamInfo, gameInfo } = useContext(GameContext)

  if (teamInfo[gameInfo.currentTeam].numberOfJokers <= 0) {
    return
  }

  return (
    <IconButton
      onClick={handleChangeTrack}
      aria-label='Reset'
      icon={<Icon as={PiMusicNotesFill} w={5} h={5} color='white' />}
      colorScheme='blue'
      className='mb-3'
    />
  )
}

export default ChangeTrackButton
