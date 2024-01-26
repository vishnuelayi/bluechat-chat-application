import React from "react";
import {
  Button,
  FormControl,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";

function Login(props) {
  const [show, setShow] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleShow = () => {
    setShow(!show);
  };

  const submitHandler = () => {};
  return (
    <VStack spacing="5px">
      <FormControl id="email" isRequired marginTop="50px" width="80%">
        <Input placeholder="Email" border="1px" borderColor="#bee3f8" />
      </FormControl>

      <FormControl id="password" isRequired marginTop="10px" width="80%">
        <InputGroup>
          <Input
            placeholder="Password"
            type={show ? "text" : "password"}
            border="1px"
            borderColor="#bee3f8"
          />

          <InputRightElement width="4.5rem">
            <Button height="1.75rem" size="sm" onClick={handleShow}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button
        marginTop="15px"
        width="80%"
        background="#bee3f8"
        onClick={submitHandler}
      >
        Login
      </Button>

      <Button
        marginTop="10px"
        width="80%"
        background="#427D9D"
        onClick={submitHandler}
        color="white"
        _hover="none"
      >
        Continue as Guest
      </Button>
    </VStack>
  );
}

export default Login;
