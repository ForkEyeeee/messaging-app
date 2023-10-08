import { Box, HStack, Link as ChakraLink } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import parseJwt from "./utils/parseJWT";
import validateToken from "./utils/validateToken";
import { useEffect } from "react";
import SideBar from "./SideBar";

const NavBar = () => {
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
    <Box data-testid="navbar-container">
      <Box p={5} fontFamily={"inter"} fontSize={{ base: 16, sm: 24 }}>
        <HStack justifyContent="space-between">
          <ChakraLink as={ReactRouterLink} to={`/home`}>
            <AiFillHome />
          </ChakraLink>
          {parsedToken === undefined &&
          !isExpiredUser &&
          isExpiredUser === undefined
            ? null
            : parsedToken && (
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
    </Box>
  );
};

export default NavBar;
