import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link as ChakraLink,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signin = ({ onSignin }) => {
  const [isLandscape] = useMediaQuery("(orientation: landscape)");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/signin`, {email: email, password: password}).then((res) => {
            console.log(res);
            onSignin(navigate)
        }).catch((err) => {
            window.alert(err.response.data['data'])
        })
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
            Login
          </Heading>

          <FormControl id="email" marginBottom="4">
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>

          <FormControl id="password" marginBottom="6">
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>

          <Button
            colorScheme="blue"
            size="lg"
            width="full"
            onClick={handleSubmit}
          >
            Login
          </Button>

          <Text marginTop="4" textAlign="center">
            Not registered?{" "}
            <ChakraLink color="blue.500" href="/signup">
              Sign up here.
            </ChakraLink>
          </Text>
        </Box>
      </Center>
    </Flex>
  );
};

export default Signin;
