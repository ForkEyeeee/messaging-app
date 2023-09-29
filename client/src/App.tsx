import { Routes, Route } from "react-router-dom";
import { Flex, Box } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import "./styles.css";

const App = () => {
  return (
    <Flex direction="column" minH="100vh" bg="gray.100">
      <NavBar />
      <Box flex="1">
        <Routes>
          <Route path="/" element={<Box />} />
        </Routes>
      </Box>
      <Footer />
    </Flex>
  );
};

export default App;
