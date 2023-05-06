import { Head } from '$fresh/runtime.ts'
import { Handlers, PageProps } from '$fresh/server.ts'
import Header from '../components/Header.tsx'
import PostCard from '../components/PostCard.tsx'
import { Post, getPosts } from '../utils/posts.ts'

interface PageData {
	hasSubscribed: boolean
	posts: Post[]
}

export const handler: Handlers<PageData> = {
	async GET(req, ctx) {
		const url = new URL(req.url)
		const hasSubscribed = !!url.searchParams.get('subscribed')
		const posts = await getPosts()
		return ctx.render({ hasSubscribed, posts })
	},
}

export default function Home({ data }: PageProps<PageData>) {
	const { posts } = data

	return (
		<>
			<Head>
				<title>Stay Moist</title>
			</Head>
			<Header />
			<main class="p-4 mx-auto max-w-screen-md">
				<div class="mt-0">
					{posts.map((post, i) => (
						<PostCard post={post} isFirst={i === 0} />
					))}
				</div>
			</main>
		</>
	)
}
