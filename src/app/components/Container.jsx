import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable';

import SortableTrackCard from './TrackCard';

function Container(props) {
  const { id, items, tuneline } = props;
  const { setNodeRef } = useDroppable({
    id,
  });

  const tunelineStyles = tuneline
    ? 'landscape:pt-5 landscape:pb-5 landscape:pl-10 landscape:pr-10 portrait:p-10'
    : 'p-2';

  return (
    <SortableContext
      id={id}
      items={items.map((item) => item.uri)}
      strategy={
        screen.orientation.type === 'landscape-primary'
          ? horizontalListSortingStrategy
          : verticalListSortingStrategy
      }
    >
      <div
        ref={setNodeRef}
        className={`flex items-center ${tunelineStyles} mt-2 mb-2 landscape:justify-center landscape:overflow-x-auto landscape:overflow-y-hidden landscape:w-[85%] portrait:flex-col portrait:overflow-y-auto portrait:overflow-x-hidden`}
      >
        {items.map((item, index) => {
          return (
            <SortableTrackCard
              key={`item.uri-${index}`}
              id={item?.uri}
              track={item}
              disabled={
                item.team && !item.hasOwnProperty('isCorrect') ? false : true
              }
            />
          );
        })}
      </div>
    </SortableContext>
  );
}

export default Container;
