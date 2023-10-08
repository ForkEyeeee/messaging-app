import {
  Box,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
  Button,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { FormEvent } from "react";
import { Link as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import { useState } from "react";
import validateToken from "./utils/validateToken";
import parseJwt from "./utils/parseJWT";

const Login = () => {
  const { onClose } = useDisclosure();
  const [formError, setFormError] = useState("");
  const navigate = useNavigate();
  const location = useLocation().pathname;
  const token = localStorage.getItem("jwt");
  const parsedToken = parseJwt(token);
  const isExpiredUser = validateToken(parsedToken);

  useEffect(() => {
    if (isExpiredUser && parsedToken) {
      navigate("/home");
    }
  }, [isExpiredUser, parsedToken, navigate]);

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
    } catch (error) {
      const err = error as AxiosError;
      if (err.response && err.response.status === 400) {
        const message = err.response.data as { message: string };
        if (message && typeof message.message === "string") {
          setFormError(message.message);
        } else {
          setFormError("An unexpected error occurred. Please try again later.");
        }
      } else {
        setFormError("An unexpected error occurred. Please try again later.");
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
