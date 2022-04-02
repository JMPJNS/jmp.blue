import NextAuth, { Awaitable, Session } from "next-auth"
import { JWT } from "next-auth/jwt"
import jwt_decode from "jwt-decode"
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
		session(params: any): Awaitable<Session> {
			if (params.session.user) {
				params.session.user.roles = params.token.roles
			}
			return params.session
		},
		jwt(params): Awaitable<JWT> {
			const token = params.account?.access_token
			if (token) {
				const decoded = jwt_decode(token) as any
				params.token.roles = decoded.realm_access.roles ?? []
			}
			return params.token
		}
	},
	theme: {
		colorScheme: "dark", // "auto" | "dark" | "light"
		brandColor: "blue", // Hex color code
		logo: "https://avatars.githubusercontent.com/u/21279685?v=4" // Absolute URL to image
	}
})