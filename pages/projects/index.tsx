import { Box, VStack } from "@chakra-ui/react"
import type { NextPage } from "next"
import Nav from "../../components/nav"

const Projects: NextPage = () => {
	return (
		<VStack>
			<Nav w="100%"/>
			<Box>Projects Page</Box>
		</VStack>
	)
}

export default Projects