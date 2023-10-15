import { Handlers, PageProps } from '$fresh/server.ts'
import { Layout } from '../components/layout.tsx'
import { supabase } from '../lib/supabase.ts'
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
		const form = await req.formData()
		const title = form.get('title')?.toString() || ''
		const body = form.get('body')?.toString() || ''
		const user = ctx.state.user // TODO: Add type
		const headers = new Headers()

		try {
			if (!title || !body) throw 'Must have title and body content.'

			const { data, error } = await supabase
				.from('posts')
				.insert({ user_id: user.id, title, body })
				.select()
				.single()

			if (error) throw error

			headers.set('location', data.id)
			return new Response(null, {
				status: 303, // See Other
				headers,
			})
		} catch (error) {
			console.error('While submitting post:', error)
			return ctx.render({ state: ctx.state, content: { title, body }, error })
		}
	},
}

export interface AddPostPageProps {
	isAuthed: boolean
	state: ServerState
	content?: {
		title?: string
		body?: string
	}
	error?: any
}

export default function AddPost({ data }: PageProps<AddPostPageProps>) {
	const { state, content } = data

	return (
		<Layout state={state}>
			<main class="p-4 mx-auto max-w-screen-md">
				<AddPostForm content={content} />
			</main>
		</Layout>
	)
}
