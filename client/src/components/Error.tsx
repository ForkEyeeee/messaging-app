import React from "react";
import { Box, Heading, Text, Button } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";

const Error = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      bg="gray.200"
      p={4}
    >
      <Heading as="h1" size="2xl" mb={4}>
        404
      </Heading>
      <Text fontSize="xl" mb={4}>
        Oops! Page not found.
      </Text>
      <Button colorScheme="blue" as={ReactRouterLink} to="/">
        Go Home
      </Button>
    </Box>
  );
};

export default Error;
