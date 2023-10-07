import { Box, HStack, Heading } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import { AiFillHome } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";
import parseJwt from "./utils/parseJWT";
import validateToken from "./utils/validateToken";
import { useEffect, useState } from "react";

import SideBar from "./SideBar";
const NavBar = () => {
  const location = `${import.meta.env.VITE_ENDPOINT$}${useLocation().pathname}`;
  const navigate = useNavigate();
  const token = localStorage.getItem("jwt");
  const parsedToken = parseJwt(token);
  const isExpiredUser = validateToken(parsedToken);

  useEffect(() => {
    if (!isExpiredUser && parsedToken) {
      localStorage.removeItem("jwt");
      navigate("/");
    }
  }, [isExpiredUser, navigate, parsedToken]);

  return (
    <Box p={5} fontFamily={"inter"} fontSize={16}>
      <HStack justifyContent="space-between">
        <ChakraLink as={ReactRouterLink} to={`/home`}>
          <AiFillHome />
        </ChakraLink>

        {/* <Heading fontSize={{ base: 15 }}>Messaging App</Heading> */}

        {parsedToken === undefined &&
        !isExpiredUser &&
        isExpiredUser === undefined ? (
          <>
            <ChakraLink as={ReactRouterLink} to={`/signup`}>
              Sign Up
            </ChakraLink>
            <ChakraLink as={ReactRouterLink} to={`/login`}>
              Login
            </ChakraLink>
          </>
        ) : (
          <>
            <ChakraLink
              onClick={() => {
                localStorage.removeItem("jwt");
                navigate("/login");
              }}
            >
              Logout
            </ChakraLink>
            <ChakraLink
              onClick={() => {
                navigate(`/user/${parsedToken.user._id}/profile`);
              }}
            >
              Profile
            </ChakraLink>
          </>
        )}
        <SideBar data-testid="hamburger-icon" />
      </HStack>
    </Box>
  );
};

export default NavBar;
