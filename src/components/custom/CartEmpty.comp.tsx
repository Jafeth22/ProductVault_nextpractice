import { VStack, Heading, Button, Text, Link } from "@chakra-ui/react";
import { FaShoppingBag } from "react-icons/fa";

const CartEmpty = () => {
  return (
    <VStack
      py={20}
      gap={4}
      borderWidth="1px"
      borderRadius="lg"
      borderStyle="dashed"
    >
      <FaShoppingBag size={40} color="#F6AD55" />
      <Heading size="md">Your cart is empty</Heading>
      <Text color="fg.muted" maxW="xl" textAlign="center">
        Add products from the store to see them here. You can continue shopping
        and complete your purchase once you have items in your cart.
      </Text>
      <Button asChild>
        <Link colorPalette="black" href="/">
          Browse products
        </Link>
      </Button>
    </VStack>
  );
};

export default CartEmpty;
