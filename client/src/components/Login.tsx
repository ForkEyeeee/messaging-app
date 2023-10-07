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
  FormErrorMessage,
} from "@chakra-ui/react";
import React, { FormEventHandler } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { FormEvent } from "react";
import { Link as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import { useState } from "react";

const Login = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formError, setFormError] = useState("");
  const navigate = useNavigate();
  const location = useLocation().pathname;
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
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
        `${import.meta.env.VITE_ENDPOINT}${location}`,
        userCredentials
      );
      localStorage.setItem("jwt", response.data.token);
      navigate("/home");
    } catch (error: any) {
      if (error.response.status === 400) {
        setFormError(error.response.data.message);
      } else {
        setFormError("Error Logging In");
      }
    }
  };

  return (
    <Box bg={"gray"}>
      <Modal onClose={onClose} isOpen={true} isCentered>
        <ModalOverlay bg="blackAlpha.800" />
        <ModalContent>
          <ModalHeader textAlign={"center"} pb={1}>
            Login
          </ModalHeader>
          <Text textAlign={"center"} fontSize={"16px"}>
            to continue to messaging app
          </Text>
          <ModalBody>
            <form onSubmit={handleSubmit}>
              <FormControl isRequired={true} isInvalid={formError !== ""}>
                <FormLabel>Name</FormLabel>
                <Input
                  type="text"
                  name="username"
                  placeholder="Enter your name"
                  maxLength={50}
                  required
                />
              </FormControl>
              <FormControl isRequired={true} isInvalid={formError !== ""}>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  maxLength={20}
                  required
                />
                <FormHelperText>
                  Don't have an account? {""}
                  <ChakraLink
                    color={"#0000FF"}
                    as={ReactRouterLink}
                    to={`/signup`}
                  >
                    Sign Up here.
                  </ChakraLink>
                </FormHelperText>
                <FormErrorMessage>
                  {formError !== "" && formError}
                </FormErrorMessage>
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
