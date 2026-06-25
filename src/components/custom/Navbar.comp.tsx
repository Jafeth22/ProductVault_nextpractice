"use client";
import { usePathname } from "next/navigation";
import NextLink from "next/link";
import {
  Box,
  Center,
  Grid,
  GridItem,
  HStack,
  Icon,
  Link,
  LinkBox,
  LinkOverlay,
} from "@chakra-ui/react";
import { FaShoppingCart } from "react-icons/fa";

const GOLD = "#C9A84C";

const Navbar = () => {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (!pathname) return false;
    if (path === "/") return pathname === "/" || pathname === "";
    return pathname.startsWith(path);
  };

  return (
    <Grid
      w="100%"
      templateColumns="repeat(4, 1fr)"
      alignItems="center"
      gap={2}
      h={14}
      px={8}
      bg="rgba(10,10,14,0.88)"
      style={{
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
      }}
      boxShadow="inset 0 1px 0 rgba(201,164,62,0.28), 0 1px 0 rgba(255,255,255,0.04)"
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={10}
    >
      {/* ── Logo ── */}
      <GridItem colSpan={1}>
        <LinkBox>
          <LinkOverlay as={NextLink} href="/">
            <HStack align="center" gap={2.5}>
              <Box as="span" flexShrink={0} lineHeight={0}>
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden
                >
                  <rect width="24" height="24" rx="7" fill={GOLD} />
                  <path
                    d="M7 8h10M7 12h10M9 16h6"
                    stroke="#0c0c10"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </Box>
              <Box
                as="span"
                fontSize="sm"
                letterSpacing="-0.01em"
                color="#f0f0ee"
                userSelect="none"
              >
                <Box as="span" fontWeight={400}>
                  Product
                </Box>
                <Box as="span" fontWeight={800} color={GOLD}>
                  Vault
                </Box>
              </Box>
            </HStack>
          </LinkOverlay>
        </LinkBox>
      </GridItem>

      {/* ── Nav links ── */}
      <GridItem colSpan={2}>
        <Center>
          <HStack gap={6}>
            <Link
              as={NextLink}
              href="/"
              fontSize="xs"
              fontWeight={isActive("/") ? 700 : 500}
              letterSpacing="0.08em"
              textTransform="uppercase"
              color={isActive("/") ? GOLD : "gray.500"}
              borderBottom="2px solid"
              borderBottomColor={isActive("/") ? GOLD : "transparent"}
              pb={0.5}
              transition="all 0.15s ease"
              _hover={{ color: GOLD, textDecoration: "none" }}
            >
              Home
            </Link>
          </HStack>
        </Center>
      </GridItem>

      {/* ── Cart ── */}
      <GridItem colSpan={1} justifyItems="end">
        <LinkBox>
          <LinkOverlay as={NextLink} href="/cart">
            <HStack
              align="center"
              justify="flex-end"
              gap={2}
              color={isActive("/cart") ? GOLD : "gray.500"}
              transition="color 0.15s ease"
              _hover={{ color: GOLD }}
            >
              <Icon boxSize={4}>
                <FaShoppingCart />
              </Icon>
              <Box
                as="span"
                fontSize="xs"
                fontWeight={isActive("/cart") ? 700 : 500}
                letterSpacing="0.08em"
                textTransform="uppercase"
              >
                Cart
              </Box>
            </HStack>
          </LinkOverlay>
        </LinkBox>
      </GridItem>
    </Grid>
  );
};

export default Navbar;
