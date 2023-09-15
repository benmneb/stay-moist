import { MiddlewareHandlerContext } from '$fresh/server.ts'
import { getCookies } from '$std/http/cookie.ts'

type User = {
	id: number
	email: string
	username: string
	// ...Supabase sends a lot more here that is never used
}

export type ServerState = {
	user: User | null
	error: { code: number; msg: string } | null
}

export async function handler(
	req: Request,
	ctx: MiddlewareHandlerContext<ServerState>
) {
	const cookies = getCookies(req.headers)
	const access_token = cookies.auth

	const headers = new Headers()

	if (access_token) {
		// const session = await redis.get(access_token)
		// if (!session) {
		// 	headers.set('location', '/')
		// 	return new Response(null, { headers, status: 303 })
		// }
		// const user = JSON.parse(session!.toString())?.user
		// ctx.state.user = user
	}

	return await ctx.next()
}
