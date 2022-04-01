import NextAuth, { Awaitable, Session } from "next-auth"
import { JWT } from "next-auth/jwt"
import KeycloakProvider from "next-auth/providers/keycloak"
import GithubProvider from "next-auth/providers/github"
import DiscordProvider from "next-auth/providers/discord"

export default NextAuth({
	secret: process.env.SECRET,
	providers: [
		// OAuth authentication providers
		DiscordProvider({
			clientId: process.env.DISCORD_ID,
			clientSecret: process.env.DISCORD_SECRET
		}),
		GithubProvider({
			clientId: process.env.GITHUB_ID,
			clientSecret: process.env.GITHUB_SECRET,
		}),
		KeycloakProvider({
			clientId: "jmp.blue",
			clientSecret: process.env.KEYCLOAK_SECRET!,
			issuer: "https://keycloak.jmp.blue/realms/jmp.blue"
		})
	],
	callbacks: {
		session(params): Awaitable<Session> {
			return params.session
		},
		jwt(params): Awaitable<JWT> {
			return params.token
		}
	},
	theme: {
		colorScheme: "dark", // "auto" | "dark" | "light"
		brandColor: "blue", // Hex color code
		logo: "https://avatars.githubusercontent.com/u/21279685?v=4" // Absolute URL to image
	}
})