"use client";
import { useQuery } from "@tanstack/react-query";

import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Icon,
  Image,
  Separator,
  Tag,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";

import Products from "@services/products.service";
import { HiStar } from "react-icons/hi";
import { FaRegCheckCircle } from "react-icons/fa";
import { CgUnavailable } from "react-icons/cg";

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

  if (isLoading) return <p>Loading product...</p>;
  if (isError) return <p>Error loading product.</p>;

  const formatDateTime = (dateTime: string) => {
    const date = new Date(dateTime);
    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(date);
  };

  const fillStars = (rating: number) =>
    Array.from({ length: 5 }, (_, i) => (
      <Icon
        key={i}
        color={i < Math.floor(rating) ? "yellow.600" : "gray"}
        size="xs"
      >
        <HiStar />
      </Icon>
    ));

  return (
    <Box m={4}>
      <Button asChild>
        <Link href="/">Back to Products</Link>
      </Button>
      <Flex justify="center" flexWrap="wrap" minHeight="100vh" gap={4} my={4}>
        <Image
          src={product.images[0]}
          alt={product.title}
          w="60%"
          //   maxW="570px"
          maxH="600px"
          objectFit="cover"
        />
        <Box w="35%">
          <HStack alignItems="center">
            <Tag.Root>
              <Tag.Label>{product.category.toUpperCase()}</Tag.Label>
            </Tag.Root>
            {product.brand && (
              <>
                <Separator orientation="vertical" size="lg" height="1" />
                <Text fontSize="sm" my={1}>
                  {product.brand.toUpperCase()}
                </Text>
              </>
            )}
          </HStack>
          <Heading fontSize="2xl" fontWeight="bold">
            {product.title}
          </Heading>

          <HStack alignItems="center" gap={2} mt={1}>
            <Box>{fillStars(product.rating)}</Box>
            <Text fontSize="sm" fontWeight="bold">
              {product.rating}
            </Text>
            <Separator orientation="vertical" size="lg" height="1" />
            <Text fontSize="sm" color="gray.500">
              {product.reviews.length} Reviews
            </Text>
          </HStack>

          <Separator my={2} />

          <HStack alignItems="baseline" gap={2}>
            <Text fontSize="5xl" fontWeight="bold">
              ${product.price.toFixed(2)}
            </Text>
            <Tag.Root colorPalette="green">
              <Tag.Label>Save {product.discountPercentage}%</Tag.Label>
            </Tag.Root>
          </HStack>

          <HStack w="100%" gap={2} mt={4}>
            {product.brand && (
              <>
                <Box
                  flex={1}
                  h="70px"
                  background="gray.800"
                  borderRadius="md"
                  p={2}
                >
                  <Text fontSize="xs" my={1}>
                    Brand
                  </Text>
                  <Text fontSize="md" my={1}>
                    {product.brand}
                  </Text>
                </Box>
              </>
            )}

            <Box
              flex={1}
              h="70px"
              background="gray.800"
              borderRadius="md"
              p={2}
            >
              <Text fontSize="xs" my={1}>
                Availability
              </Text>
              <HStack>
                <Icon size="xs" color="green">
                  {product.stock > 0 ? <FaRegCheckCircle /> : <CgUnavailable />}
                </Icon>
                <Text fontSize="md" my={1}>
                  {product.availabilityStatus} - {product.stock}
                </Text>
              </HStack>
            </Box>
          </HStack>

          <Box mt={4}>
            <Text fontSize="xs" my={1}>
              DESCRIPTION
            </Text>
            <Text fontSize="md" my={1}>
              {product.description}
            </Text>
          </Box>

          <HStack wrap="wrap" gap={2} mt={4}>
            {product.tags.map((tag: any) => (
              <Tag.Root key={tag} colorPalette="cyan">
                <Tag.Label>{tag}</Tag.Label>
              </Tag.Root>
            ))}
          </HStack>

          <Separator my={4} />
        </Box>
        
        {product.reviews.length > 0 && (
          <Box w="100%" mx={6}>
            <Text fontSize="xl" fontWeight="bold">
              Reviews
            </Text>
            <Box>
              {product.reviews.map((review: any, index: number) => (
                <Box key={index} my={2}>
                  <Separator my={2} />
                  <HStack alignItems="baseline">
                    <Text fontWeight="medium">{review.reviewerName}</Text>
                    <Text textStyle="xs">{formatDateTime(review.date)}</Text>
                  </HStack>
                  {fillStars(review.rating)}
                  <Text>{review.comment}</Text>
                </Box>
              ))}
            </Box>
          </Box>
        )}
      </Flex>
    </Box>
  );
}
