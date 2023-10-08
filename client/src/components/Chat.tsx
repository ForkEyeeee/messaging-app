import {
  Box,
  Input,
  VStack,
  FormControl,
  InputGroup,
  InputRightElement,
  Heading,
  HStack,
  Spinner,
  Center,
} from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import parseJwt from "./utils/parseJWT";
import Message from "./Message";
import { FormEvent } from "react";
import { BsSendFill } from "react-icons/bs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";

interface MessageState {
  _id: string;
  sender: string;
  recipient: string;
  content: string;
  time: Date;
}

interface Recipient {
  firstName: string;
  lastName: string;
  userName: string;
}

const Chat = () => {
  const [messages, setMessages] = useState<MessageState[]>([]);
  const [inputText, setInputText] = useState("");
  const [openMessageId, setOpenMessageId] = useState<string | null>(null);
  const [recipient, setRecipient] = useState<Recipient>();
  const [loading, setLoading] = useState(true);
  const recipientId = `${useLocation().pathname}`.split("/")[2];
  const location = useLocation().pathname;
  const token = localStorage.getItem("jwt");

  const handleInputOnChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setInputText(e.target.value);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const message = formData.get("message");
    const messageData = { message, recipient: recipientId };
    const yourConfig = { headers: { Authorization: "Bearer " + token } };
    const response = await axios.post(
      `${import.meta.env.VITE_ENDPOINT}${location}`,
      messageData,
      yourConfig
    );
    setMessages(prevItems => [...prevItems, response.data.Message]);
    setInputText("");
  };

  useEffect(() => {
    const getChatMessages = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_ENDPOINT}${location}`,
          { headers: { Authorization: "Bearer " + token } }
        );
        setMessages(response.data.messages);
        setRecipient(response.data.recipient);
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          console.error(error);
        } else {
          console.error(error);
        }
      } finally {
        setLoading(false);
      }
    };
    getChatMessages();
  }, [token, location]);

  return (
    <Box flex="1" display="flex" flexDirection="column" h="100vh" p={{ xl: 5 }}>
      {loading ? (
        <Center p={10}>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Center>
      ) : (
        <>
          <HStack justifyContent={"space-between"} p={2}>
            <FontAwesomeIcon
              icon={faUserCircle as IconDefinition}
              style={{ color: "#808080" }}
              size="2x"
            />
            <Heading color={"white"} noOfLines={1} pb={5}>
              {recipient?.firstName} {recipient?.lastName}
            </Heading>
          </HStack>
          <VStack flex="1" overflowY="scroll">
            {messages &&
              messages.map((message: MessageState) => (
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
                    message.sender !== parseJwt(token).user._id
                      ? "black"
                      : "white"
                  }
                  popOverPlacement={
                    message.sender !== parseJwt(token).user._id
                      ? "right"
                      : "left"
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
              <FormControl pt={5}>
                <InputGroup>
                  <InputRightElement>
                    <button type="submit">
                      <Box display={"flex"} alignItems={"center"}>
                        <BsSendFill color="black" />
                      </Box>
                    </button>
                  </InputRightElement>
                  <Input
                    role="chat-input"
                    type="text"
                    name="message"
                    placeholder={`Message ${recipient?.firstName} ${recipient?.lastName}`}
                    maxLength={200}
                    value={inputText}
                    onChange={handleInputOnChange}
                    backgroundColor={"white"}
                    size={{ sm: "lg" }}
                    required
                  />
                </InputGroup>
              </FormControl>
            </form>
          )}
        </>
      )}
    </Box>
  );
};

export default Chat;
