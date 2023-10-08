import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Text,
  useDisclosure,
  ModalFooter,
  Button
} from '@chakra-ui/react'

function Rules () {
  const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true })

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        closeOnEsc={false}
        closeOnOverlayClick={false}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Cómo jugar a Tuneline</ModalHeader>
          <ModalBody>
            <Text maxWidth={800} fontSize='xs' mb={3}>
              Para empezar a jugar dale al play. La musica empezará a sonar y el
              equipo al que le toque tendrá que deliberar si la canción fue
              publicada antes o después de la canción inicial de su tuneline.
              Para ello el equipo deberá arrastrar su ficha al lugar
              correspondiente.
            </Text>
            <Text maxWidth={800} fontSize='xs' mb={3}>
              El resto de equipos tendrá la posibilidad de robar la canción
              posicionando uno de sus comodines en donde crea que realmente
              corresponde la canción que suena. Si aciertan, se llevarán la
              canción a su tuneline. Varios equipos pueden tratar de disputar la
              canción, pero las fichas se deberán colocar en el orden en el que
              lo pidieron los equipos. Cada equipo empieza la partida con 3
              comodines.
            </Text>
            <Text fontSize='xs'>
              <b>
                <i>Recomendamos jugar a pantalla completa </i>{' '}
              </b>{' '}
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              ¡A jugar!
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default Rules
