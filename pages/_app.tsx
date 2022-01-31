import { ChakraProvider } from '@chakra-ui/react'
import Layout from "../layout/Layout";
function MyApp({ Component, pageProps }) {
    const LayoutComponent = (Component as any).Layout || Layout;
  return (
      <ChakraProvider>
        <LayoutComponent>
            <Component {...pageProps} />
        </LayoutComponent>
      </ChakraProvider>
  )
}
export default MyApp