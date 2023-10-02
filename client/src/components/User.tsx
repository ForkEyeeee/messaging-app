import { Box, HStack, Text } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/fontawesome-free-solid";
const User = ({ children, url }: { children: string; url: string }) => {
  return (
    <HStack>
      <ChakraLink as={ReactRouterLink} to={`/user/${url}`}>
        <FontAwesomeIcon
          icon={faUserCircle}
          style={{ color: "#808080" }}
          size="3x"
        />
      </ChakraLink>
      <Text>{children}</Text>
    </HStack>
  );
};

export default User;
