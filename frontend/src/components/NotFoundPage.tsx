import React from 'react';
import { Button, Text, Box } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { BsChevronRight } from 'react-icons/bs';

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <Box w="90%" mx="auto" my="50px">
      <Text fontSize="6xl">404</Text>
      <Text fontSize="4xl" color="gray">
        We sincerely apologise.
      </Text>
      <Text fontSize="l" w="40%" color="gray">
        The page are you are looking for is no longer here. Maybe it was never
        here in the first place. In any case, we are sorry you were sent on this
        wild goose chase, and have already taken steps to have the person
        responsible fired.
      </Text>
      <Button
        onClick={() => navigate('/dashboard')}
        variant="link"
        colorScheme="blue"
      >
        Go Home
      </Button>
    </Box>
  );
};

export default NotFoundPage;
