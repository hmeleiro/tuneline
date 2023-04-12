import React, { useContext } from 'react';
import { GameContext } from '../context/GameContext';
import { MdScoreboard } from 'react-icons/md';

import {
  PopoverContent,
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverBody,
  PopoverArrow,
  Icon,
} from '@chakra-ui/react';

function ScoreBoard() {
  const { gameInfo, teams, teamInfo } = useContext(GameContext);

  const teamColors = {
    team0: 'text-team0',
    team1: 'text-team1',
    team2: 'text-team2',
    team3: 'text-team3',
    team4: 'text-team4',
    team5: 'text-team5',
  };

  return (
    <Popover placement="auto" isLazy matchWidth={true}>
      <PopoverTrigger>
        <IconButton
          aria-label="Show score"
          icon={<Icon as={MdScoreboard} w={5} h={5} color="white" />}
          colorScheme="teal"
          className="mb-3"
        />
      </PopoverTrigger>

      <PopoverContent>
        <PopoverArrow />
        <PopoverBody>
          <p className={`font-bold mr-1 mt-1 text-sm`}>
            Equipo: puntos (comodines)
          </p>

          {teams.slice(1, gameInfo.numberOfTeams + 1).map((e, i) => {
            {
              const team = `team${i + 1}`;
              return (
                <p
                  className={`${teamColors[team]} font-bold mr-1 mt-1 text-sm`}
                  key={i}
                >
                  {teamInfo[i + 1].name} {i + 1}:{' '}
                  {
                    e.filter(
                      (t) =>
                        !t.isHidden &&
                        ((t.isCorrect && t.team === i + 1) ||
                          t.isCorrect === undefined)
                    ).length
                  }{' '}
                  ({teamInfo[i + 1].numberOfJokers})
                </p>
              );
            }
          })}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}

export default ScoreBoard;
