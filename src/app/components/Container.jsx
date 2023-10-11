import React from 'react'
import { useDroppable } from '@dnd-kit/core'
import {
  SortableContext,
  verticalListSortingStrategy,
  horizontalListSortingStrategy
} from '@dnd-kit/sortable'

import SortableTrackCard from './TrackCard'

function Container (props) {
  const { id, items, tuneline } = props
  const { setNodeRef } = useDroppable({
    id
  })

  const tunelineStyles = tuneline ? 'p-10 h-[65vh] mt-2 landscape:justify-start' : 'p-4 h-[15vh] mt-6 landscape:justify-center'

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
        // landscape:w-[85%]
        className={`flex flex-grow landscape:max-w-[87%] items-center ${tunelineStyles} h-[30vh]  mb-2 landscape:overflow-x-auto landscape:overflow-y-hidden  portrait:flex-col portrait:overflow-y-auto portrait:overflow-x-hidden`}
      >
        {items.map((item, index) => {
          return (
            <SortableTrackCard
              key={`item.uri-${index}`}
              id={item?.uri}
              track={item}
              disabled={
                !(item.team && !Object.prototype.hasOwnProperty.call(item, 'isCorrect'))
              }
            />
          )
        })}
      </div>
    </SortableContext>
  )
}

export default Container
