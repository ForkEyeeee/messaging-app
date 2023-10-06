import { Routes, Route, Navigate } from "react-router-dom";
import { Flex, Box } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Chat from "./components/Chat";
import "./styles.css";

const App = () => {
  return (
    <Flex direction="column" minH="100vh">
      <NavBar />
      <Box flex="1" bg="blackAlpha.800">
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          <Route path="/home" element={<Home />} />
          <Route path="/user/:userid/profile" element={<Profile />} />
          <Route path="/user/:userid/chat" element={<Chat />} />

          {/* <Route path="*" element={<Navigate to="/" />} /> */}
        </Routes>
      </Box>
      <Footer />
    </Flex>
  );
};

export default App;
