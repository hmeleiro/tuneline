import React, { useContext, useState, useEffect } from 'react'
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  MouseSensor,
  closestCorners,
  TouchSensor,
  useSensor,
  useSensors,
  defaultDropAnimation
} from '@dnd-kit/core'
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import { GameContext } from '../context/GameContext'
import { WebPlayerContext } from '../context/WebPlayerContext'
import StealPopup from './StealPopup'
import { TrackCardOverlay } from './TrackCard'
import Container from './Container'
import { Button } from '@chakra-ui/react'

const WIN_NUMBER = 10

export default function Board () {
  const [activeId, setActiveId] = useState()
  const {
    gameInfo,
    setGameInfo,
    boardState,
    setBoardState,
    teamInfo,
    setTeamInfo,
    teams,
    setTeams,
    getRandomSong,
    scollToRef, screenSize, buttonSize
  } = useContext(GameContext)

  const { isPaused, togglePlay, setTrackInGame } = useContext(WebPlayerContext)

  const dropAnimation = {
    ...defaultDropAnimation
  }

  useEffect(() => {
    window.localStorage.setItem('boardState', JSON.stringify(boardState))
  }, [boardState])

  useEffect(() => {
    if (scollToRef.current != null) {
      scollToRef.current.scrollIntoView(true)
    }
  }, [scollToRef])

  const teamColor = 'text-team' + gameInfo.currentTeam
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 8
      }
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    }),
    // useSensor(PointerSensor)
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 300,
        tolerance: 8
      }
    })
  )

  return (
    <div className='flex flex-col justify-center h-screen w-screen'>
      {/* BOTONES DE PASAR EQUIPO Y RESOLVER */}
      <div className='flex flex-col items-center justify-center h-[10vh] mt-8'>
        <div className='flex items-center'>
          <p className='text-sm md:text-md lg:text-lg xl:text-xl font-bold'>
            Es el turno de{' '}
            <span className={`${teamColor}`}>
              {teamInfo[gameInfo.currentTeam].name}
            </span>{' '}
            {/* <p>({teamInfo[gameInfo.currentTeam].numberOfJokers} comodines)</p> */}
          </p>
        </div>

        {/* Botón de siguiente equipo */}
        {boardState.showNextTeamButton
          ? (
            <div className='h-[10vh]'>
              <Button
                onClick={handleNextTeam}
                colorScheme='blue'
                className='mt-3 mb-3'
              >
                Siguiente equipo
              </Button>
            </div>
            )
          : (
            <div className='h-[10vh]' />
            )}

        {/* Botón de resolver ronda */}
        {boardState.showSolveButton
          ? (
            <div className='h-[10vh]'>
              <Button
                colorScheme='blue' size={buttonSize(screenSize.width)}
                onClick={handleSolve}
                className='mt-3 mb-3'
              >
                Resolver
              </Button>
            </div>
            )
          : (
              ''
            )}
      </div>

      {/* DRAG AND DROP TIMELINE */}
      <div className='flex-1 w-full h-[80vh] items-center justify-center'>
        <StealPopup
          isOpen={boardState.showStealPopup}
          handleStealTry={handleStealTry}
          handleNoStealTry={handleNoStealTry}
        />

        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <div className='flex flex-col h-[80vh] items-center justify-center'>
            <Container id='0' items={teams[0]} />
            <Container
              id='1'
              items={teams[gameInfo.currentTeam]}
              tuneline
            />
          </div>

          <DragOverlay dropAnimation={dropAnimation}>
            {activeId
              ? (
                <TrackCardOverlay
                  id={activeId}
                  track={teams[findContainer(activeId)].find(
                    (e) => e.uri === activeId
                  )}
                />
                )
              : null}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  )

  function handleNextTeam () {
    // QUITARLE UN COMODÍN A QUIEN LO HAYA USADO
    setTeamInfo((prev) => {
      const usedJokers = teams[gameInfo.currentTeam]
        .filter(
          (e) => Object.prototype.hasOwnProperty.call(e, 'team') && e.team !== gameInfo.currentTeam
        )
        .map((e) => e.team)

      const updatedTeamInfo = [...prev]

      updatedTeamInfo.map((team, i) => {
        if (usedJokers.includes(i)) {
          team.numberOfJokers -= 1
        }
        return team
      })

      return updatedTeamInfo
    })

    setTeams((prev) => {
      const updatedTeams = [...prev]

      // Extraigo la respuesta correcta y hago una shallow copy
      const correctAnswer = Object.assign(
        {},
        updatedTeams[gameInfo.currentTeam].find((e) => e.isCorrect)
      )

      const correctTeam = correctAnswer.team

      delete correctAnswer.team
      delete correctAnswer.isCorrect

      // Filtro el tuneline del equipo que está jugando para eliminar las respuestas incorrectas
      // y la correcta en el caso de que sea de otro equipo
      updatedTeams[gameInfo.currentTeam] = updatedTeams[
        gameInfo.currentTeam
      ].filter((e) => {
        return (
          (e.isCorrect && e.team === gameInfo.currentTeam) ||
          e.isCorrect === undefined
        )
      })

      if (correctTeam === gameInfo.currentTeam) {
        updatedTeams[gameInfo.currentTeam].forEach(function (e) {
          delete e.team
          delete e.isCorrect
        })
      }

      // Si no es el turno del equipo que ha acertado es porque la ha robado
      // con el rebote, y por lo tanto se la pongo en su tuneline
      if (correctTeam !== gameInfo.currentTeam && correctTeam !== 0) {
        updatedTeams[correctTeam].push(correctAnswer)

        updatedTeams[correctTeam] = updatedTeams[correctTeam].sort(
          (a, b) => a.release_date - b.release_date
        )

        updatedTeams[correctTeam].forEach(function (e) {
          delete e.team
          delete e.isCorrect
        })
      }
      return updatedTeams
    })

    // Checkeo si ha ganado alguien
    if (teams[gameInfo.currentTeam].length >= WIN_NUMBER) {
      setGameInfo((gameInfo) => ({
        ...gameInfo,
        winner: gameInfo.currentTeam
      }))
    }

    // Oculto el botón de Siguiente equipo
    setBoardState(prev => ({
      ...prev,
      showNextTeamButton: false
    }))

    // Cambio el modo rebote
    setBoardState(prev => ({
      ...prev,
      stealTry: false
    }))

    // Establezco una nueva canción de forma aleatoria
    const randomSong = getRandomSong()
    setTrackInGame(randomSong)

    // Si estaba sonando la música, la pauso
    if (!isPaused) {
      togglePlay()
    }

    // // Paso al siguiente equipo
    setGameInfo((prev) => {
      let updatedGameInfo = {}
      updatedGameInfo = {
        currentTeam:
          gameInfo.currentTeam >= gameInfo.numberOfTeams
            ? 1
            : gameInfo.currentTeam + 1
      }
      return { ...prev, ...updatedGameInfo }
    })
  }

  function handleStealTry () {
    setBoardState(prev => ({
      ...prev,
      showSolveButton: true
    }))
    setBoardState(prev => ({
      ...prev,
      stealTry: !prev.stealTry
    }))
    setTeams((prev) => {
      const updatedTeams = [...prev]
      let currentTrack = {}

      for (let i = 1; i <= gameInfo.numberOfTeams; i++) {
        currentTrack = gameInfo.currentTrack

        if (i !== gameInfo.currentTeam && teamInfo[i].numberOfJokers > 0) {
          currentTrack.team = i
          updatedTeams[0].push({
            ...currentTrack,
            uri: currentTrack.uri + '_' + i,
            team: i,
            color: teamInfo[i].color
          })
        }
      }
      return updatedTeams
    })

    // Cierro el showStealPopup que pregunta si se va a usar la ficha Tuneline
    setBoardState(prev => ({
      ...prev,
      showStealPopup: false
    }))
  }

  function handleNoStealTry () {
    // Cierro el showStealPopup que pregunta si se va a usar la ficha Tuneline
    setBoardState(prev => ({
      ...prev,
      showStealPopup: false
    }))
    setBoardState(prev => ({
      ...prev,
      showSolveButton: true
    }))
  }

  function handleSolve () {
    setTeams((prev) => {
      const updatedTeams = [...prev]
      updatedTeams[gameInfo.currentTeam].forEach((e, i, array) => {
        if (Object.prototype.hasOwnProperty.call(e, 'team')) {
          let prev = +array[i - 1]?.release_date
          const curr = +e.release_date
          let next = +array[i + 1]?.release_date
          prev = isNaN(prev) ? 0 : prev
          next = isNaN(next) ? 9999 : next
          e.isCorrect = prev <= curr && curr < next
          if (e.isCorrect) {
            e.isHidden = false
          }
          return e
        }
      })

      const correctAnswerExists =
        updatedTeams[gameInfo.currentTeam].filter(
          (e) => Object.prototype.hasOwnProperty.call(e, 'team') && e.isCorrect
        ).length > 0

      if (!correctAnswerExists) {
        setTeams((prev) => {
          const updatedTeams = [...prev]

          const currentTrackYear = +gameInfo.currentTrack.release_date
          const correctIndex = updatedTeams[gameInfo.currentTeam].findLastIndex(
            (e) => e.team === undefined && +e.release_date <= currentTrackYear
          )

          updatedTeams[gameInfo.currentTeam].splice(correctIndex + 1, 0, {
            ...gameInfo.currentTrack,
            isCorrect: true,
            isHidden: false,
            team: 0
          })
        })
      }

      return updatedTeams
    })

    setBoardState(prev => ({
      ...prev,
      showNextTeamButton: true
    }))
    setBoardState(prev => ({
      ...prev,
      showSolveButton: false
    }))
  }

  function findContainer (id) {
    if (id in teams) {
      return id
    }
    let res
    for (const key in teams) {
      teams[key].forEach((e) => {
        if (e.uri === id) {
          res = key
        }
      })
    }
    return res
  }

  function handleDragStart (event) {
    const { active } = event
    const { id } = active
    setActiveId(id)
  }

  function handleDragOver (event) {
    const { active, over } = event
    const { id } = active

    if (over === null) {
      return
    }
    const { id: overId } = over

    // Find the containers
    const activeContainer = findContainer(id)
    const overContainer = findContainer(overId)

    if (
      (activeContainer === 1 && overContainer === 0) ||
      (activeContainer === 1 && overContainer === 1)
    ) {
      return
    }

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer === overContainer
    ) {
      return
    }

    setTeams((prev) => {
      const activeItems = prev[activeContainer]
      const overItems = prev[overContainer]

      // Find the indexes for the items
      const activeIndex = activeItems
        .map(function (e) {
          return e.uri
        })
        .indexOf(id)

      const overIndex = overItems
        .map(function (e) {
          return e.uri
        })
        .indexOf(overId)

      let newIndex
      if (overId in prev) {
        // We're at the root droppable of a container
        newIndex = overItems.length + 1
      } else {
        const isBelowLastItem =
          over &&
          active.rect.current.translated &&
          active.rect.current.translated.top > over.rect.top + over.rect.height

        const modifier = isBelowLastItem ? 1 : 0
        newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1
      }

      const updatedTeams = [...prev]
      updatedTeams[activeContainer] = [
        ...prev[activeContainer].filter((item) => item.uri !== active.id)
      ]
      updatedTeams[overContainer] = [
        ...prev[overContainer].slice(0, newIndex),
        teams[activeContainer][activeIndex],
        ...prev[overContainer].slice(newIndex, prev[overContainer].length)
      ]

      return updatedTeams
    })
  }

  function handleDragEnd (event) {
    const { active, over } = event
    const { id } = active

    if (over === null) {
      return
    }
    const { id: overId } = over

    const activeContainer = findContainer(id)
    const overContainer = findContainer(overId)

    if (
      (activeContainer === 1 && overContainer === 0) ||
      (activeContainer === 1 && overContainer === 1)
    ) {
      return
    }

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer !== overContainer
    ) {
      return
    }

    // Find the indexes for the items
    const activeIndex = teams[activeContainer]
      .map(function (e) {
        return e.uri
      })
      .indexOf(id)

    const overIndex = teams[overContainer]
      .map(function (e) {
        return e.uri
      })
      .indexOf(overId)

    if (activeIndex !== overIndex) {
      if (overContainer === '0') {
        return
      }

      // Altero el orden de los items
      setTeams((prev) => {
        const updatedTeams = [...prev]
        updatedTeams[activeContainer] = arrayMove(
          teams[overContainer],
          activeIndex,
          overIndex
        )
        return updatedTeams
      })

      // Si ningún equipo tiene comodines muestro el boton
      // para resolver la jugada
      const numberOfJokers = teamInfo.map((team) => team.numberOfJokers)
      if (Math.max(...numberOfJokers) === 0) {
        setBoardState(prev => ({
          ...prev,
          showSolveButton: true
        }))
      }

      // Si no es un rebote y algún equipo tiene jokers
      // preguntar si algún equipo quiere robar
      if (!boardState.stealTry && Math.max(...numberOfJokers) > 0) {
        setBoardState(prev => ({
          ...prev,
          showStealPopup: true
        }))
      }
    } else {
      if (overContainer === '0') {
        return
      }
      // Si ningún equipo tiene comodines muestro el boton
      // para resolver la jugada
      const numberOfJokers = teamInfo.map((team) => team.numberOfJokers)
      if (Math.max(...numberOfJokers) === 0) {
        setBoardState(prev => ({
          ...prev,
          showSolveButton: true
        }))
      }
      // Si no es un rebote y algún equipo tiene jokers
      // preguntar si algún equipo quiere robar
      if (!boardState.stealTry && Math.max(...numberOfJokers) > 0) {
        setBoardState(prev => ({
          ...prev,
          showStealPopup: true
        }))
      }
    }
    setActiveId(null)
  }
}
