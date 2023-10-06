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
import React, { FormEventHandler } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { FormEvent } from "react";
import { Link as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";

const SignUp = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const location = useLocation().pathname;
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const username = formData.get("username");
      const password = formData.get("password");
      const confirmpassword = formData.get("confirmpassword");
      const userCredentials = {
        username: username,
        password: password,
        confirmpassword: confirmpassword,
      };
      const response = await axios.post(
        `${import.meta.env.VITE_ENDPOINT}${location}`,
        userCredentials
      );
      if (response.status !== 200) {
        throw new Error("Error logging in");
      } else {
        navigate("/login");
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
            Sign Up
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
              </FormControl>
              <FormControl isRequired={true}>
                <FormLabel>Confirm password</FormLabel>
                <Input
                  type="password"
                  name="confirmpassword"
                  placeholder="Confirm your password"
                  maxLength={20}
                  required
                />
                <FormHelperText>
                  Already have an account?
                  <ChakraLink as={ReactRouterLink} to={`/signup`}>
                    {""} Login here.
                  </ChakraLink>
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

export default SignUp;
