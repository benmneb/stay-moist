import { Handlers, PageProps } from '$fresh/server.ts'
import IconWriting from 'icons/writing.tsx'

import { Layout } from '../components/layout.tsx'
import PostCard, { Post } from '../components/post-card.tsx'
import { supabase } from '../lib/supabase.ts'
import { ServerState } from './_middleware.ts'

interface PageData {
	posts: Post[]
	state: ServerState
}

export const handler: Handlers = {
	async GET(_, ctx) {
		try {
			const { data: posts, error } = await supabase
				.from('posts')
				.select('*')
				.range(0, 25)
				.order('created_at', { ascending: false })

			if (error) throw error

			return ctx.render({ posts, state: ctx.state })
		} catch (error) {
			console.error('While fetching posts:', error)
			return ctx.render({ posts: [], state: ctx.state })
		}
	},
}

export default function Home({ data }: PageProps<PageData>) {
	const { posts, state } = data
	const link = state.user ? '/add-post' : '/log-in?then=add-post'

	return (
		<Layout state={state}>
			<main class="p-4 mx-auto max-w-screen-md">
				<div class="mb-4 -mx-3">
					<a href={link}>
						<button
							type="button"
							class="px-3 py-2 rounded focus:outline-none flex gap-2 hover:bg-gradient-to-r from-indigo-100 via-violet-100 to-purple-100 hover:shadow-next hover:shadow-violet-200/40 active:scale-95 transition-transform"
						>
							<IconWriting class="w-6 h-6" />
							Add post
						</button>
					</a>
				</div>
				<div class="mt-0">
					{posts.map((post, i) => (
						<PostCard post={post} index={i} length={posts.length} />
					))}
				</div>
			</main>
		</Layout>
	)
}
