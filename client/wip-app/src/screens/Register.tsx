import {
  FormControl,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
  Button,
  Image,
  Flex,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { EmailIcon, InfoIcon, LockIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { UserContext } from "../userContext";
import methods from "../services";
import { useNavigate } from "react-router-dom";

const logo = require("../assets/wipit-logo-2.png");

interface User {
  name: string;
  email: string;
  password: string;
  type: string;
}
interface registerProps {
  userType: string;
}

export function Register({ userType }: registerProps): JSX.Element {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(undefined);

  async function getCachedData(): Promise<void> {
    setName("Dickie");
    setEmail("dgreenleaf@greenleaf.org");
    setPassword("password");
    const userInfo = { profileId: '92f5aaa1-254e-4688-84b0-049424718b4e', name: "Dickie", email: "dgreenleaf@greenleaf.org", type: "artist" };
    setUser(userInfo);
    let path = "";
    console.log("user created: ", userInfo);
    if (userInfo) {
      path = path.concat(
        userInfo.type == "artist"
          ? `/a/${userInfo.profileId}`
          : `/g/${userInfo.profileId}`
      );
      navigate(path);
    } else {
      alert("Try again...")
    }
  }

  async function handleSubmit(e: any): Promise<void> {
    e.preventDefault();
    const newUser = { name, email, password, type: userType };
    setName("");
    setEmail("");
    setPassword("");
    console.log("user: ", newUser);

    const userInfo = await methods.createUser(newUser);
    setUser(userInfo);
    let path = "";
    console.log("user created: ", userInfo);
    if (userInfo) {
      path = path.concat(
        userInfo.type == "artist"
          ? `/a/${userInfo.profileId}`
          : `/g/${userInfo.profileId}`
      );
      console.log(path);
      navigate(path);
    } else {
      alert("Try again with a different email!");
    }
  }

  return (
    <>
      {token === undefined ?
        getCachedData() :
        <>
        <Flex
          boxShadow={"md"}
          w="100%"
          p={4}
          color="white"
          flexDirection={"row"}
          justifyContent="space-between"
        >
          <Image src={logo} width="100px" />
          <Link to="/login">
            <Button marginTop="2" colorScheme="teal" size="sm">
              Login
            </Button>
          </Link>
        </Flex>
        <Flex
          direction="column"
          align="center"
          maxW={{ xl: "1200px" }}
          m="0 auto"
        >
          <form action="submit">
            <Stack spacing={3} marginTop="50%">
              <Text fontSize={"34"} align="center">
                Register
              </Text>
              <FormControl isRequired>
                <InputGroup>
                  <InputLeftElement children={<InfoIcon />} />
                  <Input
                    type="name"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </InputGroup>
              </FormControl>
              <FormControl isRequired>
                <InputGroup>
                  <InputLeftElement children={<EmailIcon />} />
                  <Input
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </InputGroup>
              </FormControl>
              <FormControl isRequired>
                <InputGroup>
                  <InputLeftElement children={<LockIcon />} />
                  <Input
                    type="password"
                    placeholder="Enter New Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </InputGroup>
              </FormControl>
              <Button
                colorScheme="teal"
                size="md"
                type="submit"
                onClick={handleSubmit}
              >
                Create User
              </Button>
            </Stack>
          </form>
        </Flex></>}
  </>
  );
}

export default Register;
