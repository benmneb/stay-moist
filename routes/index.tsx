import { Head } from '$fresh/runtime.ts'
import { Handlers, PageProps } from '$fresh/server.ts'
import PostCard from '../components/PostCard.tsx'
import { Layout } from '../components/layout.tsx'
import { Post, getPosts } from '../utils/posts.ts'
import { ServerState } from './_middleware.ts'

interface PageData {
	posts: Post[]
	state: ServerState
}

export const handler: Handlers<PageData> = {
	async GET(req, ctx: any) {
		const posts = await getPosts()
		return ctx.render({ posts, state: ctx.state })
	},
}

export default function Home({ data }: PageProps<PageData>) {
	const { posts, state } = data

	return (
		<>
			<Head>
				<title>Stay Moist</title>
			</Head>
			<Layout state={state}>
				<main class="p-4 mx-auto max-w-screen-md">
					<div class="mt-0">
						{posts.map((post, i) => (
							<PostCard post={post} isFirst={i === 0} />
						))}
					</div>
				</main>
			</Layout>
		</>
	)
}
