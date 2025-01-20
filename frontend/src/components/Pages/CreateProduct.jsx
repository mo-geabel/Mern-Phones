import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  VStack,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { UseProductStore } from "@/Hooks/Product";

const CreateProduct = () => {
  const [newProduct, setnewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });
  const { CreateProduct } = UseProductStore();
  const toast = useToast();

  const handelAddProduct = async () => {
    const { success, message } = await CreateProduct(newProduct);
    if (success) {
      toast({
        title: "Product Created",
        description: "The product has been created successfully.",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      setnewProduct({ name: "", price: "", image: "" }); // Clear the form
    } else {
      toast({
        title: "Error",
        description: message || "Failed to create the product.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  return (
    <Container maxWidth="container.sm" py={8}>
      <VStack spacing={8}>
        <Heading as="h1" size="2xl" textAlign="center">
          Create New Product
        </Heading>
        <Box
          w="full"
          bg={useColorModeValue("white", "gray.800")}
          p={6}
          rounded="lg"
          shadow="md"
        >
          <VStack spacing={4}>
            <Input
              placeholder="Product Name"
              name="name"
              value={newProduct.name}
              onChange={(e) =>
                setnewProduct({ ...newProduct, name: e.target.value })
              }
              isRequired
            />
            <Input
              placeholder="Product Price"
              name="price"
              type="number"
              value={newProduct.price}
              onChange={(e) =>
                setnewProduct({ ...newProduct, price: e.target.value })
              }
              isRequired
            />
            <Input
              placeholder="Product URL"
              name="image"
              value={newProduct.image}
              onChange={(e) =>
                setnewProduct({ ...newProduct, image: e.target.value })
              }
              isRequired
            />
            <Button colorScheme="green" onClick={handelAddProduct} w="full">
              Add Product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreateProduct;
