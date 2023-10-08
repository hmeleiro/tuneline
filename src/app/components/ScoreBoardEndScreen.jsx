import React, { useContext } from 'react'
import { GameContext } from '../context/GameContext'

function ScoreBoardEndScreen () {
  const { gameInfo, teams, teamInfo } = useContext(GameContext)
  const teamColors = {
    team0: 'text-team0',
    team1: 'text-team1',
    team2: 'text-team2',
    team3: 'text-team3',
    team4: 'text-team4',
    team5: 'text-team5'
  }

  return (
    <div className='flex flex-col space-y-2 mt-6'>

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
              } canciones
            </span>
          </p>
        )
      })}
    </div>
  )
}

export default ScoreBoardEndScreen
