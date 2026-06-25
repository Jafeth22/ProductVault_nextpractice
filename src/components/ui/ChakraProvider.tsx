"use client";

import {
  ChakraProvider as ChakraUIProvider,
  createSystem,
  defaultConfig,
  defineConfig,
} from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ColorModeProvider, type ColorModeProviderProps } from "./color-mode";
import NewProductDialog from "@components/custom/CreateProductDialog.comp";

const config = defineConfig({
  globalCss: {
    body: {
      bg: "gray.900",
      color: "white",
    },
  },
  theme: {
    tokens: {
      fonts: {
        heading: {
          value:
            "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
        },
        body: {
          value:
            "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
        },
      },
    },
    semanticTokens: {
      colors: {
        surface: { value: { base: "gray.50", _dark: "gray.900" } },
        card: { value: { base: "white", _dark: "gray.800" } },
        muted: { value: { base: "gray.600", _dark: "gray.400" } },
      },
    },
  },
});

const system = createSystem(defaultConfig, config);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

export function ChakraProvider({ children, ...props }: ColorModeProviderProps) {
  return (
    <ChakraUIProvider value={system}>
      <ColorModeProvider defaultTheme="dark" enableSystem={false} {...props}>
        <QueryClientProvider client={queryClient}>
          {children}
          <NewProductDialog.Viewport />
        </QueryClientProvider>
      </ColorModeProvider>
    </ChakraUIProvider>
  );
}
