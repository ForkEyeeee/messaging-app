import {
  Box,
  Input,
  VStack,
  Text,
  Flex,
  FormControl,
  FormLabel,
  FormHelperText,
} from "@chakra-ui/react";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import parseJwt from "./utils/parseJWT";
import Message from "./Message";
import { FormEvent } from "react";

const Chat = () => {
  const [searchParams] = useSearchParams();
  const [messages, setMessages] = useState<string[]>([]);
  const token = localStorage.getItem("jwt");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const message = formData.get("message");
      const messageData = {
        message,
        recipient: searchParams.get("userid"),
      };
      const yourConfig = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      const response = await axios.post(
        `${import.meta.env.VITE_ENDPOINT}/chat/user?userid=${searchParams.get(
          "userid"
        )}`,
        messageData,
        yourConfig
      );
      if (response.status !== 200) {
        throw new Error("Error logging in");
      } else {
        setMessages(prevItems => [...prevItems, response.data.Message]);
      }
    } catch (error) {
      console.error(error);
    }
  };
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
        }
      } catch (error) {
        console.error(error);
      }
    };
    getChatMessages();
  }, [token, searchParams]);

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
              popOverPlacement={
                message.sender !== parseJwt(token).user._id ? "right" : "left"
              }
              key={message._id}
              content={message.content}
              isSender={message.sender !== parseJwt(token).user._id}
              setMessages={setMessages}
              messages={messages}
              messageId={message._id}
            />
          ))}
      </VStack>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <Input
            type="text"
            name="message"
            placeholder="Message User"
            maxLength={200}
          />
        </FormControl>
      </form>
    </Box>
  );
};

export default Chat;
