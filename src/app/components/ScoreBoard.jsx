import React, { useContext } from 'react'
import { GameContext } from '../context/GameContext'
import { MdScoreboard } from 'react-icons/md'
import { AddIcon, MinusIcon } from '@chakra-ui/icons'
import {
  PopoverContent,
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverBody,
  PopoverArrow,
  Icon
} from '@chakra-ui/react'

function ScoreBoard () {
  const { gameInfo, teams, teamInfo, setTeamInfo } = useContext(GameContext)

  function changeJokers (team, add) {
    // Si se va a restar y el equipo ya tiene 0 comodines, no se hace nada
    if (!add && teamInfo[team].numberOfJokers === 0) return

    setTeamInfo((prev) => {
      const updatedTeamInfo = [...prev]
      add
        ? (updatedTeamInfo[team].numberOfJokers += 1)
        : (updatedTeamInfo[team].numberOfJokers -= 1)
      return updatedTeamInfo
    })
  }

  const teamColors = {
    team0: 'text-team0',
    team1: 'text-team1',
    team2: 'text-team2',
    team3: 'text-team3',
    team4: 'text-team4',
    team5: 'text-team5'
  }

  return (
    <Popover placement='auto' isLazy matchWidth>
      <PopoverTrigger>
        <IconButton
          aria-label='Show score'
          icon={<Icon as={MdScoreboard} w={5} h={5} color='white' />}
          colorScheme='teal'
          className='mb-3'
        />
      </PopoverTrigger>

      <PopoverContent>
        <PopoverArrow />
        <PopoverBody>
          <div className='flex flex-col space-y-2'>
            <p className='font-bold mr-1 mt-1 text-sm'>
              Equipo: puntos (comodines)
            </p>

            {teams.slice(1, gameInfo.numberOfTeams + 1).map((e, i) => {
              const team = `team${i + 1}`
              return (
                <p
                  className={`${teamColors[team]} font-bold mr-1 mt-1 text-sm`}
                  key={i}
                >
                  <span className='mr-2'>
                    {teamInfo[i + 1].name}:{' '}
                    {
                      e.filter(
                        (t) =>
                          !t.isHidden &&
                          ((t.isCorrect && t.team === i + 1) ||
                            t.isCorrect === undefined)
                      ).length
                    }{' '}
                    ({teamInfo[i + 1].numberOfJokers})
                  </span>
                  <IconButton
                    aria-label='Add joker'
                    size='xs'
                    mr={1}
                    icon={<AddIcon />}
                    onClick={() => changeJokers(i + 1, true)}
                  />
                  <IconButton
                    aria-label='Substract joker'
                    size='xs'
                    mr={1}
                    icon={<MinusIcon />}
                    onClick={() => changeJokers(i + 1)}
                  />
                </p>
              )
            })}
          </div>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

export default ScoreBoard
