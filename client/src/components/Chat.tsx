import {
  Box,
  Input,
  VStack,
  FormControl,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import parseJwt from "./utils/parseJWT";
import Message from "./Message";
import { FormEvent } from "react";
import { BsFillSendFill } from "react-icons/bs";

interface MessageState {
  _id: string;
  sender: string;
  recipient: string;
  content: string;
  time: Date;
}

const Chat = () => {
  const [messages, setMessages] = useState<MessageState[]>([]);
  const [inputText, setInputText] = useState("");
  const [openMessageId, setOpenMessageId] = useState<string | null>(null);

  const recipient = `${useLocation().pathname}`.split("/")[2];
  const location = useLocation().pathname;
  const token = localStorage.getItem("jwt");

  const handleInputOnChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setInputText(e.target.value);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const message = formData.get("message");
      const messageData = {
        message,
        recipient: recipient,
      };
      const yourConfig = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      const response = await axios.post(
        `${import.meta.env.VITE_ENDPOINT}${location}`,
        messageData,
        yourConfig
      );
      if (response.status !== 200) {
        throw new Error("Error logging in");
      } else {
        setMessages(prevItems => [...prevItems, response.data.Message]);
        setInputText("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const getChatMessages = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_ENDPOINT}${location}`,
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
  }, [token, location]);
  return (
    //sort and render msgs by time
    <Box flex="1" display="flex" flexDirection="column" h="100vh">
      <VStack flex="1" overflowY="scroll">
        {messages &&
          messages.map((message: Message) => (
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
              isOpen={message._id === openMessageId}
              setOpenMessageId={setOpenMessageId}
            />
          ))}
      </VStack>
      {!openMessageId && (
        <form onSubmit={handleSubmit}>
          <FormControl>
            <InputGroup>
              <InputRightElement>
                <button type="submit">
                  <BsFillSendFill />
                </button>
              </InputRightElement>
              <Input
                role="chat-input"
                type="text"
                name="message"
                placeholder="Message User"
                maxLength={200}
                value={inputText}
                onChange={handleInputOnChange}
              />
            </InputGroup>
          </FormControl>
        </form>
      )}
    </Box>
  );
};

export default Chat;
