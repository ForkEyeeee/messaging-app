import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/fontawesome-free-solid";
import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Text, VStack, Heading } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

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
  const [searchParams] = useSearchParams();
  console.log(searchParams.get("userid"));
  useEffect(() => {
    const getUsers = async () => {
      try {
        const token = localStorage.getItem("jwt");
        const response = await axios.get(
          `${import.meta.env.VITE_ENDPOINT}/user?userid=${searchParams.get(
            "userid"
          )}`,
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
  }, [searchParams]);

  return (
    <Box>
      <Heading>Account Details</Heading>
      {profile && (
        <VStack color={"white"}>
          <FontAwesomeIcon
            icon={faUserCircle as any}
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
