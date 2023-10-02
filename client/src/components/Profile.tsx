import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/fontawesome-free-solid";
import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Text, VStack } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";

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

  const location = useLocation().pathname;

  useEffect(() => {
    const getUsers = async () => {
      try {
        const token = localStorage.getItem("jwt");
        const yourConfig = {
          headers: {
            Authorization: "Bearer " + token,
          },
        };
        const response = await axios.get(
          `${import.meta.env.VITE_ENDPOINT}${location}`,
          yourConfig
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
  }, [location]);

  return (
    <Box>
      {profile && (
        <VStack color={"white"}>
          <FontAwesomeIcon
            icon={faUserCircle}
            style={{ color: "#808080" }}
            size="3x"
          />
          <Text>{profile.username}</Text>
          <Text>{profile.firstname}</Text>
          <Text>{profile.lastname}</Text>
          <Text>{profile.about}</Text>
          <Text>{profile.phone}</Text>
        </VStack>
      )}
    </Box>
  );
};

export default Profile;
