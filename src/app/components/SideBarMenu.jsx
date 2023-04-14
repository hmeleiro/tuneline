import React, { useContext } from 'react';
import { IconButton, Icon } from '@chakra-ui/react';
import ScoreBoard from './ScoreBoard';
import { GrPowerReset } from 'react-icons/gr';
import songLibrary from '../assets/songs.json';
import { AiOutlineFullscreen } from 'react-icons/ai';
import { AiOutlineFullscreenExit } from 'react-icons/ai';
import SpotifyControls from './SpotifyControls';
import { GameContext } from '../context/GameContext';

function SideBarMenu(props) {
  const { FullScreenHandle } = props;
  const { teams } = useContext(GameContext);

  function handleRestart() {
    window.localStorage.removeItem('gameInfo');
    window.localStorage.removeItem('teams');
    window.localStorage.removeItem('teamInfo');
    window.localStorage.removeItem('gameState');

    window.localStorage.setItem(
      'gameInfo',
      JSON.stringify({
        numberOfTeams: null,
        currentTeam: 0,
        winner: null,
      })
    );
    window.localStorage.setItem('teams', JSON.stringify([]));
    window.localStorage.setItem('songs', JSON.stringify(songLibrary));
    window.location.reload();
  }

  return (
    <div className="leading-3 w-[18px] absolute mr-0.5 mt-px portrait:right-[93%] landscape:right-[96%] top-[10%]">
      {FullScreenHandle?.active ? (
        <IconButton
          aria-label="Exit full screen"
          icon={<Icon as={AiOutlineFullscreenExit} w={5} h={5} color="white" />}
          colorScheme="teal"
          onClick={FullScreenHandle.exit}
          className="mb-3"
        />
      ) : (
        <IconButton
          aria-label="Enter full screen"
          icon={<Icon as={AiOutlineFullscreen} w={5} h={5} color="white" />}
          colorScheme="teal"
          onClick={FullScreenHandle.enter}
          className="mb-3"
        />
      )}

      <IconButton
        onClick={handleRestart}
        aria-label="Show score"
        icon={<Icon as={GrPowerReset} w={5} h={5} color="white" />}
        colorScheme="teal"
        className="mb-3"
      />
      <ScoreBoard />
      <SpotifyControls track={teams[0][0]} />
    </div>
  );
}

export default SideBarMenu;
