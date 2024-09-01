import { ChakraProvider } from "@chakra-ui/react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient()
//query client digunakan untuk konfigurasi utama saat digunakan

export default function App({ Component, pageProps }) {
  return(
    <QueryClientProvider client={queryClient}>
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
    </QueryClientProvider>
  );
}
