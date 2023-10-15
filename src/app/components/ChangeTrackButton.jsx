import React, { useContext } from 'react'
import {
  IconButton, Icon
} from '@chakra-ui/react'
import { PiMusicNotesFill } from 'react-icons/pi'
import { WebPlayerContext } from '../context/WebPlayerContext'
import { GameContext } from '../context/GameContext'

function ChangeTrackButton () {
  const { handleChangeTrack } = useContext(WebPlayerContext)
  const { teamInfo, gameInfo, buttonSize, iconSize } = useContext(GameContext)

  const isDisabled = teamInfo[gameInfo.currentTeam].numberOfJokers <= 0

  return (
    <IconButton
      onClick={handleChangeTrack}
      aria-label='Reset'
      icon={<Icon as={PiMusicNotesFill} boxSize={iconSize()} color='white' />}
      colorScheme='blue'
      className='mb-3' isDisabled={isDisabled}
      size={buttonSize()}
    />
  )
}

export default ChangeTrackButton
