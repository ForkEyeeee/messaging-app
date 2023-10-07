import { Box, HStack, Text, VStack, Flex } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/fontawesome-free-solid";
const SideBarItem = ({
  children,
  url,
}: {
  children: string[];
  url: string;
}) => {
  console.log(children);
  return (
    <HStack justifyContent={"space-between"} w={"100%"}>
      <ChakraLink as={ReactRouterLink} to={`/user/${url}/chat`}>
        <Flex flexDir={"column"}>
          <Text fontWeight={"bold"}>{children[0]}</Text>
          <Text>
            {children[1]} {children[2]}
          </Text>
          <Text fontStyle={"italic"}>Click to Chat</Text>
        </Flex>
      </ChakraLink>
      <ChakraLink as={ReactRouterLink} to={`/user/${url}/profile`}>
        <VStack justifyContent={"flex-end"}>
          <FontAwesomeIcon
            icon={faUserCircle as any}
            style={{ color: "#808080" }}
            size="3x"
          />
          <Text fontSize={13}>View Profile</Text>
        </VStack>
      </ChakraLink>
    </HStack>
  );
};

export default SideBarItem;
