import { v1 as uuid } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { Box, Button, IconButton } from '@chakra-ui/react';
import { BsFillTelephoneFill } from 'react-icons/bs';

const CreateRoom = () => {
  const navigate = useNavigate();
  const create = () => {
    const id = uuid();
    navigate(`/room/${id}`);
  };

  return (
    <Box className="page-container">
      <Button onClick={create} colorScheme="green" rightIcon={<BsFillTelephoneFill />}>
        Join call
      </Button>
    </Box>
  );
};

export default CreateRoom;
