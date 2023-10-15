import React, { useContext } from 'react'
import { GameContext } from '../context/GameContext'
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer
} from '@chakra-ui/react'

function ScoreBoardEndScreen () {
  const { teams, teamInfo } = useContext(GameContext)
  const teamColors = {
    team0: 'text-team0',
    team1: 'text-team1',
    team2: 'text-team2',
    team3: 'text-team3',
    team4: 'text-team4',
    team5: 'text-team5'
  }

  return (
    <TableContainer>
      <Table variant='simple' size='sm'>
        <Thead>
          <Tr>
            <Th>Equipo</Th>
            <Th>Puntos</Th>
          </Tr>
        </Thead>
        <Tbody>
          {teams.slice(1, teamInfo.length).map((t, i) => {
            const team = `team${i + 1}`
            const teamName = teamInfo[i + 1].name
            const teamScore = t.filter(
              (t) =>
                !t.isHidden &&
          ((t.isCorrect && t.team === i + 1) ||
            t.isCorrect === undefined)
            ).length
            return (
              <Tr key={i}>
                <Td className={`${teamColors[team]} font-bold mr-1 mt-1 text-sm`}>{teamName}</Td>
                <Td isNumeric>{teamScore}
                </Td>
              </Tr>
            )
          })}
        </Tbody>
      </Table>
    </TableContainer>
  )
}

export default ScoreBoardEndScreen
