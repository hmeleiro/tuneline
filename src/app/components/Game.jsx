import React, { useContext, useEffect } from 'react';

import { GameContext } from '../context/GameContext';
import { AuthContext } from '../context/AuthContext';
import { WebPlayerContext } from '../context/WebPlayerContext';
import songLibrary from '../assets/songs.json';

import SpotifyPlayer from './SpotifyPlayer';
import Board from './Board';
import TeamSelection from './TeamSelection';
import Rules from './Rules';
import SideBarMenu from './SideBarMenu';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';

import { Navigate } from 'react-router-dom';

function Game() {
  const { token, refreshToken, getRefreshedToken, expiresAt } =
    useContext(AuthContext);

  const {
    gameInfo,
    setGameInfo,
    teams,
    setTeams,
    teamInfo,
    setTeamInfo,
    songs,
    setSongs,
    ref,
  } = useContext(GameContext);
  const { is_active } = useContext(WebPlayerContext);

  const handle = useFullScreenHandle();

  // gameInfo
  useEffect(() => {
    setGameInfo(
      JSON.parse(window.localStorage.getItem('gameInfo')) === null
        ? {
            numberOfTeams: null,
            currentTeam: 1,
            winner: null,
            currentTrack: {},
          }
        : JSON.parse(window.localStorage.getItem('gameInfo'))
    );
  }, []);
  useEffect(() => {
    window.localStorage.setItem('gameInfo', JSON.stringify(gameInfo));
  }, [gameInfo]);

  // teams
  useEffect(() => {
    setTeams(
      JSON.parse(window.localStorage.getItem('teams')) === null
        ? {}
        : JSON.parse(window.localStorage.getItem('teams'))
    );
  }, []);
  useEffect(() => {
    window.localStorage.setItem('teams', JSON.stringify(teams));
  }, [teams]);

  // teamInfo
  useEffect(() => {
    setTeamInfo(
      JSON.parse(window.localStorage.getItem('teamInfo')) === null
        ? {}
        : JSON.parse(window.localStorage.getItem('teamInfo'))
    );
  }, []);
  useEffect(() => {
    window.localStorage.setItem('teamInfo', JSON.stringify(teamInfo));
  }, [teamInfo]);

  // songs
  useEffect(() => {
    setSongs(
      JSON.parse(window.localStorage.getItem('songs')) === null
        ? songLibrary
        : JSON.parse(window.localStorage.getItem('songs'))
    );
  }, []);
  useEffect(() => {
    window.localStorage.setItem('songs', JSON.stringify(songs));
  }, [songs]);

  if (token != undefined && !is_active)
    return (
      <div className="flex flex-col items-center h-screen justify-center">
        <SpotifyPlayer token={token} />
      </div>
    );

  if (!gameInfo?.numberOfTeams && token) return <TeamSelection />;

  if (gameInfo?.winner != null) {
    return (
      <div className="flex flex-col items-center h-screen justify-center">
        ¡El equipo {teamInfo[gameInfo.winner].name} ha ganado!
      </div>
    );
  }

  if (token) {
    // Check para saber si ha caducado el token y refrescarlo
    var now = new Date();
    now = now[Symbol.toPrimitive]('number');

    if (now >= expiresAt) {
      getRefreshedToken(refreshToken);
    }

    return (
      <>
        <FullScreen handle={handle} className="h-screen">
          <div className="h-screen w-screen" ref={ref}>
            <Rules />
            <SideBarMenu FullScreenHandle={handle} />
            <Board />
          </div>
        </FullScreen>
      </>
    );
  }

  // if (!window.localStorage.getItem('loginInfo')) {
  //   return <Navigate to="/" />;
  // }
}

export default Game;
