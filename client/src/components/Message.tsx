import {
  Flex,
  Card,
  Box,
  CardBody,
  Text,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  FormControl,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  Button,
  PopoverCloseButton,
  PopoverAnchor,
  HStack,
  Input,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

interface Props {
  justifyContent: string;
  backGround: string;
  color: string;
  content: string;
  popOverPlacement: any;
  isSender: boolean;
}

const Message = ({
  justifyContent,
  backGround,
  color,
  content,
  popOverPlacement,
  isSender,
  messages,
  setMessages,
  messageId,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState("");
  const [searchParams] = useSearchParams();
  const [newMessage, setNewMessage] = useState("");
  const token = localStorage.getItem("jwt");

  const handleClick = () => setIsOpen(prevIsOpen => !prevIsOpen);
  const handleInputOnChange = e => setInputText(e.target.value);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const message = formData.get("message");
      const messageData = {
        message,
        messageId,
      };
      const yourConfig = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      const response = await axios.put(
        `${import.meta.env.VITE_ENDPOINT}/chat/user?userid=${searchParams.get(
          "userid"
        )}`,
        messageData,
        yourConfig
      );
      if (response.status !== 200) {
        throw new Error("Error logging in");
      } else {
        console.log(response);

        const updatedMessages = messages;
        const oldMessage = updatedMessages.find(
          message => message._id === response.data.Message._id
        );
        oldMessage.content = message;
        setMessages(updatedMessages);
        handleClick();
        setNewMessage(message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Popover placement={popOverPlacement}>
      {/* <Box> */}
      <Flex justifyContent={justifyContent} w={"100%"}>
        <PopoverTrigger>
          <Card maxW={"75%"} bg={backGround}>
            <CardBody>
              {!isOpen ? (
                <Text fontSize={"16px"} color={color}>
                  {inputText === "" ? content : inputText}{" "}
                </Text>
              ) : (
                <form onSubmit={handleSubmit}>
                  <FormControl>
                    <Input
                      type="text"
                      size="lg"
                      // variant="flushed"
                      name="message"
                      placeholder="Message User"
                      onChange={handleInputOnChange}
                      defaultValue={content}
                      maxLength={200}
                      required
                    />
                    <button>Save</button>
                  </FormControl>
                </form>
              )}
            </CardBody>
          </Card>
        </PopoverTrigger>
      </Flex>
      {/* </Box> */}
      {!isSender && (
        <PopoverContent w={"fit-content"}>
          {/* <PopoverHeader fontWeight="semibold">Popover placement</PopoverHeader>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore.
        </PopoverBody> */}
          <Flex
            justifyContent={
              popOverPlacement === "left" ? "flex-end" : "flex-start"
            }
          >
            <HStack spacing={5}>
              <EditIcon onClick={handleClick} />
              <DeleteIcon />
            </HStack>
          </Flex>
        </PopoverContent>
      )}
    </Popover>
  );
};

export default Message;
