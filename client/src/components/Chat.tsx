import { Box, Input, VStack, Text, Flex } from "@chakra-ui/react";
import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import parseJwt from "./utils/parseJWT";
import Message from "./Message";

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
    <Box h="427px">
      <VStack justifyContent="flex-end" h={"100%"}>
        {messages &&
          messages.map(message =>
            message.sender !== parseJwt(token).user._id ? (
              <Message
                justifyContent={"flex-start"}
                backGround={"white"}
                color={"black"}
                key={message._id}
                content={message.content}
              />
            ) : (
              <Message
                justifyContent={"flex-end"}
                backGround={"blue.400"}
                color={"white"}
                key={message._id}
                content={message.content}
              />
            )
          )}
        <Input width="100%" />
      </VStack>
    </Box>
  );
};

export default Chat;
