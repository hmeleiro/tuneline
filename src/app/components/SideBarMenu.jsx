import React, { useContext } from 'react'
import { IconButton, Icon } from '@chakra-ui/react'
import ScoreBoard from './ScoreBoard'
import { AiOutlineFullscreen, AiOutlineFullscreenExit } from 'react-icons/ai'
import SpotifyControls from './SpotifyControls'
import { GameContext } from '../context/GameContext'
import RestartButton from './RestartButton'
// import ChangeTrack from './ChangeTrack'

function SideBarMenu (props) {
  const { handleFullScreen, isGameFinished } = props
  const { teams } = useContext(GameContext)

  return (
    <div className='leading-3 w-[18px] absolute mr-0.5 mt-px portrait:right-[93%] landscape:right-[96%] top-[10%]'>
      {handleFullScreen?.active
        ? (
          <IconButton
            aria-label='Exit full screen'
            icon={<Icon as={AiOutlineFullscreenExit} w={5} h={5} color='white' />}
            colorScheme='blue'
            onClick={handleFullScreen.exit}
            className='mb-3'
          />
          )
        : (
          <IconButton
            aria-label='Enter full screen'
            icon={<Icon as={AiOutlineFullscreen} w={5} h={5} color='white' />}
            colorScheme='blue'
            onClick={handleFullScreen.enter}
            className='mb-3'
          />
          )}
      {isGameFinished ? <SpotifyControls track={teams[0][0]} /> : null}
      {isGameFinished ? <ScoreBoard /> : null}
      <RestartButton />
      {/* <ChangeTrack /> */}
    </div>
  )
}

export default SideBarMenu
