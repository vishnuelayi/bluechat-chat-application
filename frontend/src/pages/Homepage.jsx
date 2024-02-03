import React from "react";
import { Input, Container, Box, Text } from "@chakra-ui/react";

function Homepage(props) {
  return (
    <Container maxW="xl" centerContent>
      <Box
        bg="floralwhite"
        width="100%"
        height="70%"
        marginTop="70px"
        borderRadius="7%"
      >
        <img src="../../public/images/bluechat.jpg" alt="logo" />
      </Box>
    </Container>
  );
}

export default Homepage;
