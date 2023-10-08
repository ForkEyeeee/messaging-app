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
import { useNavigate, useLocation } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { FormEvent } from "react";
import { Link as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import { useState } from "react";

const SignUp = () => {
  const { onClose } = useDisclosure();
  const [formError, setFormError] = useState("");

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
    } catch (error: unknown) {
      if (typeof error === "object" && error !== null && "response" in error) {
        const axiosError = error as AxiosError;
        if (axiosError.response && axiosError.response.status === 400) {
          const errorMessage = (axiosError.response.data as { message: string })
            .message;
          setFormError(errorMessage);
        } else {
          setFormError("Error Signing Up");
        }
      } else {
        setFormError("Unexpected error occurred");
      }
    }
  };

  return (
    <Box bg={"gray"}>
      <Modal onClose={onClose} isOpen={true} isCentered>
        <ModalOverlay bg="blackAlpha.800" />
        <ModalContent>
          <ModalHeader textAlign={"center"} pb={1}>
            Sign Up
          </ModalHeader>
          <Text textAlign={"center"} fontSize={"16px"} mb={3}>
            to continue to login
          </Text>
          <ModalBody>
            <form onSubmit={handleSubmit}>
              <FormControl
                isRequired={true}
                mb={3}
                isInvalid={formError !== ""}
              >
                <FormLabel>Name</FormLabel>
                <Input
                  type="text"
                  name="username"
                  placeholder="Enter your name"
                  maxLength={20}
                  required
                />
              </FormControl>
              <FormControl
                isRequired={true}
                mb={3}
                isInvalid={formError !== ""}
              >
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  maxLength={20}
                  required
                />
              </FormControl>
              <FormControl
                isRequired={true}
                mb={3}
                isInvalid={formError !== ""}
              >
                <FormLabel>Confirm password</FormLabel>
                <Input
                  type="password"
                  name="confirmpassword"
                  placeholder="Confirm your password"
                  maxLength={20}
                  required
                />
                <FormHelperText mt={2}>
                  Already have an account?
                  <ChakraLink
                    color={"#0000FF"}
                    as={ReactRouterLink}
                    to={`/login`}
                    ml={1}
                  >
                    Login here.
                  </ChakraLink>
                </FormHelperText>
                <FormErrorMessage>
                  {formError !== "" && formError}
                </FormErrorMessage>
              </FormControl>
              <ModalFooter pt={0}>
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
