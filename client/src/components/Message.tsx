import {
  Box,
  HStack,
  Heading,
  Flex,
  Card,
  CardBody,
  Text,
} from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { Link as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import SideBar from "./SideBar";

const Message = ({ justifyContent, backGround, color, content }) => {
  return (
    <Flex justifyContent={justifyContent} w={"100%"}>
      <Card minW={"75%"} bg={backGround}>
        <CardBody>
          <Text fontSize={"16px"} color={color}>
            {content}
          </Text>
        </CardBody>
      </Card>
    </Flex>
  );
};

export default Message;
