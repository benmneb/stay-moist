import { Head } from '$fresh/runtime.ts'
import { Handlers, PageProps } from '$fresh/server.ts'
import { setCookie } from '$std/http/cookie.ts'
import { AuthError, Session, User } from 'supabase'
import { Layout } from '../components/layout.tsx'
import { supabase } from '../lib/supabase.ts'
import { ServerState } from './_middleware.ts'

interface Props {
	error?: string
	state: ServerState
}

export const handler: Handlers = {
	async GET(req, ctx) {
		return await ctx.render({ state: ctx.state })
	},
	async POST(req, ctx) {
		const url = new URL(req.url)
		const form = await req.formData()
		const email = form.get('email')?.toString() || ''
		const password = form.get('password')?.toString() || ''

		const { data, error } = await supabase.auth.signUp({
			email,
			password,
		})

		function handleSuccess(data: {
			user: User | null
			session: Session | null
		}) {
			const { user, session } = data

			const headers = new Headers()
			headers.set('location', '/')

			setCookie(headers, {
				name: 'auth',
				value: session!.access_token,
				maxAge: session!.expires_in,
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

		async function handleError(error: AuthError) {
			const { message } = error!
			return await ctx.render({ state: ctx.state, error: message })
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
				<div class="p-4 mx-auto mt-4 max-w-screen-md">
					<h1 class="text-xl text-center mb-4">Log in or create an account.</h1>
					<form
						method="post"
						class="flex flex-col justify-center items-center gap-2"
					>
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
							class="px-3 py-2 rounded hover:bg-gradient-to-r from-indigo-100 via-violet-100 to-purple-100"
						>
							Lets go!
						</button>
					</form>
					{error && (
						<p class="text-red-500 text-center mt-4">
							{error}, please try again.
						</p>
					)}
				</div>
			</Layout>
		</>
	)
}
