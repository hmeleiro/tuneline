import React, { useContext, useEffect } from 'react'
import { GameContext } from '../context/GameContext'
import { AuthContext } from '../context/AuthContext'
import { WebPlayerContext } from '../context/WebPlayerContext'
import songLibrary from '../assets/tuneline-songs.json'
import SpotifyPlayer from './SpotifyPlayer'
import Board from './Board'
import TeamSelection from './TeamSelection'
import Rules from './Rules'
import SideBarMenu from './SideBarMenu'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import ScoreBoardEndScreen from './ScoreBoardEndScreen'
import { Navigate } from 'react-router-dom'

function Game () {
  const { token, refreshToken, getRefreshedToken } =
    useContext(AuthContext)
  const {
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
    ref
  } = useContext(GameContext)

  const { isActive } = useContext(WebPlayerContext)

  const handle = useFullScreenHandle()

  useEffect(() => {
    const gameInfoLocalStorage = window.localStorage.getItem('gameInfo')
    setGameInfo(
      gameInfoLocalStorage === 'undefined' || JSON.parse(gameInfoLocalStorage) === null
        ? {
            numberOfTeams: null,
            currentTeam: 1,
            winner: null,
            currentTrack: {}
          }
        : JSON.parse(gameInfoLocalStorage)
    )
  }, [])

  useEffect(() => {
    if (gameInfo !== undefined) {
      window.localStorage.setItem('gameInfo', JSON.stringify(gameInfo))
    }
  }, [gameInfo])

  // teams
  useEffect(() => {
    const teamsLocalStorage = window.localStorage.getItem('teams')
    setTeams(
      teamsLocalStorage === 'undefined' || JSON.parse(teamsLocalStorage) === null
        ? {}
        : JSON.parse(teamsLocalStorage)
    )
  }, [])
  useEffect(() => {
    if (teams !== undefined) {
      window.localStorage.setItem('teams', JSON.stringify(teams))
    }
  }, [teams])

  // teamInfo
  useEffect(() => {
    const teamInfoLocalStorage = window.localStorage.getItem('teamInfo')
    setTeamInfo(
      teamInfoLocalStorage === 'undefined' || JSON.parse(teamInfoLocalStorage) === null
        ? {}
        : JSON.parse(teamInfoLocalStorage)
    )
  }, [])
  useEffect(() => {
    if (teamInfo !== undefined) {
      window.localStorage.setItem('teamInfo', JSON.stringify(teamInfo))
    }
  }, [teamInfo])

  useEffect(() => {
    const boardStateLocalStorage = window.localStorage.getItem('boardState')
    setBoardState(
      boardStateLocalStorage === 'undefined' || JSON.parse(boardStateLocalStorage) === null
        ? {
            showStealPopup: false,
            stealTry: false,
            showNextTeamButton: false,
            showSolveButton: false,
            showRules: true
          }
        : JSON.parse(boardStateLocalStorage)
    )
  }, [])

  useEffect(() => {
    if (boardState !== undefined) {
      window.localStorage.setItem('boardState', JSON.stringify(boardState))
    }
  }, [boardState])

  // songs
  useEffect(() => {
    const songsLocalStorage = window.localStorage.getItem('songs')
    setSongs(
      songsLocalStorage === 'undefined' || JSON.parse(songsLocalStorage) === null
        ? songLibrary
        : JSON.parse(songsLocalStorage)
    )
  }, [])

  useEffect(() => {
    if (songs !== undefined) {
      window.localStorage.setItem('songs', JSON.stringify(songs))
    }
  }, [songs])

  if (token === undefined && refreshToken) {
    console.log(token)
    console.log(isActive)
    getRefreshedToken(refreshToken)
  }

  if (!refreshToken) {
    return <Navigate to='/' />
  }

  // Si hay un token pero el reproductor todavía no está activo, renderiza el reproductor
  if (token !== undefined && !isActive) {
    return (
      <div className='flex flex-col items-center h-screen justify-center'>
        <SpotifyPlayer token={token} />
      </div>
    )
  }

  // Si hay un access_token pero no hay información de número de equipos, que muestre el selector de equipos
  if (!gameInfo?.numberOfTeams && token) return <TeamSelection />

  // Si hay un ganador, finaliza el juego
  if (gameInfo?.winner != null) {
    return (
      <>
        <FullScreen handle={handle} className='h-screen'>
          <SideBarMenu HandleFullScreen={handle} />
          <div className='flex flex-col items-center h-screen justify-center'>
            ¡El equipo {teamInfo[gameInfo.winner].name} ha ganado!
            <ScoreBoardEndScreen />
          </div>

        </FullScreen>
      </>

    )
  }

  // Si hay un access_token, que muestre el juego normalmente
  if (token) {
    return (
      <>
        <FullScreen handle={handle} className='h-screen'>
          <div className='h-screen w-screen' ref={ref}>
            {boardState.showRules ? <Rules /> : ''}
            <SideBarMenu handleFullScreen={handle} isGameFinished />
            <Board />
          </div>
        </FullScreen>
      </>
    )
  }
}

export default Game
