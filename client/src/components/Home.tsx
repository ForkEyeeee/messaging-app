import { Box } from "@chakra-ui/react";
import { useEffect } from "react";
import axios from "axios";

const Home = () => {
  // useEffect(() => {
  //   try {
  //     const getHome = async () => {
  //       const token = localStorage.getItem("jwt");
  //       const yourConfig = {
  //         headers: {
  //           Authorization: "Bearer " + token,
  //         },
  //       };

  //       const response = await axios.post(
  //         `${import.meta.env.VITE_ENDPOINT}/login`,
  //         yourConfig
  //       );
  //       console.log(response);
  //     };
  //     getHome();
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }, []);

  return <Box>TEST</Box>;
};

export default Home;
