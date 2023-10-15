import React, { useContext } from 'react'
import { GameContext } from '../context/GameContext'
import {
  IconButton, Icon,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  AlertDialogCloseButton,
  Button
} from '@chakra-ui/react'

import { VscDebugRestart } from 'react-icons/vsc'
import { Portal } from '@chakra-ui/portal'

function RestartButton () {
  const { handleRestart, ref, buttonSize, iconSize } = useContext(GameContext)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef()

  return (
    <>
      <IconButton
        onClick={onOpen}
        aria-label='Reset'
        icon={<Icon as={VscDebugRestart} boxSize={iconSize()} color='white' />}
        colorScheme='blue'
        className='mb-3'
        size={buttonSize()}
      />
      <Portal containerRef={ref}>
        <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose} isCentered motionPreset='scale'>
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader>
                Reiniciar partida
              </AlertDialogHeader>
              <AlertDialogCloseButton />

              <AlertDialogBody>
                ¿Seguro que quieres reiniciar la partida? No podrás recuparar los datos de juego.
              </AlertDialogBody>
              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose} className='mr-3'>Seguir jugando</Button>
                <Button colorScheme='red' onClick={handleRestart}>Reiniciar</Button>
              </AlertDialogFooter>
            </AlertDialogContent>

          </AlertDialogOverlay>
        </AlertDialog>
      </Portal>
    </>
  )
}

export default RestartButton
