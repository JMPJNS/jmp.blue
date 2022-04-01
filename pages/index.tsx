import { Button, Flex, Heading, IconButton, Spacer, useColorMode, VStack } from "@chakra-ui/react"
import type { NextPage } from "next"
import {FaSun, FaMoon, FaGithub} from "react-icons/fa"
import Nav from "../components/nav"
import Profile from "../components/profile"

const Home: NextPage = () => {

	const {colorMode, toggleColorMode} = useColorMode()
	const isDark = colorMode === "dark"

	return (
		<VStack>
			<Nav w="100%"/>
			<Profile></Profile>
		</VStack>
	)
}

export default Home
