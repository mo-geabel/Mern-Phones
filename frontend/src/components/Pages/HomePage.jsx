import { UseProductStore } from "@/Hooks/Product";
import {
  Box,
  Container,
  Flex,
  Text,
  VStack,
  SimpleGrid,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Cards from "./Cards";

const HomePage = () => {
  const { GetProduct, Products } = UseProductStore();

  useEffect(() => {
    GetProduct();
  }, [GetProduct]);

  // Ensure Products is always an array to prevent errors
  const productList = Products || [];

  return (
    <Container maxW={"container.xl"} py={12} justifyContent={"center"}>
      <VStack spacing={10} alignContent={"center"}>
        <Text
          fontSize={"20px"}
          fontWeight={"bold"}
          background="linear-gradient(to left,rgb(8, 222, 8),rgb(30, 138, 55))"
          backgroundClip="text"
          color="transparent"
          textAlign={"center"}
        >
          Current Products
        </Text>

        {productList.length === 0 ? (
          <Text
            fontSize={"xl"}
            textAlign={"center"}
            fontWeight={"bold"}
            color={"gray.500"}
          >
            No products Found{" "}
            <Link to={"/create"}>
              <Text
                as={"span"}
                margin={2}
                color={"green.300"}
                _hover={{ textDecoration: "underline" }}
              >
                Create a Product
              </Text>
            </Link>
          </Text>
        ) : (
          <Flex justifyContent="space-evenly" alignItems="center" px={4}>
            <SimpleGrid
              columns={{
                base: 1, // Smallest screens
                sm: 3, // Small screens
              }}
              gap={8}
              maxWidth="1200px" // Optional: Limit the grid's width
              mx="auto" // Horizontally center the grid
              px={4} // Padding on the left and right
            >
              {productList.map((Product) => (
                <Cards key={Product._id} Product={Product}></Cards>
              ))}
            </SimpleGrid>
          </Flex>
        )}
      </VStack>
    </Container>
  );
};

export default HomePage;
