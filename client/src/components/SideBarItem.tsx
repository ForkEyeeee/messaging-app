import { Box, HStack, Text, VStack, Flex } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/fontawesome-free-solid";
const SideBarItem = ({
  children,
  url,
  onClose,
}: {
  children: string[];
  url: string;
  onClose: () => void;
}) => {
  return (
    <HStack justifyContent={"space-between"} w={"100%"}>
      <ChakraLink
        as={ReactRouterLink}
        to={`/user/${url}/chat`}
        onClick={onClose}
      >
        <Flex flexDir={"column"}>
          <Text fontWeight={"bold"} fontSize={{ sm: 18 }}>
            {children[0]}
          </Text>
          <Text fontSize={{ base: 14, sm: 18 }} noOfLines={1}>
            {children[1]} {children[2]}
          </Text>
          <Text
            fontStyle={"italic"}
            fontSize={{ sm: 20 }}
            textDecor={"underline"}
          >
            Click to Chat
          </Text>
        </Flex>
      </ChakraLink>
      <ChakraLink
        as={ReactRouterLink}
        to={`/user/${url}/profile`}
        onClick={onClose}
      >
        <VStack justifyContent={"flex-end"}>
          <FontAwesomeIcon
            icon={faUserCircle as any}
            style={{ color: "#808080" }}
            size="3x"
          />
          <Text fontSize={{ base: 10, sm: 14 }}>View Profile</Text>
        </VStack>
      </ChakraLink>
    </HStack>
  );
};

export default SideBarItem;
