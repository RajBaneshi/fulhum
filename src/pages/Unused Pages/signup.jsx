import { useState } from "react";
import { Box, Button, Center, Flex, FormControl, FormLabel, Heading, Input, Link as ChakraLink, Text, useMediaQuery } from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom"
const Signup = () => {
  const [isLandscape] = useMediaQuery("(orientation: landscape)");
  axios.defaults.withCredentials = true
  const navigate = useNavigate();
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(fname, lname);
    axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/signup`, { fname: fname, lname: lname, username: username, email: email, password: password }).then((res) => {
        navigate('/signin')
    }).catch((err) => {
        if(err.response.data['data'] === 'exists'){
            window.alert('User already exists')
            navigate('/')
        }else if(err.response.data === 'missing'){
            window.alert('Missing credentials')
        }else{
            window.alert('err.response.data')
        }
    })
    console.log(username, password)
  }

  return (
    <Flex height="100vh">
      {isLandscape && (
        /* Left Half: Image (Visible only in landscape mode) */
        <Box width="50%">
          <img
            src={"/85503091_p0.png"}
            alt="Login Image"
            style={{ objectFit: "cover", width: "100%", height: "100%" }}
          />
        </Box>
      )}

      {/* Right Half: Login Card */}
      <Center flex="1">
        <Box padding="8" width="80%" maxWidth="md">
          <Heading size="lg" textAlign="center" marginBottom="6">
            Signup
          </Heading>

          <FormControl id="fname" marginBottom="4">
            <FormLabel>First Name</FormLabel>
            <Input type="text" placeholder="Enter your first name" onChange={(e) => setFname(e.target.value)} />
          </FormControl>

          <FormControl id="lname" marginBottom="4">
            <FormLabel>Last Name</FormLabel>
            <Input type="text" placeholder="Enter your last name" onChange={(e) => setLname(e.target.value)} />
          </FormControl>

          <FormControl id="username" marginBottom="4">
            <FormLabel>Username</FormLabel>
            <Input type="text" placeholder="Enter your username" onChange={(e) => setUsername(e.target.value)} />
          </FormControl>

          <FormControl id="email" marginBottom="4">
            <FormLabel>Email address</FormLabel>
            <Input type="email" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} />
          </FormControl>

          <FormControl id="password" marginBottom="6">
            <FormLabel>Password</FormLabel>
            <Input type="password" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} />
          </FormControl>

          {/* <FormControl id="phone" marginBottom="4">
            <FormLabel>Phone Number</FormLabel>
            <Input type="tel" placeholder="Enter your phone number" />
          </FormControl> */}

          <Button colorScheme="blue" size="lg" width="full" onClick={handleSubmit}>
            Signup
          </Button>
        </Box>
      </Center>
    </Flex>
  );
};

export default Signup;
