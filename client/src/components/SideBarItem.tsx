import { Box, Text } from "@chakra-ui/react";

const SideBarItem = ({ children }: { children: string }) => {
  return (
    <Box>
      <Text>{children}</Text>
    </Box>
  );
};

export default SideBarItem;
