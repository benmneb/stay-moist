import { Handlers, PageProps } from '$fresh/server.ts'
import { setCookie } from '$std/http/cookie.ts'
import { AuthError, Session, User } from 'supabase'
import { Layout } from '../components/layout.tsx'
import { supabase } from '../lib/supabase.ts'
import { ServerState } from './_middleware.ts'

interface Props {
	error?: string
	state: ServerState
	path: string
}

export const handler: Handlers = {
	async GET(req, ctx) {
		const url = new URL(req.url)
		return await ctx.render({ state: ctx.state, path: url.pathname })
	},
	async POST(req, ctx) {
		const url = new URL(req.url)
		const params = new URLSearchParams(url?.search)
		const nextRoute = params.get('then') || ''
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
			headers.set('location', `/${nextRoute}`)

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

export default function LogIn({ data }: PageProps<Props>) {
	const { error, state, path } = data

	return (
		<Layout state={state} title="Log in" path={path}>
			<main class="p-4 mx-auto mt-4 max-w-screen-md">
				<h1 class="text-xl text-center mb-5">Log in or sign up.</h1>
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
						class="px-3 py-2 rounded text-lg hover:bg-gradient-to-r from-indigo-100 via-violet-100 to-purple-100 hover:shadow-next hover:shadow-violet-200/40 active:scale-95 transition-transform"
					>
						Let's go!
					</button>
				</form>
				{error && (
					<p class="text-red-500 text-center mt-4">
						{error}, please try again.
					</p>
				)}
			</main>
		</Layout>
	)
}
