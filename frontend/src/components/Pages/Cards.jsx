import {
  Box,
  Button,
  Container,
  HStack,
  Image,
  Text,
  useDisclosure,
  VStack,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  useToast,
} from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { UseProductStore } from "@/Hooks/Product";
import React, { useState } from "react";

const Cards = ({ Product }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newProduct, setnewProduct] = useState(Product);
  const { DeleteProduct, UpdateProduct } = UseProductStore(); // Ensure these methods exist
  const toast = useToast();
  return (
    <Container maxW="sm">
      <Box
        shadow={"md"}
        rounded={"lg"}
        p={6}
        justifyContent={"center"}
        _hover={{ transform: "translateY(-4px)", shadow: "xl" }}
      >
        <VStack spacing={4}>
          <Image
            src={Product.image}
            alt="Green double couch with wooden legs"
            borderRadius="lg"
            maxW={"200px"}
          />
          <Text size="md">{Product.name}</Text>
          <Text
            color={useColorModeValue("green.500", "green.200")}
            fontSize="2xl"
          >
            {Product.price}$
          </Text>
        </VStack>
        <HStack mt="6" spacing={8} justifyContent={"center"}>
          <Button
            variant={useColorModeValue("solid", "outline")}
            colorScheme="green"
            onClick={onOpen}
          >
            <FaEdit />
          </Button>
          <Button
            onClick={() => {
              DeleteProduct(Product._id),
                toast({
                  title: "Product deleted",
                  description: "The product has been deleted successfully",
                  status: "success",
                  duration: 4000,
                  isClosable: true,
                });
            }}
            variant="solid"
            colorScheme="red"
          >
            <MdDelete />
          </Button>
        </HStack>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Input
                placeholder="Product Name"
                name="name"
                value={newProduct.name}
                onChange={(e) =>
                  setnewProduct({ ...newProduct, name: e.target.value })
                }
              />
              <Input
                placeholder="Product Price"
                name="price"
                type="number" // Correct input type
                value={newProduct.price}
                onChange={(e) =>
                  setnewProduct({ ...newProduct, price: e.target.value })
                }
              />
              <Input
                placeholder="Product URL"
                name="image"
                value={newProduct.image}
                onChange={(e) =>
                  setnewProduct({ ...newProduct, image: e.target.value })
                }
              />
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              colorScheme="green"
              onClick={() => {
                UpdateProduct(Product._id, newProduct),
                  onClose(),
                  toast({
                    title: "Product updated.",
                    description: "The product has been updated successfully",
                    status: "success",
                    duration: 4000,
                    isClosable: true,
                  });
              }}
              w={"full"}
            >
              Update Product
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default Cards;
