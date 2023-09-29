import { Box, HStack, Heading } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { Link as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";

const NavBar = ({}) => {
  const location = useLocation();
  return (
    <Box>
      <Box p={5} fontFamily={"inter"} fontSize={16}>
        <HStack justifyContent="space-between">
          <Heading>Messaging App</Heading>
          <ChakraLink as={ReactRouterLink} to={`/`}>
            Home
          </ChakraLink>
        </HStack>
      </Box>
    </Box>
  );
};

export default NavBar;
