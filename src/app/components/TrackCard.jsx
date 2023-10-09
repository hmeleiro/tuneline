import React, { useContext } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GameContext } from '../context/GameContext'

export function TrackCard (props) {
  const { track } = props
  const team = track.team ? `team${track.team}` : 'team0'

  const { scollToRef } = useContext(GameContext)

  const bgTeamColors = {
    team0: 'bg-team0',
    team1: 'bg-team1',
    team2: 'bg-team2',
    team3: 'bg-team3',
    team4: 'bg-team4',
    team5: 'bg-team5'
  }

  const textTeamColors = {
    team0: 'text-black',
    team1: 'text-black',
    team2: 'text-white',
    team3: 'text-black',
    team4: 'text-white',
    team5: 'text-white'
  }

  let isCorrect = ''
  if (track.isCorrect) {
    isCorrect = 'outline outline-dashed outline-8 outline-correct surprise'
  } else if (track.isCorrect === false) {
    isCorrect = 'outline outline-dashed outline-8 outline-incorrect swing'
  }

  if (track.isHidden) {
    // Circle token of each team
    return (
      <div
        className={`${bgTeamColors[team]} ${isCorrect} w-12 h-12 md:w-20 md:h-20 shadow-xl rounded-full landscape:mr-3 landscape:ml-3 portrait:mt-3 portrait:mb-3`}
      />
    )
  }

  if (track.isCorrect) {
    // Square token for when the correct anwser is revealed
    console.log(bgTeamColors[team])
    return (
      <div
        ref={scollToRef}
        className={`${bgTeamColors[team]} ${isCorrect} flex shadow-lg w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 2xl:w-46 2xl:h-46 touch-manipulation landscape:mr-3 landscape:ml-3 portrait:mt-3 portrait:mb-3 text-center text-black justify-center items-center align-middle p-1 overflow-hidden`}
      >
        <div className='flex flex-col justify-center items-center'>
          <p className={`${textTeamColors[team]} italic text-2xs sm:text-sm lg:text-md 2xl:text-md p-1`}>{track.track_name} </p>
          <p className={`${textTeamColors[team]} font-bold text-lg sm:text-xl lg:text-2xl 2xl:text-2xl`}>{track.release_date} </p>
          <p className={`${textTeamColors[team]} text-2xs sm:text-sm lg:text-md 2xl:text-md p-1`}>{track.artist_name} </p>
        </div>
      </div>
    )
  }

  return (
    // Square token for the already awnsered songs
    <div
      className={`${bgTeamColors[team]} ${isCorrect} flex shadow-xl w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 2xl:w-46 2xl:h-46 touch-manipulation landscape:mr-3 landscape:ml-3 portrait:mt-3 portrait:mb-3 text-center text-black justify-center items-center align-middle p-1 overflow-hidden`}
    >
      <div className='flex flex-col justify-center items-center'>
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
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: props.id, disabled: props.disabled })

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
    >
      <TrackCard id={props.id} track={props.track} />
    </div>
  )
}
