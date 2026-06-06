"use client";

import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import Products from "@services/products.service";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

type Product = {
  id: number | string;
  title: string;
  thumbnail: string;
  [key: string]: unknown;
};

const ProductsPage = () => {
  const [areProductsVisible, setAreProductsVisible] = useState(false);

  const {
    data: products = [], // the data returned from the query, [] as default value
    refetch, // function to manually trigger the query
    isFetching, // boolean indicating if the query is currently fetching data
    error, // any error that occurred during the query
  } = useQuery<Product[]>({
    queryKey: ["products"], // key for catching and identifying the query
    queryFn: Products().getProducts, // fn that returns the data
    enabled: false, // disable automatic fetching on mount
    staleTime: 1000 * 60 * 5, // 5 minutes, data is considered fresh for this duration
  });

  const loadProducts = async () => {
    await refetch();
    setAreProductsVisible(true);
  };

  const clearListProducts = () => {
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
          onClick={areProductsVisible ? clearListProducts : loadProducts}
          colorPalette={
            areProductsVisible ? "red" : isFetching ? "green" : "blue"
          }
          _hover={{
            colorPalette: areProductsVisible
              ? "red"
              : isFetching
                ? "green"
                : "blue",
          }}
        >
          {areProductsVisible
            ? "Clear List"
            : isFetching
              ? "Loading..."
              : "Get Products"}
        </Button>
      </Flex>

      {error && (
        <Text color="red.500">
          Error loading products: {(error as Error).message}
        </Text>
      )}

      {areProductsVisible && (
        <Flex
          w="100%"
          alignItems="center"
          justifyContent="center"
          flexWrap="wrap"
          gap={3}
        >
          {products.map((product) => (
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
                  asChild
                >
                  <Link href={`/product/${product.id}`}>View details</Link>
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
