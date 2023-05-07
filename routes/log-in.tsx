import { Head } from '$fresh/runtime.ts'
import { Handlers, PageProps } from '$fresh/server.ts'
import { setCookie } from '$std/http/cookie.ts'
import { Layout } from '../components/layout.tsx'
import { supabase } from '../lib/supabase.ts'
import { ServerState } from './_middleware.ts'

interface Props {
	error?: string
	state: ServerState
}

export const handler: Handlers<Props> = {
	async GET(req, ctx: any) {
		return await ctx.render({ state: ctx.state })
	},
	async POST(req, ctx: any) {
		const url = new URL(req.url)
		const form = await req.formData()
		const email = form.get('email')?.toString() || ''
		const password = form.get('password')?.toString() || ''

		const { data, error } = await supabase.auth.signUp({
			email,
			password,
		})

		function handleSuccess(data: any) {
			const { session, user } = data

			const headers = new Headers()
			headers.set('location', '/')

			setCookie(headers, {
				name: 'auth',
				value: session.access_token,
				maxAge: session.expires_in,
				sameSite: 'Lax',
				domain: url.hostname,
				path: '/',
				secure: true,
			})

			return new Response(null, {
				status: 303, // See Other
				headers,
			})
		}

		async function handleError(error: any) {
			console.log('handleError error', error)
			return await ctx.render({ state: ctx.state, error: error.message })
		}

		if (error) {
			if (error?.message.includes('User already registered')) {
				const { data, error } = await supabase.auth.signInWithPassword({
					email,
					password,
				})

				if (error) return handleError(error)

				return handleSuccess(data)
			}

			return handleError(error)
		}

		return handleSuccess(data)
	},
}

export default function SignIn({ data }: PageProps<Props>) {
	const { error, state } = data

	return (
		<>
			<Head>
				<title>Stay Weird | Log In</title>
			</Head>
			<Layout state={state}>
				<div class="p-4 mx-auto max-w-screen-md">
					<p class="text-center mb-4">Log in or create an account.</p>
					<form method="post" class="flex justify-center gap-2">
						<input
							type="email"
							name="email"
							placeholder="Email"
							class="px-3 py-2 bg-white rounded border(gray-500 2) disabled:(opacity-50 cursor-not-allowed)"
							required
						/>
						<input
							type="password"
							name="password"
							placeholder="Password"
							minLength={6}
							class="px-3 py-2 bg-white rounded border(gray-500 2) disabled:(opacity-50 cursor-not-allowed)"
							required
						/>
						<button
							type="submit"
							class="px-3 py-2 rounded border(gray-500 2) hover:bg-gray-200"
						>
							Lets go!
						</button>
					</form>
					{error && <p class="text-red-500">{error}, please try again.</p>}
				</div>
			</Layout>
		</>
	)
}