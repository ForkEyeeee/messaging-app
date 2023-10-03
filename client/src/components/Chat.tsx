import { Box, Input, VStack, Text, Flex } from "@chakra-ui/react";
import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";

const Chat = () => {
  return (
    <Box h="427px">
      <VStack justifyContent="flex-end" h={"100%"}>
        <Flex justifyContent={"flex-start"}>
          <Card maxW={"75%"} bg={"white"}>
            <CardBody>
              <Text fontSize={"14px"} color={"black"}>
                View a summary of all your customers over the last month.
              </Text>
            </CardBody>
          </Card>
        </Flex>
        <Flex justifyContent={"flex-end"}>
          <Card maxW={"75%"} bg={"blue.400"}>
            <CardBody>
              <Text fontSize={"14px"} color={"white"}>
                View a summary of all your customers over the last month.
              </Text>
            </CardBody>
          </Card>
        </Flex>
        <Input width="100%" />
      </VStack>
    </Box>
  );
};

export default Chat;
