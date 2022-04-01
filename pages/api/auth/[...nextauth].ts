import NextAuth from "next-auth"
import KeycloakProvider from "next-auth/providers/keycloak"

export default NextAuth({
	secret: process.env.SECRET,
	providers: [
		// OAuth authentication providers
		KeycloakProvider({
			clientId: "jmp.blue",
			clientSecret: process.env.KEYCLOAK_SECRET,
			issuer: "https://keycloak.jmp.blue/auth/realms/jmp.blue"
		})
	],
})