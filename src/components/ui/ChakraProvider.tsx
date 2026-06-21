"use client";

import {
  ChakraProvider as ChakraUIProvider,
  defaultSystem,
} from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ColorModeProvider, type ColorModeProviderProps } from "./color-mode";
import NewProductDialog from "@components/custom/CreateProductDialog.comp";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

export function ChakraProvider(props: ColorModeProviderProps) {
  return (
    <ChakraUIProvider value={defaultSystem}>
      <QueryClientProvider client={queryClient}>
        <ColorModeProvider {...props} />
        <NewProductDialog.Viewport />
      </QueryClientProvider>
    </ChakraUIProvider>
  );
}
