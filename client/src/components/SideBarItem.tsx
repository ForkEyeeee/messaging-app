import { Box, HStack, Text } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/fontawesome-free-solid";
const SideBarItem = ({ children, url }: { children: string; url: string }) => {
  return (
    <HStack>
      <ChakraLink as={ReactRouterLink} to={`/user/${url}/profile`}>
        <FontAwesomeIcon
          icon={faUserCircle as any}
          style={{ color: "#808080" }}
          size="3x"
        />
      </ChakraLink>
      <ChakraLink as={ReactRouterLink} to={`/user/${url}/chat`}>
        {children}
      </ChakraLink>
    </HStack>
  );
};

export default SideBarItem;
