import React from "react";
import {
  Button,
  FormControl,
  Input,
  InputGroup,
  InputRightAddon,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { useHistory } from "react-router-dom";

function Signup(props) {
  const toast = useToast();

  const [show, setShow] = useState(false);
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setcPassword] = useState("");

  const handleShow = () => {
    setShow(!show);
  };

  const submitHandler = async () => {
    try {
      // Check if required fields are filled
      if (!email || !fname || !lname || !password || !cpassword) {
        toast({
          title: "Fill all fields",
          description: "You missed out something, check again",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        return; // Stop execution if required fields are missing
      }
  
      // Check if passwords match
      if (password !== cpassword) {
        toast({
          title: "Password doesn't match",
          description: "There is a password mismatch, check again",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        return; // Stop execution if passwords don't match
      }
  
      // Set up request headers
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
  
      // Make POST request to register user
      const { data } = await axios.post(
        "http://localhost:2000/api/user/register",
        { fname, lname, email, password },
        config
      );
  
      // Display success message if registration is successful
      toast({
        title: "Signup Successful",
        description: "Your Profile has been successfully created",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
  
      // Save user info in localStorage
      localStorage.setItem("userInfo", JSON.stringify(data));
  
      // Redirect to the chat page
      props.history.push("/chat");
    }  catch (error) {
      // Handle registration errors
      if (error.response.status === 400) {
        // If the status is 400, it means the user already exists
        toast({
          title: "Signup Unsuccessful",
          description: "User with this email already exists",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } else {
        // Handle other errors
        toast({
          title: "Signup Unsuccessful",
          description: "An error occurred during registration",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        console.error(error);
      }
    }
  };
  
  return (
    <VStack spacing="5px">
      <FormControl id="first-name" isRequired marginTop="10px" width="80%">
        <Input
          placeholder="First Name"
          onChange={(e) => setFname(e.target.value)}
          border="1px"
          borderColor="#bee3f8"
        />
      </FormControl>

      <FormControl id="last-name" isRequired marginTop="10px" width="80%">
        <Input
          placeholder="Last Name"
          border="1px"
          borderColor="#bee3f8"
          onChange={(e) => setLname(e.target.value)}
        />
      </FormControl>

      <FormControl id="email" isRequired marginTop="10px" width="80%">
        <Input
          placeholder="Email"
          border="1px"
          borderColor="#bee3f8"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>

      <FormControl id="password" isRequired marginTop="10px" width="80%">
        <InputGroup>
          <Input
            placeholder="Password"
            type={show ? "text" : "password"}
            border="1px"
            borderColor="#bee3f8"
            onChange={(e) => setPassword(e.target.value)}
          />

          <InputRightElement width="4.5rem">
            <Button height="1.75rem" size="sm" onClick={handleShow}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id="c-password" isRequired marginTop="10px" width="80%">
        <Input
          placeholder="Confirm Password"
          type="password"
          border="1px"
          borderColor="#bee3f8"
          onChange={(e) => setcPassword(e.target.value)}
        />
      </FormControl>

      <Button
        marginTop="15px"
        width="80%"
        background="#bee3f8"
        onClick={submitHandler}
      >
        Submit
      </Button>
    </VStack>
  );
}

export default Signup;
