import { AbsoluteCenter, Box, Text, VStack, Icon } from "@chakra-ui/react";
import { ChatIcon } from "@chakra-ui/icons";

const Home = () => {
  return (
    <AbsoluteCenter flexDirection="column">
      <VStack>
        <Icon as={ChatIcon} boxSize="24" color="gray.500" mb="4" />
        <Text fontSize="xl" color="gray.500">
          No User Selected
        </Text>
        <Text fontSize="md" color="gray.400" mt="2">
          Please open the sidebar to start messaging.
        </Text>
      </VStack>
    </AbsoluteCenter>
  );
};

export default Home;
