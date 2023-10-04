import { Flex, Card, CardBody, Text } from "@chakra-ui/react";

interface Props {
  justifyContent: string;
  backGround: string;
  color: string;
  content: string;
}

const Message = ({ justifyContent, backGround, color, content }: Props) => {
  return (
    <Flex justifyContent={justifyContent} w={"100%"}>
      <Card minW={"75%"} maxW={"75%"} bg={backGround}>
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
