import { ReactElement, ReactNode } from "react"
import {
	Box,
	Flex,
	Avatar,
	HStack,
	IconButton,
	Button,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	MenuDivider,
	useDisclosure,
	useColorModeValue,
	Stack,
	Icon,
	useColorMode,
	Heading,
	BoxProps,
} from "@chakra-ui/react"
import { FaFolderOpen, FaGithub, FaMoon, FaSun, FaWindowClose } from "react-icons/fa"

type NavLink = {name: string, url: string, icon?: ReactElement}
const Links = [
	{name: "Projects", url: "/projects"},
	{name: "View Source", url: "https://github.com/JMPJNS/jmp.blue", icon: <FaGithub/>}
]

const NavLink = ({ children }: { children: NavLink }) => {
	return (
		<Button
			leftIcon={children.icon}
			px={2}
			py={1}
			rounded={"md"}
			_hover={{
				textDecoration: "none",
				bg: useColorModeValue("gray.200", "gray.700"),
			}}
			as="a"
			href={children.url ?? "#"}>
			{children.name}
		</Button>
	)}

function Nav(props: BoxProps) {
	const { isOpen, onOpen, onClose } = useDisclosure()

	const {colorMode, toggleColorMode} = useColorMode()
	const isDark = colorMode === "dark"

	return (
		<Box bg={useColorModeValue("gray.100", "gray.900")} px={4} {...props}>
			<Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
				<IconButton
					size={"sm"}
					icon={isOpen ? <Icon as={FaWindowClose} /> : <Icon as={FaFolderOpen} />}
					aria-label={"Open Menu"}
					display={{ md: "none" }}
					onClick={isOpen ? onClose : onOpen}
				/>
				<HStack spacing={8} alignItems={"center"}>
					<Box>
						<Heading size="md" fontWeight="semibold" color="blue.400">
								JMP.blue
						</Heading>
					</Box>
					<HStack
						as={"nav"}
						spacing={4}
						display={{ base: "none", md: "flex" }}>
						{Links.map((link) => (
							<NavLink key={link.name}>{link}</NavLink>
						))}
					</HStack>
				</HStack>
				<Flex alignItems={"center"}>
					<Menu>
						<MenuButton
							as={Button}
							rounded={"full"}
							variant={"link"}
							cursor={"pointer"}
							minW={0}>
							<Avatar
								ml="8"
								size={"sm"}
								src={
									"https://avatars.githubusercontent.com/u/21279685?v=4"
								}
							/>
						</MenuButton>
						<MenuList>
							<MenuItem onClick={toggleColorMode}>
								<HStack>
									<Box>Color Theme: {isDark ? "Dark" : "Light"}</Box>
									<Box>{isDark ? <FaMoon/> : <FaSun/>}</Box>	
								</HStack>
							</MenuItem>
						</MenuList>
					</Menu>
				</Flex>
			</Flex>

			{isOpen ? (
				<Box pb={4} display={{ md: "none" }}>
					<Stack as={"nav"} spacing={4}>
						{Links.map((link) => (
							<NavLink key={link.name}>{link}</NavLink>
						))}
					</Stack>
				</Box>
			) : null}
		</Box>
	)
}

export default Nav