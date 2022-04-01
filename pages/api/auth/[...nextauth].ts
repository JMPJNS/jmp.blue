import NextAuth, { Awaitable, Session } from "next-auth"
import { JWT } from "next-auth/jwt"
import KeycloakProvider from "next-auth/providers/keycloak"

export default NextAuth({
	secret: process.env.SECRET,
	providers: [
		// OAuth authentication providers
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
	}
})