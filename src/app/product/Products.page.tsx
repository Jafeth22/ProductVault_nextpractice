"use client";
import { useState } from "react";
// import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  Box,
  Button,
  Circle,
  Flex,
  Float,
  Image,
  Tag,
  Text,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";

import Products from "@services/products.service";
import RatingStars from "@components/custom/RatingStars.comp";

const ProductsPage = () => {
  const router = useRouter();
  const [loadingId, setLoadingId] = useState<number | null>(null);

  const {
    data: products, // the data returned from the query, it is remaining data to products and initializing [] as default value
    isSuccess, // boolean indicating if the query was successful
    isLoading, // boolean indicating if the query is currently loading
    error, // any error that occurred during the query
  } = useQuery({
    queryKey: ["products"], // key for catching and identifying the query
    queryFn: Products().getProducts, // fn that returns the data
    staleTime: 1000 * 60 * 5, // 5 minutes, data is considered fresh for this duration
  });

  const handleProductClick = (productId: number) => {
    setLoadingId(productId);
    router.push(`/product/${productId}`);
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
        Products List
      </Flex>

      {isLoading && <Text>Loading products...</Text>}

      {error && (
        <Text color="red.500">
          Error loading products: {(error as Error).message}
        </Text>
      )}

      {isSuccess && (
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
              h="310px"
              overflow="hidden"
              border="1px solid grey"
              borderRadius="md"
              _hover={{ borderWidth: "1px", borderColor: "yellow" }}
              gap={2}
              p={2}
            >
              <Box position="relative">
                <Image
                  src={product.thumbnail}
                  alt={`Thumbnail of ${product.title}`}
                  maxH="135px"
                  objectFit="contain"
                />
                {product.discountPercentage > 0 && (
                  <Float placement="top-start" offsetX="-0.5" offsetY="2">
                    <Tag.Root variant="surface" size="sm" colorPalette="green">
                      <Tag.Label>% Disc</Tag.Label>
                    </Tag.Root>
                  </Float>
                )}
              </Box>

              <Box w="100%" h="150px">
                <Tag.Root variant="outline" size="sm" colorPalette="cyan">
                  <Tag.Label>{product.category.toUpperCase()}</Tag.Label>
                </Tag.Root>
                <Text fontSize="sm" h="40px">
                  {product.title}
                </Text>
                {RatingStars(product.rating)}
                <Text fontSize="sm" fontWeight="bold">
                  ${product.price.toFixed(2)}
                </Text>
                <Button
                  h="30px"
                  w="100%"
                  mt={2}
                  colorPalette="grey"
                  _hover={{ colorPalette: "yellow" }}
                  loading={loadingId === product.id}
                  disabled={loadingId !== null}
                  onClick={() => handleProductClick(product.id)}
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
