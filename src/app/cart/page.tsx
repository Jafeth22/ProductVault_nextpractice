"use client";

import { useMemo, useState } from "react";
import NextLink from "next/link";
import {
  Badge,
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  IconButton,
  Image,
  Link,
  Separator,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FaTrashAlt } from "react-icons/fa";
import CartEmpty from "@components/custom/CartEmpty.comp";

type CartItem = {
  id: number;
  title: string;
  price: number;
  quantity: number;
  thumbnail: string;
  category: string;
};

const INITIAL_CART_ITEMS: CartItem[] = [
  {
    id: 1,
    title: "Modern Wireless Headphones",
    price: 129.99,
    quantity: 1,
    thumbnail: "https://via.placeholder.com/120?text=Headphones",
    category: "Audio",
  },
  {
    id: 2,
    title: "Minimal Desk Lamp",
    price: 48.5,
    quantity: 2,
    thumbnail: "https://via.placeholder.com/120?text=Lamp",
    category: "Office",
  },
];

const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>(INITIAL_CART_ITEMS);

  const subtotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems],
  );

  const shipping = cartItems.length > 0 ? 12.5 : 0;
  const total = subtotal + shipping;

  const updateQuantity = (id: number, quantity: number) => {
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item,
      ),
    );
  };

  const removeItem = (id: number) => {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.id !== id),
    );
  };

  return (
    <Container maxW="8xl" py={6}>
      <Stack gap={6}>
        <Flex
          direction={["column", "column", "row"]}
          align="flex-start"
          gap={4}
        >
          <Box>
            <Heading size="2xl">Your Cart</Heading>
            <Text color="fg.muted" mt={2} maxW="2xl">
              Review your selected items, adjust quantities, and complete your
              order when ready.
            </Text>
          </Box>
          <Spacer />
          <Button
            asChild
            colorScheme="yellow"
            variant="outline"
            alignSelf="flex-start"
          >
            <Link href="/">Continue shopping</Link>
          </Button>
        </Flex>

        {cartItems.length === 0 ? (
          <CartEmpty />
        ) : (
          <Flex direction={["column", "column", "row"]} gap={6}>
            <Stack flex="1" gap={4}>
              {cartItems.map((item) => (
                <Box
                  key={item.id}
                  p={4}
                  borderWidth="1px"
                  borderRadius="xl"
                  boxShadow="sm"
                >
                  <Flex direction={["column", "row"]} gap={4} align="center">
                    <Image
                      src={item.thumbnail}
                      alt={item.title}
                      boxSize="120px"
                      objectFit="cover"
                      borderRadius="md"
                      flexShrink={0}
                    />

                    <Box flex="1">
                      <HStack align="start" justify="space-between" mb={2}>
                        <Box>
                          <Heading size="md">{item.title}</Heading>
                          <Badge mt={2} colorScheme="yellow">
                            {item.category}
                          </Badge>
                        </Box>
                        <IconButton
                          aria-label="Remove item"
                          variant="ghost"
                          colorScheme="red"
                          onClick={() => removeItem(item.id)}
                        >
                          <FaTrashAlt />
                        </IconButton>
                      </HStack>

                      <Text fontSize="sm" color="fg.muted">
                        Unit price
                      </Text>
                      <Heading size="sm" mt={1}>
                        ${item.price.toFixed(2)}
                      </Heading>

                      <HStack mt={4} gap={3} alignItems="center">
                        <Text fontWeight="semibold">Quantity</Text>
                        {/* <NumberInput
                          size="sm"
                          maxW="110px"
                          min={1}
                          value={item.quantity}
                          onChange={(_, valueAsNumber) =>
                            updateQuantity(item.id, valueAsNumber)
                          }
                        >
                          <NumberInputField />
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper>
                        </NumberInput> */}
                      </HStack>

                      <Text mt={4} fontWeight="semibold">
                        Item total: $
                        {Number(item.quantity * item.price).toFixed(2)}
                      </Text>
                    </Box>
                  </Flex>
                </Box>
              ))}
            </Stack>

            <Box
              minW={["auto", "360px"]}
              borderWidth="1px"
              borderRadius="xl"
              p={6}
              boxShadow="sm"
            >
              <Heading size="lg">Order summary</Heading>
              <Stack gap={4} mt={4}>
                <Flex justify="space-between">
                  <Text color="fg.muted">Items</Text>
                  <Text>{cartItems.length}</Text>
                </Flex>
                <Flex justify="space-between">
                  <Text color="fg.muted">Subtotal</Text>
                  <Text>${subtotal.toFixed(2)}</Text>
                </Flex>
                <Flex justify="space-between">
                  <Text color="fg.muted">Shipping</Text>
                  <Text>${shipping.toFixed(2)}</Text>
                </Flex>
                <Separator size="lg" />
                <Flex justify="space-between">
                  <Text fontWeight="bold">Total</Text>
                  <Heading size="md">${total.toFixed(2)}</Heading>
                </Flex>
              </Stack>

              <Button colorScheme="yellow" size="lg" mt={6} w="100%">
                Proceed to checkout
              </Button>

              <Link
                as={NextLink}
                href="/"
                color="yellow.500"
                fontWeight="medium"
                display="block"
                textAlign="center"
                mt={4}
              >
                Continue shopping
              </Link>
            </Box>
          </Flex>
        )}
      </Stack>
    </Container>
  );
};

export default CartPage;
