import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import Login from './Login'
import { Navigate } from 'react-router-dom'
import { Heading, Text } from '@chakra-ui/react'

function HomePage () {
  const { token } = useContext(AuthContext)

  if (!token) {
    return (
      <div className='flex flex-col items-center h-screen justify-center'>
        <Heading size='3xl' className='mb-2 ml-9 mr-9'>
          Tuneline
        </Heading>
        <Text maxWidth={400} align='center' fontSize='md' className='mb-2 ml-9 mr-9'>
          Tuneline es un juego por equipos que consiste en ordenar
          cronológicamente canciones aleatorias.{' '}
          <b>
            El primer equipo que consiga colocar 10 canciones en su tuneline
            gana.
          </b>
        </Text>
        <Text align='center' fontSize='sm' className='mb-4 ml-9 mr-9'>
          <i>
            {' '}
            Es necesario una cuenta de <b>Spotify premium</b> para jugar.
          </i>
        </Text>
        <Login />
      </div>
    )
  }
  return <Navigate to='/game' />
}

export default HomePage
