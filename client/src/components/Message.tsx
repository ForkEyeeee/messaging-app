import {
  Flex,
  Card,
  CardBody,
  Text,
  Popover,
  PopoverTrigger,
  PopoverContent,
  FormControl,
  HStack,
  Input,
  Button,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { FormEvent } from "react";

interface Message {
  _id: string;
  sender: string;
  recipient: string;
  content: string;
  time: Date;
}

interface Props {
  justifyContent: string;
  backGround: string;
  color: string;
  content: string;
  popOverPlacement: any;
  isSender: boolean;
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  messageId: string;
  isOpen: boolean;
  setOpenMessageId: React.Dispatch<React.SetStateAction<string | null>>;
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
  isOpen,
  setOpenMessageId,
}: Props) => {
  const [inputText, setInputText] = useState("");

  const token = localStorage.getItem("jwt");
  const location = useLocation().pathname;

  const handleEdit = () => {
    if (isOpen) {
      setOpenMessageId(null);
    } else {
      setOpenMessageId(messageId);
    }
  };

  const handleInputOnChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setInputText(e.target.value);

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
        `${import.meta.env.VITE_ENDPOINT}${location}`,
        messageData,
        yourConfig
      );
      if (response.status !== 200) {
        throw new Error("Error logging in");
      } else {
        const updatedMessages = messages;
        const oldMessage = updatedMessages.find(
          (message: Message) => message._id === response.data.Message._id
        );
        if (!oldMessage) {
          console.error("Could not find message");
        } else if (typeof oldMessage.content === "undefined") {
          console.error("Content of the found message is undefined");
        } else {
          oldMessage.content = message as string;
          setMessages([...updatedMessages]);
          handleEdit();
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      const yourConfig = {
        headers: {
          Authorization: "Bearer " + token,
        },
        data: {
          messageId: messageId,
        },
      };
      const response = await axios.delete(
        `${import.meta.env.VITE_ENDPOINT}${location}`,
        yourConfig
      );

      if (response.status !== 200) {
        throw new Error("Error logging in");
      } else {
        const updatedMessages = messages.filter(
          message => message._id !== messageId
        );
        setMessages(updatedMessages);
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
          <Card maxW={"75%"} bg={backGround} role="message-card">
            <CardBody pb={isOpen ? 0 : undefined}>
              {!isOpen ? (
                <Text fontSize={{ base: "16px", sm: "20px" }} color={color}>
                  {inputText === "" ? content : inputText}
                </Text>
              ) : (
                <form onSubmit={handleSubmit}>
                  <FormControl>
                    <Input
                      type="text"
                      size="lg"
                      name="message"
                      placeholder="Message User"
                      onChange={handleInputOnChange}
                      defaultValue={content}
                      maxLength={200}
                      required
                    />
                    <HStack justifyContent={"flex-end"}>
                      <Button variant={"ghost"} type="submit" p={0}>
                        Save
                      </Button>
                      <Button variant={"ghost"} onClick={handleEdit} p={0}>
                        Cancel
                      </Button>
                    </HStack>
                  </FormControl>
                </form>
              )}
            </CardBody>
          </Card>
        </PopoverTrigger>
      </Flex>
      {/* </Box> */}
      {!isSender && !isOpen && (
        <PopoverContent w={"fit-content"}>
          <Flex
            justifyContent={
              popOverPlacement === "left" ? "flex-end" : "flex-start"
            }
          >
            <HStack spacing={5} p={1}>
              <EditIcon onClick={handleEdit} />
              <DeleteIcon onClick={handleDelete} color={"red"} />
            </HStack>
          </Flex>
        </PopoverContent>
      )}
    </Popover>
  );
};

export default Message;
