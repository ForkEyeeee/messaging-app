import { Box, Input, VStack, Text, Flex } from "@chakra-ui/react";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import parseJwt from "./utils/parseJWT";
import Message from "./Message";

const Chat = () => {
  const [searchParams] = useSearchParams();
  const [messages, setMessages] = useState<string[]>([]);
  const token = localStorage.getItem("jwt");

  useEffect(() => {
    const getChatMessages = async () => {
      try {
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
          setMessages(response.data.messages);
          console.log(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getChatMessages();
  }, [searchParams]);

  return (
    //sort and render msgs by time
    <Box flex="1" display="flex" flexDirection="column" h="100vh">
      <VStack flex="1" overflowY="scroll">
        {messages &&
          messages.map((message: any) => (
            <Message
              justifyContent={
                message.sender !== parseJwt(token).user._id
                  ? "flex-start"
                  : "flex-end"
              }
              backGround={
                message.sender !== parseJwt(token).user._id
                  ? "white"
                  : "blue.400"
              }
              color={
                message.sender !== parseJwt(token).user._id ? "black" : "white"
              }
              key={message._id}
              content={message.content}
            />
          ))}
      </VStack>
      <Input width="100%" />
    </Box>
  );
};

export default Chat;
