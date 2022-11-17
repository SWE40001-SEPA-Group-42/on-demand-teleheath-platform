import React from 'react';
import { Box, Flex, Heading } from '@chakra-ui/react';

const LandingPage = () => {
  return (
    <Box className="landing-page-container">
      <Heading as="h1" size="xl" className="text-gray-600">
        On-demand telehealth platform
      </Heading>
    </Box>
  );
};

export default LandingPage;