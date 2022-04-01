import "../styles/globals.css"
import type { AppProps } from "next/app"
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react"

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ChakraProvider>
			<ColorModeScript initialColorMode="dark"></ColorModeScript>
			<Component {...pageProps} />
		</ChakraProvider>
	)
}

export default MyApp
