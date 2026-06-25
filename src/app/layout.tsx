import { ChakraProvider } from "@components/ui/ChakraProvider";
import Navbar from "@components/custom/Navbar.comp";

export default function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props;
  return (
    // suppressHydrationWarning is needed to prevent hydration errors when using the Provider component
    <html suppressHydrationWarning>
      <body cz-shortcut-listen="true">
        <ChakraProvider>
          <Navbar />
          <div style={{ paddingTop: "56px" }}>{children}</div>
        </ChakraProvider>
      </body>
    </html>
  );
}
