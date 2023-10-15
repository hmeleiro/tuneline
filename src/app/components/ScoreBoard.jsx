import React, { useContext } from 'react'
import { GameContext } from '../context/GameContext'
import { MdScoreboard } from 'react-icons/md'
import {
  IconButton, Icon,
  AlertDialog,
  AlertDialogBody,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  AlertDialogCloseButton,
  Portal
} from '@chakra-ui/react'

function ScoreBoard () {
  const { scoreBoardTable, buttonSize, iconSize, ref } = useContext(GameContext)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef()

  return (
    <>
      <IconButton
        onClick={onOpen}
        aria-label='Show score'
        icon={<Icon as={MdScoreboard} boxSize={iconSize()} color='white' />}
        colorScheme='blue'
        className='mb-3'
        size={buttonSize()}
      />

      <Portal containerRef={ref}>
        <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose} isCentered motionPreset='scale'>
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogCloseButton />
              </AlertDialogHeader>

              <AlertDialogBody>
                {scoreBoardTable()}
                {/* <div className='flex flex-col space-y-2'>
                  <p className='font-bold mr-1 mt-1 text-sm'>
                    Equipo: puntos (comodines)
                  </p>

                  {teams.slice(1, gameInfo.numberOfTeams + 1).map((e, i) => {
                    const team = `team${i + 1}`
                    return (
                      <p
                        className={`${teamColors[team]} font-bold mr-1 mt-1 text-sm`}
                        key={i}
                      >
                        <span className='mr-2'>
                          {teamInfo[i + 1].name}:{' '}
                          {
              e.filter(
                (t) =>
                  !t.isHidden &&
                  ((t.isCorrect && t.team === i + 1) ||
                    t.isCorrect === undefined)
              ).length
            }{' '}
                          ({teamInfo[i + 1].numberOfJokers})
                        </span>
                        <IconButton
                          aria-label='Add joker'
                          size='xs'
                          mr={1}
                          icon={<AddIcon />}
                          onClick={() => changeJokers(i + 1, true)}
                        />
                        <IconButton
                          aria-label='Substract joker'
                          size='xs'
                          mr={1}
                          icon={<MinusIcon />}
                          onClick={() => changeJokers(i + 1)}
                        />
                      </p>
                    )
                  })}
                </div> */}
              </AlertDialogBody>
            </AlertDialogContent>

          </AlertDialogOverlay>
        </AlertDialog>
      </Portal>
    </>
  )
}

export default ScoreBoard
