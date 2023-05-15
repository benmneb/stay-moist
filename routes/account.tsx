import { Handlers, PageProps } from '$fresh/server.ts'
import { Layout } from '/components/layout.tsx'
import AccountSettingsForm from '/islands/account-settings-form.tsx'
import { ServerState } from '/routes/_middleware.ts'

interface Props {
	state: ServerState
}

export const handler: Handlers = {
	async GET(req, ctx) {
		if (!ctx.state?.user) {
			const headers = new Headers()
			headers.set('location', '/log-in?then=account')
			return new Response(null, {
				status: 303, // See Other
				headers,
			})
		}

		return await ctx.render({ state: ctx.state })
	},

	async POST(req, ctx) {
		const url = new URL(req.url)
		const form = await req.formData()
		const username = form.get('username')?.toString()
		const email = form.get('email')?.toString()
		const password = form.get('password')?.toString()

		if (username) {
			console.log('username', username)

			const headers = new Headers()
			headers.set('location', url.pathname)

			// const authCookie = getCookies(headers)

			// setCookie(headers, {
			// 	name: 'auth',
			// 	value: session!.access_token,
			// 	maxAge: session!.expires_in,
			// 	sameSite: 'Lax',
			// 	domain: url.hostname,
			// 	path: '/',
			// 	secure: true,
			// })

			return new Response(null, {
				status: 303, // See Other
				headers,
			})
		}

		if (email) {
			console.log('email', email)

			const headers = new Headers()
			headers.set('location', url.pathname)

			// const authCookie = getCookies(headers)

			// setCookie(headers, {
			// 	name: 'auth',
			// 	value: session!.access_token,
			// 	maxAge: session!.expires_in,
			// 	sameSite: 'Lax',
			// 	domain: url.hostname,
			// 	path: '/',
			// 	secure: true,
			// })

			return new Response(null, {
				status: 303, // See Other
				headers,
			})
		}

		if (password) {
			console.log('password', password)

			const headers = new Headers()
			headers.set('location', url.pathname)

			// const authCookie = getCookies(headers)

			// setCookie(headers, {
			// 	name: 'auth',
			// 	value: session!.access_token,
			// 	maxAge: session!.expires_in,
			// 	sameSite: 'Lax',
			// 	domain: url.hostname,
			// 	path: '/',
			// 	secure: true,
			// })

			return new Response(null, {
				status: 303, // See Other
				headers,
			})
		}

		console.warn('Something went horrible wrong')

		return new Response(null, {
			status: 303, // See Other
			// headers,
		})
	},
}

export default function Account({ data: { state } }: PageProps<Props>) {
	return (
		<Layout state={state} title="Log in">
			<main class="p-4 mx-auto mt-4 max-w-screen-md">
				<h1 class="text-5xl font-bold mb-8 text-center">Account Settings</h1>
				<AccountSettingsForm user={state.user} />
			</main>
		</Layout>
	)
}
