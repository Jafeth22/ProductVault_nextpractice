"use client";

import { Box, Button, Flex, HStack, Image, Text } from "@chakra-ui/react";
import Products from "@services/products.service";
import { useState } from "react";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [areProductsVisible, setAreProductsVisible] = useState(false);

  const getProducts = async () => {
    const newProducts = await Products().getProducts();
    console.log(["New Products", newProducts]);
    setProducts(newProducts);
    setAreProductsVisible(true);
  };

  const clearListProducts = () => {
    setProducts([]);
    setAreProductsVisible(false);
  };

  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      flexWrap="wrap"
      gap={4}
      my={4}
    >
      <Flex w="100%" alignItems="center" justifyContent="center">
        Products page
        <Button
          ml={4}
          onClick={areProductsVisible ? clearListProducts : getProducts}
          colorPalette={areProductsVisible ? "red" : "blue"}
          _hover={{ colorPalette: areProductsVisible ? "red" : "blue" }}
        >
          {areProductsVisible ? "Clear List" : "Get Products"}
        </Button>
      </Flex>

      {products && (
        <Flex
          w="100%"
          alignItems="center"
          justifyContent="center"
          flexWrap="wrap"
          gap={3}
        >
          {products?.map((product: any) => (
            <Flex
              key={product.id}
              direction="column"
              alignItems="center"
              justifyContent="space-between"
              w="200px"
              h="300px"
              overflow="hidden"
              border="1px solid grey"
              borderRadius="md"
              _hover={{ borderWidth: "1px", borderColor: "yellow" }}
              gap={2}
              p={2}
            >
              <Image
                src={product.thumbnail}
                alt={`Thumbnail of ${product.title}`}
                maxH="180px"
                objectFit="cover"
              />
              <Box w="100%">
                <Text>{product.title}</Text>
                <Button
                  h="30px"
                  w="100%"
                  mt={2}
                  bottom={0}
                  colorPalette="grey"
                  _hover={{ colorPalette: "yellow" }}
                >
                  View details
                </Button>
              </Box>
            </Flex>
          ))}
        </Flex>
      )}
    </Flex>
  );
};

export default ProductsPage;
