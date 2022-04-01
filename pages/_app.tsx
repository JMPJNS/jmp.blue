import "../styles/globals.css"
import type { AppProps } from "next/app"
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react"
import { SessionProvider } from "next-auth/react"

function MyApp({ Component, pageProps: {session, ...pageProps} }: AppProps) {
	return (
		<SessionProvider session={session}>
			<ChakraProvider>
				<ColorModeScript initialColorMode="dark"></ColorModeScript>
				<Component {...pageProps} />
			</ChakraProvider>
		</SessionProvider>
	)
}

export default MyApp
