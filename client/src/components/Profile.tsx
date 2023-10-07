import { Spinner, Center } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/fontawesome-free-solid";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Text,
  VStack,
  Heading,
  HStack,
  Button,
  Input,
  FormControl,
  FormLabel,
  Textarea,
  Card,
  CardBody,
  Flex,
} from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import parseJwt from "./utils/parseJWT";

interface User {
  messages: [];
  _id: string;
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  about: string;
  phone: string;
  __v: number;
}

const Profile = () => {
  const [profile, setProfile] = useState<User>({
    messages: [],
    _id: "",
    username: "",
    password: "",
    firstname: "",
    lastname: "",
    about: "",
    phone: "",
    __v: 0,
  });
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(true);
  const location = useLocation().pathname;
  const token = localStorage.getItem("jwt");
  const parsedToken = parseJwt(token);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_ENDPOINT}${location}`,
          { headers: { Authorization: "Bearer " + token } }
        );
        setProfile(response.data.user);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getUsers();
  }, [location, setProfile, token]);

  const handleEdit = () => {
    setIsEdit(prevState => !prevState);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const firstName = formData.get("firstname");
    const lastName = formData.get("lastname");
    const about = formData.get("about");
    const phone = formData.get("phone");
    const profileData = { firstName, lastName, about, phone };
    const yourConfig = { headers: { Authorization: "Bearer " + token } };
    const response = await axios.put(
      `${import.meta.env.VITE_ENDPOINT}${location}`,
      profileData,
      yourConfig
    );
    handleEdit();
    setProfile(response.data.user);
  };

  return (
    <Box>
      <HStack justifyContent={"center"} p={5}>
        <Heading color={"white"}>Customize Profile</Heading>
      </HStack>
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
        profile && (
          <VStack color={"white"}>
            <Box p={2}>
              <FontAwesomeIcon
                icon={faUserCircle as any}
                style={{ color: "#FFFFFF" }}
                size="3x"
              />
            </Box>
            {isEdit ? (
              <form onSubmit={handleSubmit}>
                <FormControl mb={4}>
                  <FormLabel>First Name</FormLabel>
                  <Input
                    type="text"
                    name="firstname"
                    defaultValue={profile.firstname}
                    required
                  />
                </FormControl>
                <FormControl mb={4}>
                  <FormLabel>Last Name</FormLabel>
                  <Input
                    type="text"
                    name="lastname"
                    defaultValue={profile.lastname}
                    required
                  />
                </FormControl>
                <FormControl mb={4}>
                  <FormLabel>About</FormLabel>
                  <Textarea
                    name="about"
                    defaultValue={profile.about}
                    required
                  />
                </FormControl>
                <FormControl mb={4}>
                  <FormLabel>Phone</FormLabel>
                  <Input
                    type="tel"
                    name="phone"
                    defaultValue={profile.phone}
                    required
                  />
                </FormControl>
                <Flex justifyContent="center" p={5}>
                  <Button type="submit" colorScheme="whatsapp">
                    Save
                  </Button>
                </Flex>
              </form>
            ) : (
              <>
                <Card mb="4" p="4" bg="gray.300" borderRadius="md">
                  <CardBody>
                    <Text
                      fontSize="xl"
                      fontWeight="bold"
                      color="gray.800"
                      mb="2"
                    >
                      {profile.username}
                    </Text>
                    <Text fontSize="lg" color="gray.700" mb="2">
                      {profile.firstname} {profile.lastname}
                    </Text>
                    <Text my="2" fontSize="md" color="gray.700" mb="2">
                      {profile.about}
                    </Text>
                    <Text fontSize="md" color="gray.700" mb="2">
                      {profile.phone}
                    </Text>
                    {parsedToken.user._id === profile._id && (
                      <Button
                        mt="2"
                        colorScheme="blue"
                        variant="solid"
                        onClick={handleEdit}
                      >
                        Edit
                      </Button>
                    )}
                  </CardBody>
                </Card>
              </>
            )}
          </VStack>
        )
      )}
    </Box>
  );
};

export default Profile;
