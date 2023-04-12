import React, { useContext, useRef } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GameContext } from '../context/GameContext';

export function TrackCard(props) {
  const { track } = props;
  const team = track.team ? `team${track.team}` : 'team0';

  const { scollToRef } = useContext(GameContext);

  const teamColors = {
    team0: 'bg-team0',
    team1: 'bg-team1',
    team2: 'bg-team2',
    team3: 'bg-team3',
    team4: 'bg-team4',
    team5: 'bg-team5',
  };

  if (track.isCorrect) {
    var isCorrect = 'outline outline-dashed outline-8 outline-correct surprise';
  } else if (track.isCorrect === false) {
    var isCorrect = 'outline outline-dashed outline-8 outline-incorrect swing';
  }

  if (track.isHidden) {
    return (
      <div
        className={`${teamColors[team]} ${isCorrect} w-12 h-12 shadow-lg rounded-full landscape:mr-3 landscape:ml-3 portrait:mt-3 portrait:mb-3`}
      ></div>
    );
  }

  if (track.isCorrect) {
    return (
      <div
        ref={scollToRef}
        className={`${teamColors[team]} ${isCorrect} flex shadow-2xl w-32 h-32 touch-manipulation landscape:mr-3 landscape:ml-3 portrait:mt-3 portrait:mb-3 text-center text-white justify-center items-center align-middle p-1 overflow-hidden`}
      >
        <div className="flex flex-col justify-center items-center">
          <p className="text-2xs p-1 italic">{track.track_name} </p>
          <p className="text-lg font-bold">{track.release_date} </p>
          <p className="text-2xs p-1">{track.artist_name} </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${teamColors[team]} ${isCorrect} flex shadow-2xl w-32 h-32 touch-manipulation landscape:mr-3 landscape:ml-3 portrait:mt-3 portrait:mb-3 text-center text-white justify-center items-center align-middle p-1 overflow-hidden`}
    >
      <div className="flex flex-col justify-center items-center">
        <p className="text-2xs p-1 italic">{track.track_name} </p>
        <p className="text-lg font-bold">{track.release_date} </p>
        <p className="text-2xs p-1">{track.artist_name} </p>
      </div>
    </div>
  );
}

export function TrackCardOverlay(props) {
  const { id, track } = props;
  return (
    <div>
      <TrackCard id={id} track={track} />
    </div>
  );
}

export default function SortableTrackCard(props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id, disabled: props.disabled });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <TrackCard id={props.id} track={props.track} />
    </div>
  );
}
