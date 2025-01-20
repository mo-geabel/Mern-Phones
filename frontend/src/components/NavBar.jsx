import {
  Button,
  Container,
  Flex,
  HStack,
  Text,
  useColorModeValue,
  useColorMode,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { CiSquarePlus, CiLight } from "react-icons/ci";
import { IoMoonOutline } from "react-icons/io5";

const NavBar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Container
      maxH={"1140px"}
      px={4}
      bg={useColorModeValue("white", "gray.800")}
    >
      <Flex
        h={16}
        marginX={20}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{
          base: "column",
          sm: "row",
        }}
      >
        <Link to={"/"}>
          <Text
            fontSize={{ base: "22px", sm: "28px" }}
            fontWeight="bold"
            textTransform="uppercase"
            background="linear-gradient(to left,rgb(40, 202, 40),rgb(22, 222, 69))"
            backgroundClip="text"
            color="transparent"
          >
            Mo Store
          </Text>
        </Link>
        <HStack spaceX={2} alignItems={"center"}>
          <Link to={"/create"}>
            <Button borderRadius={10} colorScheme="white" variant="outline">
              <CiSquarePlus />
            </Button>
          </Link>
          <Button
            onClick={toggleColorMode}
            borderRadius={10}
            colorScheme="white"
            variant="outline"
          >
            {colorMode === "light" ? <CiLight /> : <IoMoonOutline />}
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
};

export default NavBar;
