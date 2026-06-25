"use client";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  Icon,
  Image,
  SimpleGrid,
  Spinner,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";

import { FaRegCheckCircle } from "react-icons/fa";
import { CgUnavailable } from "react-icons/cg";

import Products from "@services/products.service";
import RatingStars from "@components/custom/RatingStars.comp";

interface Props {
  id: string;
}

export default function ProductDetailsClient({ id }: Props) {
  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => Products().getProductById(Number(id)),
    staleTime: 1000 * 60,
  });

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

  const formatDateTime = (dateTime: string) => {
    const date = new Date(dateTime);
    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(date);
  };

  if (isLoading) {
    return (
      <Box minH="100vh" bg="#09090E">
        <Flex justify="center" align="center" h="100vh">
          <Spinner size="lg" color="teal.400" borderWidth="2px" />
        </Flex>
      </Box>
    );
  }

  if (isError || !product) {
    return (
      <Box minH="100vh" bg="#09090E" py={12} px={{ base: 4, md: 6 }}>
        <Container maxW="7xl">
          <Box
            p={6}
            bg="#160A0A"
            border="1px solid"
            borderColor="red.900"
            rounded="2xl"
          >
            <Text fontWeight="600" fontSize="sm" color="red.400">
              Failed to load product
            </Text>
            <Text mt={1} fontSize="sm" color="gray.600">
              Product #{id} could not be found.
            </Text>
          </Box>
        </Container>
      </Box>
    );
  }

  return (
    <Box minH="100vh" bg="#09090E" py={12} px={{ base: 4, md: 6 }}>
      <Container maxW="7xl">
        <Stack gap={10}>
          {/* ── Back ── */}
          <Box>
            <Button
              variant="ghost"
              size="sm"
              color="gray.600"
              fontWeight="500"
              fontSize="xs"
              letterSpacing="0.08em"
              textTransform="uppercase"
              px={0}
              _hover={{ color: "teal.300", bg: "transparent" }}
              asChild
            >
              <Link href="/">← Back to products</Link>
            </Button>
          </Box>

          {/* ── Hero ── */}
          <Flex
            direction={{ base: "column", lg: "row" }}
            gap={10}
            align="flex-start"
          >
            {/* Image */}
            <Box
              flex="1"
              borderRadius="2xl"
              overflow="hidden"
              position="relative"
              flexShrink={0}
              maxW={{ base: "100%", lg: "52%" }}
            >
              <Image
                src={product.images[0]}
                alt={product.title}
                width="100%"
                height="100%"
                maxH={{ base: "320px", md: "520px" }}
                objectFit="cover"
                display="block"
              />
              <Box
                position="absolute"
                top={0}
                left={0}
                right={0}
                bottom={0}
                style={{
                  background:
                    "linear-gradient(to top, rgba(9,9,14,0.65) 0%, transparent 52%)",
                }}
                pointerEvents="none"
              />
            </Box>

            {/* Info panel */}
            <Stack flex="1" gap={7} minW={0}>
              {/* Category + Brand pills */}
              <HStack wrap="wrap" gap={2}>
                <Box
                  bg="rgba(13,148,136,0.1)"
                  color="teal.400"
                  border="1px solid"
                  borderColor="teal.900"
                  borderRadius="full"
                  px={3}
                  py={0.5}
                  fontSize="2xs"
                  fontWeight="700"
                  letterSpacing="0.15em"
                  textTransform="uppercase"
                >
                  {product.category}
                </Box>
                {product.brand && (
                  <Box
                    bg="rgba(168,85,247,0.08)"
                    color="purple.400"
                    border="1px solid"
                    borderColor="purple.900"
                    borderRadius="full"
                    px={3}
                    py={0.5}
                    fontSize="2xs"
                    fontWeight="700"
                    letterSpacing="0.15em"
                    textTransform="uppercase"
                  >
                    {product.brand}
                  </Box>
                )}
              </HStack>

              {/* Title */}
              <Heading
                size="2xl"
                fontWeight="700"
                color="white"
                letterSpacing="-0.02em"
                lineHeight="1.1"
              >
                {product.title}
              </Heading>

              {/* Rating */}
              <HStack gap={3} align="center" flexWrap="wrap">
                {RatingStars(product.rating)}
                <Text fontSize="sm" color="gray.600">
                  {product.reviews.length} reviews
                </Text>
              </HStack>

              {/* Price */}
              <HStack gap={4} align="flex-end" wrap="wrap">
                <Text
                  fontSize={{ base: "4xl", md: "5xl" }}
                  fontWeight="800"
                  color="#C9A84C"
                  letterSpacing="-0.03em"
                  lineHeight={1}
                >
                  ${product.price.toFixed(2)}
                </Text>
                {product.discountPercentage > 0 && (
                  <Box
                    bg="rgba(13,148,136,0.12)"
                    color="teal.300"
                    border="1px solid"
                    borderColor="teal.800"
                    borderRadius="full"
                    px={3}
                    py={1}
                    fontSize="xs"
                    fontWeight="700"
                    letterSpacing="0.05em"
                    mb={1}
                  >
                    Save {product.discountPercentage.toFixed(0)}%
                  </Box>
                )}
              </HStack>

              {/* Description */}
              <Text color="gray.500" fontSize="md" lineHeight="1.75" maxW="3xl">
                {product.description}
              </Text>

              {/* Info cards */}
              <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
                {/* Availability */}
                <Box
                  p={5}
                  bg="#111118"
                  border="1px solid"
                  borderColor="rgba(255,255,255,0.06)"
                  rounded="2xl"
                  transition="all 0.2s ease"
                  _hover={{
                    borderColor: "teal.800",
                    boxShadow: "0 8px 24px rgba(13,148,136,0.08)",
                  }}
                >
                  <Text
                    fontSize="2xs"
                    fontWeight="700"
                    letterSpacing="0.18em"
                    textTransform="uppercase"
                    color="gray.600"
                    mb={3}
                  >
                    Availability
                  </Text>
                  <HStack align="center" gap={3}>
                    <Icon
                      as={product.stock > 0 ? FaRegCheckCircle : CgUnavailable}
                      boxSize={5}
                      color={product.stock > 0 ? "teal.400" : "red.400"}
                    />
                    <Box>
                      <Text fontWeight="600" fontSize="sm" color="gray.100">
                        {product.stock > 0 ? "In stock" : "Out of stock"}
                      </Text>
                      <Text fontSize="xs" color="gray.600" mt={0.5}>
                        {product.stock} units available
                      </Text>
                    </Box>
                  </HStack>
                </Box>

                {/* Product details */}
                <Box
                  p={5}
                  bg="#111118"
                  border="1px solid"
                  borderColor="rgba(255,255,255,0.06)"
                  rounded="2xl"
                  transition="all 0.2s ease"
                  _hover={{
                    borderColor: "teal.800",
                    boxShadow: "0 8px 24px rgba(13,148,136,0.08)",
                  }}
                >
                  <Text
                    fontSize="2xs"
                    fontWeight="700"
                    letterSpacing="0.18em"
                    textTransform="uppercase"
                    color="gray.600"
                    mb={3}
                  >
                    Product details
                  </Text>
                  <VStack align="stretch" gap={0}>
                    <HStack justify="space-between" py={2}>
                      <Text fontSize="xs" color="gray.600" fontWeight="500">
                        ID
                      </Text>
                      <Text fontSize="xs" color="gray.400" fontWeight="600">
                        #{product.id}
                      </Text>
                    </HStack>
                    <Box h="1px" bg="rgba(255,255,255,0.04)" />
                    <HStack justify="space-between" py={2}>
                      <Text fontSize="xs" color="gray.600" fontWeight="500">
                        Category
                      </Text>
                      <Text
                        fontSize="xs"
                        color="gray.400"
                        fontWeight="600"
                        textTransform="capitalize"
                      >
                        {product.category}
                      </Text>
                    </HStack>
                  </VStack>
                </Box>
              </SimpleGrid>

              {/* Tags */}
              {product.tags.length > 0 && (
                <HStack wrap="wrap" gap={2}>
                  {product.tags.map((tag: string) => (
                    <Box
                      key={tag}
                      bg="rgba(255,255,255,0.04)"
                      color="gray.500"
                      border="1px solid"
                      borderColor="rgba(255,255,255,0.07)"
                      borderRadius="full"
                      px={2.5}
                      py={0.5}
                      fontSize="2xs"
                      fontWeight="600"
                      letterSpacing="0.1em"
                      textTransform="uppercase"
                    >
                      {tag}
                    </Box>
                  ))}
                </HStack>
              )}
            </Stack>
          </Flex>

          {/* ── Reviews ── */}
          {product.reviews.length > 0 && (
            <Box>
              <Flex justify="space-between" align="center" mb={6}>
                <Box>
                  <Text
                    fontSize="2xs"
                    fontWeight="700"
                    letterSpacing="0.2em"
                    textTransform="uppercase"
                    color="teal.400"
                    mb={1}
                  >
                    Feedback
                  </Text>
                  <Heading
                    size="lg"
                    fontWeight="700"
                    color="white"
                    letterSpacing="-0.01em"
                  >
                    Customer Reviews
                  </Heading>
                </Box>
                <Box
                  bg="rgba(255,255,255,0.04)"
                  color="gray.500"
                  border="1px solid"
                  borderColor="rgba(255,255,255,0.07)"
                  borderRadius="full"
                  px={3}
                  py={1}
                  fontSize="xs"
                  fontWeight="600"
                >
                  {product.reviews.length} reviews
                </Box>
              </Flex>

              <SimpleGrid columns={{ base: 1, md: 2 }} gap={5}>
                {product.reviews.map((review: any, index: number) => (
                  <Box
                    key={index}
                    p={5}
                    bg="#111118"
                    border="1px solid"
                    borderColor="rgba(255,255,255,0.06)"
                    rounded="2xl"
                    transition="all 0.2s ease"
                    _hover={{
                      borderColor: "teal.800",
                      boxShadow: "0 8px 24px rgba(13,148,136,0.08)",
                    }}
                  >
                    <HStack justify="space-between" align="flex-start" mb={4}>
                      <HStack gap={3}>
                        {/* Reviewer avatar */}
                        <Flex
                          w={9}
                          h={9}
                          borderRadius="full"
                          bg="rgba(13,148,136,0.1)"
                          border="1px solid"
                          borderColor="teal.900"
                          align="center"
                          justify="center"
                          flexShrink={0}
                        >
                          <Text fontSize="xs" fontWeight="700" color="teal.400">
                            {getInitials(review.reviewerName)}
                          </Text>
                        </Flex>
                        <Box>
                          <Text fontWeight="600" fontSize="sm" color="gray.100">
                            {review.reviewerName}
                          </Text>
                          <Text fontSize="xs" color="gray.600" mt={0.5}>
                            {formatDateTime(review.date)}
                          </Text>
                        </Box>
                      </HStack>
                    </HStack>
                    {RatingStars(review.rating)}
                    <Text
                      mt={3}
                      color="gray.500"
                      fontSize="sm"
                      lineHeight="1.65"
                    >
                      {review.comment}
                    </Text>
                  </Box>
                ))}
              </SimpleGrid>
            </Box>
          )}
        </Stack>
      </Container>
    </Box>
  );
}
