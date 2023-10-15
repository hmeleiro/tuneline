import React, { createContext, useState, useRef } from 'react'
import songLibrary from '../assets/tuneline-songs.json'
import { AddIcon, MinusIcon } from '@chakra-ui/icons'
import {
  IconButton,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer
} from '@chakra-ui/react'

export const GameContext = createContext()

const GameProvider = ({ children }) => {
  const [gameInfo, setGameInfo] = useState()
  const [boardState, setBoardState] = useState()
  const [teams, setTeams] = useState()
  const [teamInfo, setTeamInfo] = useState()
  const [songs, setSongs] = useState(songLibrary)
  const [screenSize, setScreenSize] = useState(getCurrentDimension())

  const ref = useRef(null)
  const scollToRef = useRef(null)

  function getRandomSong (isHidden = true) {
    const songsLibrary = [...songs]
    const initSongIndex = Math.floor(Math.random() * songsLibrary.length)
    const randomSong = songsLibrary.splice(initSongIndex, 1)[0]
    randomSong.isHidden = isHidden
    console.log(randomSong.release_date)
    songsLibrary.splice(initSongIndex, 1)
    setSongs(songsLibrary)
    return randomSong
  }

  function handleRestart () {
    window.localStorage.removeItem('gameInfo')
    window.localStorage.removeItem('teams')
    window.localStorage.removeItem('teamInfo')
    window.localStorage.removeItem('boardState')

    window.localStorage.setItem(
      'gameInfo',
      JSON.stringify({
        numberOfTeams: null,
        currentTeam: 0,
        winner: null
      })
    )
    window.localStorage.setItem('teams', JSON.stringify([]))
    window.localStorage.setItem('songs', JSON.stringify(songLibrary))
    window.location.reload()
  }

  function getCurrentDimension () {
    return {
      width: window.innerWidth,
      height: window.innerHeight
    }
  }

  const buttonSize = () => {
    const w = screenSize.width
    switch (true) {
      case w <= 640:
        return 'xs'
      case w <= 768:
        return 'sm'
      case w <= 1024:
        return 'md'
      default:
        return 'lg'
    }
  }

  const iconSize = () => {
    const w = screenSize.width
    switch (true) {
      case w <= 640:
        return 5
      case w <= 768:
        return 6
      case w <= 1024:
        return 7
      default:
        return 8
    }
  }

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

  const scoreBoardTable = () => {
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
              <Th>Comodines</Th>
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
              const teamJokers = teamInfo[i + 1].numberOfJokers
              const disablePlusButton = teamJokers >= 5
              return (
                <Tr key={i}>
                  <Td className={`${teamColors[team]} font-bold mr-1 mt-1 text-sm`}>{teamName}</Td>
                  <Td isNumeric>{teamScore}
                  </Td>
                  <Td isNumeric><span>{teamJokers} </span>
                    <IconButton
                      aria-label='Add joker' className='ml-3'
                      size='xs'
                      mr={1}
                      icon={<AddIcon />} colorScheme='blue' isDisabled={disablePlusButton}
                      onClick={() => changeJokers(i + 1, true)}
                    />
                    <IconButton
                      aria-label='Substract joker'
                      size='xs'
                      mr={1}
                      icon={<MinusIcon />} colorScheme='blue'
                      onClick={() => changeJokers(i + 1)}
                    />

                  </Td>
                </Tr>
              )
            })}
          </Tbody>
        </Table>
      </TableContainer>
    )
  }

  return (
    <GameContext.Provider
      value={{
        gameInfo,
        setGameInfo,
        boardState,
        setBoardState,
        teams,
        setTeams,
        teamInfo,
        setTeamInfo,
        songs,
        setSongs,
        getRandomSong,
        ref,
        scollToRef,
        handleRestart,
        screenSize,
        setScreenSize,
        getCurrentDimension,
        buttonSize,
        iconSize,
        scoreBoardTable
      }}
    >
      {children}
    </GameContext.Provider>
  )
}

export default GameProvider
