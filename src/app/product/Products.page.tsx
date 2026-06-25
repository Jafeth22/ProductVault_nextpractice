"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import {
  AspectRatio,
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  Image,
  SimpleGrid,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";

import Products from "@services/products.service";
import { IProducts } from "@/types/products";
import RatingStars from "@components/custom/RatingStars.comp";
import { OpenProductDialog } from "@/components/custom/CreateProductDialog.comp";

const ProductsPage = () => {
  const router = useRouter();
  const [loadingId, setLoadingId] = useState<number | null>(null);

  const {
    data: products,
    isLoading,
    error,
  } = useQuery<IProducts[]>({
    queryKey: ["products"],
    queryFn: Products().getProducts,
    staleTime: 1000 * 60 * 5,
  });

  const handleProductClick = (productId: number) => {
    setLoadingId(productId);
    router.push(`/product/${productId}`);
  };

  return (
    <Box minH="100vh" bg="#09090E" py={12} px={{ base: 4, md: 6 }}>
      <Container maxW="7xl">
        <Stack gap={10}>
          {/* ── Header ── */}
          <Flex
            justify="space-between"
            align={{ base: "flex-start", md: "center" }}
            direction={{ base: "column", md: "row" }}
            gap={4}
          >
            <Box>
              <Text
                fontSize="xs"
                fontWeight="700"
                letterSpacing="0.2em"
                textTransform="uppercase"
                color="teal.400"
                mb={2}
              >
                Product Catalog
              </Text>
              <Heading
                size="2xl"
                fontWeight="700"
                color="white"
                letterSpacing="-0.02em"
                lineHeight="1.1"
              >
                Modern Product Catalog
              </Heading>
              <Text mt={2} fontSize="sm" color="gray.600">
                {products?.length ?? "—"} items available
              </Text>
            </Box>
            <OpenProductDialog />
          </Flex>

          {/* ── States ── */}
          {isLoading ? (
            <Flex justify="center" align="center" py={40}>
              <Spinner size="lg" color="teal.400" borderWidth="2px" />
            </Flex>
          ) : error ? (
            <Box
              p={6}
              bg="#160A0A"
              border="1px solid"
              borderColor="red.900"
              rounded="2xl"
            >
              <Text fontWeight="600" fontSize="sm" color="red.400">
                Failed to load products
              </Text>
              <Text mt={1} fontSize="sm" color="gray.600">
                {(error as Error).message}
              </Text>
            </Box>
          ) : (
            <SimpleGrid columns={{ base: 1, sm: 2, lg: 3, xl: 4 }} gap={5}>
              {products?.map((product) => (
                <Box
                  key={product.id}
                  bg="#111118"
                  borderRadius="2xl"
                  overflow="hidden"
                  border="1px solid"
                  borderColor="rgba(255,255,255,0.06)"
                  transition="all 0.25s ease"
                  display="flex"
                  flexDirection="column"
                  _hover={{
                    borderColor: "teal.600",
                    transform: "translateY(-4px)",
                    boxShadow: "0 20px 40px rgba(13,148,136,0.12)",
                  }}
                >
                  {/* ── Thumbnail ── */}
                  <Box position="relative" flexShrink={0}>
                    <AspectRatio ratio={4 / 3}>
                      <Image
                        src={product.thumbnail}
                        alt={`Thumbnail of ${product.title}`}
                        objectFit="cover"
                        w="100%"
                      />
                    </AspectRatio>

                    {/* Bottom gradient bleed into card */}
                    <Box
                      position="absolute"
                      top={0}
                      left={0}
                      right={0}
                      bottom={0}
                      style={{
                        background:
                          "linear-gradient(to top, rgba(17,17,24,0.85) 0%, transparent 52%)",
                      }}
                      pointerEvents="none"
                    />

                    {/* Discount pill */}
                    {product.discountPercentage > 0 && (
                      <Box
                        position="absolute"
                        top={3}
                        left={3}
                        bg="rgba(13,148,136,0.12)"
                        color="teal.300"
                        border="1px solid"
                        borderColor="teal.800"
                        borderRadius="full"
                        px={2.5}
                        py={0.5}
                        fontSize="2xs"
                        fontWeight="700"
                        letterSpacing="0.05em"
                      >
                        −{product.discountPercentage.toFixed(0)}%
                      </Box>
                    )}
                  </Box>

                  {/* ── Body ── */}
                  <Stack gap={4} p={5} flex={1} justify="space-between">
                    <Stack gap={3}>
                      {/* Category / Brand row */}
                      <HStack justify="space-between" gap={2}>
                        <Text
                          fontSize="2xs"
                          fontWeight="700"
                          letterSpacing="0.15em"
                          textTransform="uppercase"
                          color="teal.400"
                          overflow="hidden"
                          textOverflow="ellipsis"
                          whiteSpace="nowrap"
                        >
                          {product.category}
                        </Text>
                        {product.brand && (
                          <Text
                            fontSize="2xs"
                            fontWeight="500"
                            letterSpacing="0.1em"
                            textTransform="uppercase"
                            color="gray.600"
                            flexShrink={0}
                          >
                            {product.brand}
                          </Text>
                        )}
                      </HStack>

                      {/* Title */}
                      <Text
                        fontWeight="600"
                        fontSize="sm"
                        color="gray.100"
                        lineHeight="1.45"
                        style={{
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {product.title}
                      </Text>
                    </Stack>

                    {/* Rating + Price */}
                    <HStack justify="space-between" align="center">
                      {RatingStars(product.rating)}
                      <Text
                        fontSize="md"
                        fontWeight="700"
                        color="#C9A84C"
                        letterSpacing="-0.02em"
                      >
                        ${product.price.toFixed(2)}
                      </Text>
                    </HStack>

                    {/* CTA */}
                    <Button
                      size="sm"
                      w="full"
                      variant="outline"
                      borderColor="rgba(255,255,255,0.1)"
                      color="gray.400"
                      fontWeight="500"
                      fontSize="xs"
                      letterSpacing="0.08em"
                      textTransform="uppercase"
                      loading={loadingId === product.id}
                      disabled={loadingId !== null}
                      onClick={() => handleProductClick(product.id)}
                      _hover={{
                        bg: "rgba(13,148,136,0.08)",
                        borderColor: "teal.600",
                        color: "teal.300",
                      }}
                    >
                      View Details
                    </Button>
                  </Stack>
                </Box>
              ))}
            </SimpleGrid>
          )}
        </Stack>
      </Container>
    </Box>
  );
};

export default ProductsPage;
