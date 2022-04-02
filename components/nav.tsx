import { ReactElement } from "react"
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
import { useSession, signIn, signOut } from "next-auth/react"
import Link from "next/link"

type NavLink = {name: string, url: string, newPage?: boolean, icon?: ReactElement}
const Links: NavLink[] = [
	{name: "Projects", url: "/projects"},
	{name: "View Source", url: "https://github.com/JMPJNS/jmp.blue", icon: <FaGithub/>, newPage: true}
]

const NavLink = ({ children }: { children: NavLink }) => {
	return (
		<Link passHref href={children.url ?? "#"}>
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
				target={children.newPage ? "_blank" : "_self"}>
				{children.name}
			</Button>
		</Link>
	)}

function UserMenu() {
	const {data: session} = useSession()
	const {colorMode, toggleColorMode} = useColorMode()
	const isDark = colorMode === "dark"

	console.log(session)

	const hash = (s: string) => s.split("").reduce((a,b) => (((a << 5) - a) + b.charCodeAt(0))|0, 0)
	const avatarUrl = session ? session.user?.image ?? `https://www.gravatar.com/avatar/${hash(session.user?.name ?? "username")}` : ""
	return (
		<Menu>
			<MenuButton
				as={Button}
				rounded={"full"}
				variant={"link"}
				cursor={"pointer"}
				_focus={{boxShadow: "none"}}
				minW={0}>
				<Avatar
					ml="8"
					size={"sm"}
					src={
						avatarUrl
					}
				/>
			</MenuButton>
			<MenuList>
				{
					session === null
						? <MenuItem onClick={() => signIn(["keycloak"] as any)}>Sign In / Sign Up</MenuItem>
						: <MenuItem onClick={() => signOut({callbackUrl: "/api/auth/logout"})}>Sign Out</MenuItem>
				}
				<MenuDivider/>
				<MenuItem onClick={toggleColorMode}>
					<HStack>
						<Box>Color Theme: {isDark ? "Dark" : "Light"}</Box>
						<Box>{isDark ? <FaMoon/> : <FaSun/>}</Box>	
					</HStack>
				</MenuItem>
			</MenuList>
		</Menu>
	)
}

function Nav(props: BoxProps) {
	const { isOpen, onOpen, onClose } = useDisclosure()

	return (
		<Box bg={useColorModeValue("gray.100", "gray.900")} px={4} {...props}>
			<Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
				<IconButton
					size={"sm"}
					icon={isOpen ? <Icon as={FaWindowClose} /> : <Icon as={FaFolderOpen} />}
					aria-label={"Open Menu"}
					display={{ md: "none" }}
					_focus={{boxShadow: "none"}}
					onClick={isOpen ? onClose : onOpen}
				/>
				<HStack spacing={8} alignItems={"center"}>
					<Box>
						<Heading size="md" fontWeight="semibold" color="blue.400">
							<Link href="/">JMP.blue</Link>
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
					<UserMenu></UserMenu>
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