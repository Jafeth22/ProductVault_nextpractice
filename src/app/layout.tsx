import { ChakraProvider } from "@components/ui/ChakraProvider";

export default function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props;
  return (
    // suppressHydrationWarning is needed to prevent hydration errors when using the Provider component
    <html suppressHydrationWarning>
      <body cz-shortcut-listen="true">
        <ChakraProvider>{children}</ChakraProvider>
      </body>
    </html>
  );
}
