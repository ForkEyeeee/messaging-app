import { Box, Input, VStack, Text, Flex } from "@chakra-ui/react";
import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

interface User {
  messages: [];
  _id: string;
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  about: string;
  phone: string;
  __v: number;
}

const Chat = () => {
  const [searchParams] = useSearchParams();
  const [currentUserMessages, setCurrentUserMessages] = useState([]);
  const [clickedUserMessages, setClickedUserMessages] = useState([]);

  useEffect(() => {
    const getChatMessages = async () => {
      try {
        const token = localStorage.getItem("jwt");
        const response = await axios.get(
          `${import.meta.env.VITE_ENDPOINT}/chat/user?userid=${searchParams.get(
            "userid"
          )}`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        if (response.status !== 200) {
          throw new Error("Error getting users");
        } else {
          setClickedUserMessages(response.data.clickedUser.messages);
          setCurrentUserMessages(response.data.currentUser.messages);
          console.log(response);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getChatMessages();
  }, [searchParams]);

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
