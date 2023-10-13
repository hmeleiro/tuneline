import React, { useContext } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GameContext } from '../context/GameContext'
import { WebPlayerContext } from '../context/WebPlayerContext'
import Vinyl from '../assets/icons/vinyl-2.svg?react'

export function TrackCard (props) {
  const { track } = props
  const team = track.team ? `team${track.team}` : 'team0'

  const { scollToRef } = useContext(GameContext)
  const { isPaused } = useContext(WebPlayerContext)

  const bgTeamColors = {
    team0: 'bg-white',
    team1: 'bg-team1',
    team2: 'bg-team2',
    team3: 'bg-team3',
    team4: 'bg-team4',
    team5: 'bg-team5'
  }
  const vinylTeamColors = {
    team0: 'white',
    team1: '#76c3b7',
    team2: '#c24a4f',
    team3: '#d4bc40',
    team4: '#14b249',
    team5: '#f58e49'
  }

  const textTeamColors = {
    team0: 'text-black',
    team1: 'text-black',
    team2: 'text-white',
    team3: 'text-black',
    team4: 'text-white',
    team5: 'text-white'
  }

  const vinylSizes = {
    sm: '4rem',
    md: '4rem',
    lg: '5rem',
    xl: '5.5rem',
    '2xl': '7rem'
  }

  const windowSizes = (w) => {
    switch (true) {
      case w <= 640:
        return 'sm'
      case w <= 768:
        return 'md'
      case w <= 1024:
        return 'lg'
      case w <= 1280:
        return 'xl'
      default:
        return '2xl'
    }
  }

  const windowWidth = window.innerWidth
  const vinylSize = vinylSizes[windowSizes(windowWidth)]
  let isCorrect = ''
  if (track.isCorrect) {
    isCorrect = 'outline outline-4 outline-correct surprise'
  } else if (track.isCorrect === false) {
    isCorrect = 'outline outline-4 outline-incorrect swing'
  }

  if (track.isHidden) {
    // Circle token of each team
    return (
      <Vinyl
        fill={vinylTeamColors[team]} width={vinylSize} height={vinylSize} viewBox='0 0 512 512' stroke='black' strokeWidth='5'
        className={`${vinylTeamColors[team]}} ${isPaused ? 'vinyl-shadow' : 'vinyl-animation'} landscape:mr-3 landscape:ml-3 portrait:mt-3 portrait:mb-3 overflow-visible`}
      />
    )
  }

  if (track.isCorrect) {
    // Square token for when the correct anwser is revealed
    return (
      <div
        style={{ '--image-url': `url(${track.album_image})` }}
        className={`bg-[image:var(--image-url)] ${isCorrect} bg-cover bg-no-repeat flex shadow-xl p-0 border-2 border-black w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 2xl:w-46 2xl:h-46 touch-manipulation landscape:mr-3 landscape:ml-3 portrait:mt-3 portrait:mb-3 text-center text-black justify-center items-center align-middle overflow-hidden`}
      >
        <div
          ref={scollToRef}
          className={`${bgTeamColors[team]} flex flex-col justify-center items-center bg-opacity-80 h-full w-full`}
        >
          <p className={`${textTeamColors[team]} font-bold italic text-2xs sm:text-sm lg:text-md 2xl:text-md p-1`}>{track.track_name} </p>
          <p className={`${textTeamColors[team]} font-bold text-lg sm:text-xl lg:text-2xl 2xl:text-2xl`}>{track.release_date} </p>
          <p className={`${textTeamColors[team]} font-bold text-2xs sm:text-sm lg:text-md 2xl:text-md p-1`}>{track.artist_name} </p>
        </div>
      </div>
    )
  }

  return (
    // Square token for the already awnsered songs
    <div
      style={{ '--image-url': `url(${track.album_image})` }}
      className='bg-[image:var(--image-url)] bg-cover bg-no-repeat flex shadow-xl p-0 border-2 border-black w-24 h-24 overflow-x-auto  sm:w-32 sm:h-32 lg:w-40 lg:h-40 2xl:w-46 2xl:h-46 touch-manipulation landscape:mr-3 landscape:ml-3 portrait:mt-3 portrait:mb-3  overflow-hidden'
    >
      <div
        className={`${bgTeamColors[team]} flex flex-col justify-center items-center text-center bg-opacity-80 h-full w-full `}
      >
        <p className='italic text-2xs sm:text-sm lg:text-md 2xl:text-md p-1'>{track.track_name} </p>
        <p className='font-bold text-lg sm:text-xl lg:text-2xl 2xl:text-2xl'>{track.release_date} </p>
        <p className='text-2xs sm:text-sm lg:text-md 2xl:text-md p-1'>{track.artist_name} </p>
      </div>
    </div>
  )
}

export function TrackCardOverlay (props) {
  const { id, track } = props
  return <TrackCard id={id} track={track} />
}

export default function SortableTrackCard (props) {
  const { isHidden } = props.track
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: props.id, disabled: props.disabled })
  console.log(isHidden)

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0 : 1
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className='overflow-visible'
      // className={isHidden ? 'overflow-hidden' : 'overflow-visible'}
    >
      <TrackCard id={props.id} track={props.track} />
    </div>
  )
}
