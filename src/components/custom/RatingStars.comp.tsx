import { Box, HStack, Icon, Text } from "@chakra-ui/react";
import { HiStar } from "react-icons/hi";

const RatingStars = (rating: number) => (
  <HStack alignItems="baseline" gap={2}>
    <Box>
      {Array.from({ length: 5 }, (_, i) => (
        <Icon
          key={i}
          color={i < Math.floor(rating) ? "yellow.600" : "gray"}
          size="xs"
        >
          <HiStar />
        </Icon>
      ))}
    </Box>
    <Text fontSize="sm" fontWeight="bold">
      {rating}
    </Text>
  </HStack>
);

export default RatingStars;
