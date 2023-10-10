import React, { useContext } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Button
} from '@chakra-ui/react'

import { Portal } from '@chakra-ui/portal'
import { GameContext } from '../context/GameContext'

function StealPopup (props) {
  const { isOpen, handleNoStealTry, handleStealTry } = props
  const { ref } = useContext(GameContext)
  return (
    <Portal containerRef={ref}>
      <Modal isOpen={isOpen} isCentered motionPreset='scale'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>¿Algún equipo quiere robar la canción?</ModalHeader>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={handleStealTry}>
              Sí
            </Button>
            <Button colorScheme='red' onClick={handleNoStealTry}>
              No
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Portal>
  )
}

export default StealPopup
