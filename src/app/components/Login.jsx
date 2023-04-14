import React from 'react';
import { Button } from '@chakra-ui/react';

function Login() {
  return (
    <div className="flex items-center justify-center">
      <Button colorScheme="green">
        <a href={'/api/auth/login'}>Inicia sesión</a>
      </Button>
    </div>
  );
}

export default Login;
