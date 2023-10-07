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
} from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import parseJwt from "./utils/parseJWT";
import validateToken from "./utils/validateToken";
import { parse } from "path";
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

  const location = useLocation().pathname;
  const token = localStorage.getItem("jwt");
  const parsedToken = parseJwt(token);
  const isExpiredUser = validateToken(parsedToken);

  useEffect(() => {
    const getUsers = async () => {
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
          setProfile(response.data.user);
          console.log(response);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getUsers();
  }, [location, setProfile]);

  const handleEdit = () => {
    setIsEdit(prevState => !prevState);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const firstName = formData.get("firstname");
      const lastName = formData.get("lastname");
      const about = formData.get("about");
      const phone = formData.get("phone");
      const token = localStorage.getItem("jwt");

      const profileData = {
        firstName,
        lastName,
        about,
        phone,
      };
      const yourConfig = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      const response = await axios.put(
        `${import.meta.env.VITE_ENDPOINT}${location}`,
        profileData,
        yourConfig
      );
      if (response.status !== 200) {
        throw new Error("Error updating profile");
      } else {
        console.log(response);
        handleEdit();
        setProfile(response.data.user);
      }
    } catch (error) {
      console.error(error);
    }
  };
  console.log(parsedToken);
  return (
    <Box>
      <HStack justifyContent={"center"} p={5}>
        <Heading>Customize Profile</Heading>
      </HStack>
      {profile && (
        <VStack color={"white"}>
          <FontAwesomeIcon
            icon={faUserCircle as any}
            style={{ color: "#808080" }}
            size="3x"
          />
          {isEdit ? (
            <form onSubmit={handleSubmit}>
              <FormControl>
                <FormLabel>First Name</FormLabel>
                <Input
                  type="text"
                  name="firstname"
                  defaultValue={profile.firstname}
                  required
                />
              </FormControl>
              <FormControl>
                <FormLabel>Last Name</FormLabel>
                <Input
                  type="text"
                  name="lastname"
                  defaultValue={profile.lastname}
                  required
                />
              </FormControl>
              <FormControl>
                <FormLabel>About</FormLabel>
                <Textarea name="about" defaultValue={profile.about} required />
              </FormControl>
              <FormControl>
                <FormLabel>Phone</FormLabel>
                <Input
                  type="tel"
                  name="phone"
                  defaultValue={profile.phone}
                  required
                />
              </FormControl>
              <Button type="submit">Save</Button>
            </form>
          ) : (
            <>
              <Text>{profile.username}</Text>
              <Text>{profile.firstname}</Text>
              <Text>{profile.lastname}</Text>
              <Text>{profile.about}</Text>
              <Text>{profile.phone}</Text>
              {parsedToken.user._id === profile._id && (
                <Button onClick={handleEdit}>Edit</Button>
              )}
            </>
          )}
        </VStack>
      )}
    </Box>
  );
};

export default Profile;
