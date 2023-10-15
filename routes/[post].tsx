import { Handlers, PageProps } from '$fresh/server.ts'
import IconArrowBack from 'icons/arrow-back.tsx'
import { Layout } from '../components/layout.tsx'
import { Post } from '../components/post-card.tsx'
import { supabase } from '../lib/supabase.ts'
import { ServerState } from './_middleware.ts'

export const handler: Handlers = {
	async GET(_req, ctx) {
		try {
			const { data: post, error } = await supabase
				.from('posts')
				.select()
				.eq('id', ctx?.params?.post)
				.single()

			if (error) throw error

			const { data: author, error: authorError } = await supabase
				.from('user_names')
				.select('name')
				.eq('user_id', post.user_id)
				.maybeSingle()

			if (authorError) throw authorError

			return ctx.render({
				post: { ...post, author: author?.name },
				state: ctx.state,
			})
		} catch (error) {
			console.error('While fetching post:', error)
			return ctx.renderNotFound() // TODO: WTF is this
		}
	},
}

interface PostPageProps {
	post: Post
	state: ServerState
}

export default function PostPage({ data }: PageProps<PostPageProps>) {
	const { post, state } = data

	return (
		<Layout state={state} title={post.title}>
			<main class="max-w-screen-md px-4 pt-16 mx-auto">
				<h1 class="text-5xl font-bold">{post.title}</h1>
				<time class="flex my-4 text-gray-300 font-bold">
					{new Date(post.created_at).toLocaleDateString('en-us', {
						year: 'numeric',
						month: 'long',
						day: 'numeric',
					})}
				</time>
				<div class="my-8 whitespace-pre-wrap">{post.body}</div>
				<footer>
					<address rel="author" class="text-gray-300 self-start">
						{/* // TODO: Make users table etc */}
						by {post?.author || 'Anonymous'}
					</address>
				</footer>
				<div class="my-12">
					<a href="/">
						<button
							type="button"
							class="-mx-3 px-3 py-2 rounded hover:bg-gradient-to-r from-indigo-100 via-violet-100 to-purple-100 flex gap-2 hover:shadow-next hover:shadow-violet-200/40 active:scale-95 transition-transform"
						>
							<IconArrowBack class="w-6 h-6" />
							Back to home
						</button>
					</a>
				</div>
			</main>
		</Layout>
	)
}
