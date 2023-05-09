import { Handlers, PageProps } from '$fresh/server.ts'
import { Layout } from '../components/layout.tsx'
import PostCard from '../components/post-card.tsx'
import AddPost from '../islands/add-post.tsx'
import { Post, getPosts } from '../utils/posts.ts'
import { ServerState } from './_middleware.ts'

interface PageData {
	posts: Post[]
	state: ServerState
}

export const handler: Handlers = {
	async GET(_, ctx) {
		const posts = await getPosts()
		return ctx.render({ posts, state: ctx.state })
	},
}

export default function Home({ data }: PageProps<PageData>) {
	const { posts, state } = data
	const isAuthed = !!state?.user

	return (
		<Layout state={state}>
			<main class="p-4 mx-auto max-w-screen-md">
				<AddPost isAuthed={isAuthed} />
				<div class="mt-0">
					{posts.map((post, i) => (
						<PostCard post={post} index={i} length={posts.length} />
					))}
				</div>
			</main>
		</Layout>
	)
}
