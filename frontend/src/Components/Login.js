import React from "react";
import axios from "axios";
import {
  Button,
  FormControl,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useToast } from "@chakra-ui/react";

function Login(props) {
  const toast = useToast();
  const [show, setShow] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleShow = () => {
    setShow(!show);
  };

  const submitHandler = async() => {
    try{
      // Set up request headers
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      if (!email || !password) {
        toast({
          title: "Fill all fields",
          description: "You missed out something, check again",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }

      // Make POST request to login
      const { data } = await axios.post("http://localhost:2000/api/user/login", { email, password }, config);
      console.log(data);
      // Display success message if login is successful
      toast({
        title: "Login Successful",
        description: "You are now logged in",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
  }
  catch (error) {
    console.log(error);
    toast({
      title: "Login Failed",
      description: "Check your credentials and try again",
      status: "error",
      duration: 5000,
      isClosable: true,
    });
  }
}

  return (
    <VStack spacing="5px">
      <FormControl id="email" isRequired marginTop="50px" width="80%">
        <Input
          placeholder="Email"
          border="1px"
          borderColor="#bee3f8"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </FormControl>

      <FormControl id="password" isRequired marginTop="10px" width="80%">
        <InputGroup>
          <Input
            placeholder="Password"
            type={show ? "text" : "password"}
            border="1px"
            borderColor="#bee3f8"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
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
