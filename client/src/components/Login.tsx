import {
  Box,
  Text,
  Heading,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
} from "@chakra-ui/react";
import React from "react";
import axios from "axios";
import { MouseEvent } from "react";
const Login = () => {
  console.log("rendering login");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSubmit = async (e: HTMLFormElement) => {
    try {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const username = formData.get("username");
      const password = formData.get("password");
      const userCredentials = {
        username: username,
        password: password,
      };
      const response = await axios.post(
        `${import.meta.env.VITE_ENDPOINT}/login`,
        userCredentials
      );
      if (response.status !== 200) {
        throw new Error("Error logging in");
      } else {
        localStorage.setItem("jwt", response.data.token);
        console.log(response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box bg={"gray"} className="test">
      <Modal onClose={onClose} isOpen={true} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign={"center"} pb={1}>
            Login
          </ModalHeader>
          <Text textAlign={"center"} fontSize={"16px"}>
            to continue to messaging app
          </Text>
          <ModalBody>
            <form onSubmit={handleSubmit}>
              <FormControl isRequired={true}>
                <FormLabel>Name</FormLabel>
                <Input
                  type="text"
                  name="username"
                  placeholder="Enter your name"
                  maxLength={50}
                  required
                />
              </FormControl>
              <FormControl isRequired={true}>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  maxLength={20}
                  required
                />
                <FormHelperText>
                  Don't have an account? Sign Up here.
                </FormHelperText>
              </FormControl>
              <ModalFooter>
                <Button onClick={onClose} colorScheme={"blue"} type="submit">
                  Next
                </Button>
              </ModalFooter>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Login;
