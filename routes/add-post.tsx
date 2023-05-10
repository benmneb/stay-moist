import { Handlers, PageProps } from '$fresh/server.ts'
import { Layout } from '../components/layout.tsx'
import { ServerState } from './_middleware.ts'
import AddPostIsland from '/islands/add-post.tsx'

export const handler: Handlers = {
	GET(_, ctx) {
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
	const isAuthed = !!state?.user

	return (
		<Layout state={state}>
			<main class="p-4 mx-auto max-w-screen-md">
				<AddPostIsland isAuthed={isAuthed} />
			</main>
		</Layout>
	)
}
