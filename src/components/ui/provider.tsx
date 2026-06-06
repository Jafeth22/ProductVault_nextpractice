"use client"

import { ChakraProvider, defaultSystem } from "@chakra-ui/react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import {
  ColorModeProvider,
  type ColorModeProviderProps,
} from "./color-mode"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
})

export function Provider(props: ColorModeProviderProps) {
  return (
    <ChakraProvider value={defaultSystem}>
      <QueryClientProvider client={queryClient}>
        <ColorModeProvider {...props} />
      </QueryClientProvider>
    </ChakraProvider>
  )
}
