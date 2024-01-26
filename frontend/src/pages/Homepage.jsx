import React from "react";
import {
  Input,
  Container,
  Box,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  TabPanels,
} from "@chakra-ui/react";
import Login from "../Components/Login";
import Signup from "../Components/Signup";

function Homepage(props) {
  return (
    <Container maxW="xl" centerContent>
      <Box
        bg="floralwhite"
        width="100%"
        height="70%"
        marginTop="70px"
        borderRadius="7%"
        borderWidth="1px"
      >
        <Tabs variant="soft-rounded">
          <TabList marginTop="40px" marginLeft="75px">
            <Tab width="40%">Login</Tab>
            <Tab width="40%">Signup</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
}

export default Homepage;
