import { Box, HStack, Heading } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { Link as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import SideBar from "./SideBar";
const NavBar = ({}) => {
  const location = useLocation();
  return (
    <Box>
      <Box p={5} fontFamily={"inter"} fontSize={16}>
        <HStack justifyContent="space-between">
          <SideBar />
          <Heading fontSize={{ base: 20 }}>Messaging App</Heading>
          {/* <ChakraLink as={ReactRouterLink} to={`/`}></ChakraLink> */}
        </HStack>
      </Box>
    </Box>
  );
};

export default NavBar;
