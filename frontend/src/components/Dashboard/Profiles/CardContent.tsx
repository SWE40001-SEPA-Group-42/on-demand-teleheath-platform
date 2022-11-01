import { Box, Text } from '@chakra-ui/react';

interface ICardContent {
  label: string;
  description: string;
}

const CardContent = ({ label, description }: ICardContent) => {
  return (
    <>
      <Box className="card-content">
        <Text className="card-label">{label}</Text>
        <Text className="card-description">{description}</Text>
      </Box>
    </>
  );
};

export default CardContent;
