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

function Signup(props) {
  const [show, setShow] = useState(false);
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setcPassword] = useState("");

  const handleShow = () => {
    setShow(!show);
  };

  const submitHandler = () => {};
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
        <Input placeholder="Last Name" border="1px" borderColor="#bee3f8" />
      </FormControl>

      <FormControl id="email" isRequired marginTop="10px" width="80%">
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

      <FormControl id="c-password" isRequired marginTop="10px" width="80%">
        <Input
          placeholder="Confirm Password"
          type="password"
          border="1px"
          borderColor="#bee3f8"
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
