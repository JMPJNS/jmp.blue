import { NextApiRequest, NextApiResponse } from "next"

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	res.redirect(`https://keycloak.jmp.blue/realms/jmp.blue/protocol/openid-connect/logout?redirect_uri=${encodeURIComponent(process.env.NEXTAUTH_URL || "https://jmp.blue")}`)
}