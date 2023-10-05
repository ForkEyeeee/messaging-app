import {
  Flex,
  Card,
  Box,
  CardBody,
  Text,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  Button,
  PopoverCloseButton,
  PopoverAnchor,
  HStack,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";

interface Props {
  justifyContent: string;
  backGround: string;
  color: string;
  content: string;
  popOverPlacement: any;
  isSender: boolean;
}

const Message = ({
  justifyContent,
  backGround,
  color,
  content,
  popOverPlacement,
  isSender,
}: Props) => {
  return (
    <Popover placement={popOverPlacement}>
      {/* <Box> */}
      <Flex justifyContent={justifyContent} w={"100%"}>
        <PopoverTrigger>
          <Card maxW={"75%"} bg={backGround}>
            <CardBody>
              <Text fontSize={"16px"} color={color}>
                {content}
              </Text>
            </CardBody>
          </Card>
        </PopoverTrigger>
      </Flex>
      {/* </Box> */}
      {!isSender && (
        <PopoverContent w={"fit-content"}>
          {/* <PopoverHeader fontWeight="semibold">Popover placement</PopoverHeader>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore.
        </PopoverBody> */}
          <Flex
            justifyContent={
              popOverPlacement === "left" ? "flex-end" : "flex-start"
            }
          >
            <HStack spacing={5}>
              <EditIcon />
              <DeleteIcon />
            </HStack>
          </Flex>
        </PopoverContent>
      )}
    </Popover>
  );
};

export default Message;
