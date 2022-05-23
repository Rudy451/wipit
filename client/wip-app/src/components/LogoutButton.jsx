import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Text } from '@chakra-ui/react';
import methods from '../services';

function LogoutButton() {
  let navigate = useNavigate();

  const logoutRouteChange = async () => {
    await methods.logOutUser();
    let path = `/`;
    navigate(path);
  };

  return (
    <Button
      m={2}
      onClick={logoutRouteChange}
      backgroundColor='teal'
      color='white'
    >
      <Text>logout</Text>
    </Button>
  );
}

export default LogoutButton;
