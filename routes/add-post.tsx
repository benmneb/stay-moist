import { Handlers, PageProps } from '$fresh/server.ts'
import { Layout } from '../components/layout.tsx'
import { ServerState } from './_middleware.ts'
import AddPostForm from '/islands/add-post.tsx'

export const handler: Handlers = {
	GET(_, ctx) {
		if (!ctx.state?.user) {
			const headers = new Headers()
			headers.set('location', '/log-in?then=add-post')
			return new Response(null, {
				status: 303, // See Other
				headers,
			})
		}
		return ctx.render({ state: ctx.state })
	},
	async POST(req, ctx) {
		// const url = new URL(req.url);
		const form = await req.formData()
		const title = form.get('title')?.toString() || ''
		const body = form.get('body')?.toString() || ''

		console.log('title', title)
		console.log('body', body)
		// const { data, error } = await supabase.auth.signUp({
		//   title,
		//   body,
		// });

		return new Response(null, {
			status: 303, // See Other
			// headers,
		})
	},
}

interface Props {
	isAuthed: boolean
	state: ServerState
}

export default function AddPost({ data }: PageProps<Props>) {
	const { state } = data

	return (
		<Layout state={state}>
			<main class="p-4 mx-auto max-w-screen-md">
				<AddPostForm />
			</main>
		</Layout>
	)
}
