import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card, CardHeader, CardBody, Heading } from '@chakra-ui/react';

export function TrackCard(props) {
  const { id, track } = props;

  const team = track.team ? `team${track.team}` : 'team0';

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
        className={`${teamColors[team]} ${isCorrect} relative w-12 h-12 shadow-lg border-2 border-black text-center text-white touch-none rounded-full flex justify-center items-center mt-0 mr-3 ml-3 `}
      ></div>
    );
  }

  return (
    <Card variant="elevated">
      <CardHeader>
        <Heading size="md">
          {' '}
          {props.track.album.release_date.slice(0, 4)}
        </Heading>
      </CardHeader>
      <CardBody>
        <p className="text-2xs p-1 italic">{props.track.track.name} </p>
        <p className="text-2xs p-1">{props.track.track.artists[0].name} </p>
      </CardBody>
    </Card>
  );
  return (
    <div
      className={`${teamColors[team]} ${isCorrect} shadow-lg w-32 h-24 border-2 border-black mt-0 mr-3 ml-3 text-center text-white touch-none rounded-2xl place-items-center p-2 overflow-hidden`}
    >
      <p className="text-lg font-bold">
        {props.track.album.release_date.slice(0, 4)}{' '}
      </p>
      <p className="text-2xs p-1 italic">{props.track.track.name} </p>
      <p className="text-2xs p-1">{props.track.track.artists[0].name} </p>
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
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <TrackCard id={props.id} track={props.track} />
    </div>
  );
}
