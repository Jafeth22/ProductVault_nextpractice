"use client";
import { usePathname } from "next/navigation";
import NextLink from "next/link";
import {
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
      gap="2"
      h={14}
      px="8"
      pt="0"
      background="#0e0e13"
      boxShadow="inset 0 1px 0 rgba(201,164,62,0.32), 0 1px 0 #1d1d28"
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex="10"
    >
      <GridItem colSpan={1}>
        <LinkBox>
          <LinkOverlay as={NextLink} href="/">
            <HStack alignItems="center" color="#f0f0ee">
              <Icon boxSize="6" color="red.500" mr="2" aria-hidden>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <rect width="24" height="24" rx="7" fill="#c9a43e" />
                  <path
                    d="M7 8h10M7 12h10M9 16h6"
                    stroke="#0c0c10"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </Icon>
              <span
                style={{
                  fontSize: 14.5,
                  letterSpacing: "-0.01em",
                  color: "inherit",
                }}
              >
                <span style={{ fontWeight: 400 }}>Product</span>
                <span style={{ fontWeight: 800, color: "#c9a43e" }}>Vault</span>
              </span>
            </HStack>
          </LinkOverlay>
        </LinkBox>
      </GridItem>
      <GridItem colSpan={2}>
        <Center>
          <Link
            as={NextLink}
            href="/"
            fontWeight={isActive("/") ? 700 : 500}
            color={isActive("/") ? "yellow.300" : "gray.100"}
            borderBottomWidth={isActive("/") ? "2px" : 0}
            borderBottomColor="yellow.300"
          >
            Home
          </Link>
        </Center>
      </GridItem>
      <GridItem colSpan={1} justifyItems="end">
        <LinkBox>
          <LinkOverlay as={NextLink} href="/cart">
            <HStack
              alignItems="center"
              justifyContent="flex-end"
              color={isActive("/cart") ? "yellow.300" : "gray.100"}
              fontWeight={isActive("/cart") ? 700 : 500}
            >
              <Icon boxSize="6">
                <FaShoppingCart />
              </Icon>
              <span>Cart</span>
            </HStack>
          </LinkOverlay>
        </LinkBox>
      </GridItem>
    </Grid>
  );
};

export default Navbar;
