import { Handlers, PageProps } from '$fresh/server.ts'
import { render } from '$gfm'
import IconArrowBack from 'icons/arrow-back.tsx'
import { Layout } from '../components/layout.tsx'
import { Post } from '../utils/posts.ts'
import { ServerState } from './_middleware.ts'
import { getPost } from '/utils/posts.ts'

export const handler: Handlers = {
	async GET(_req, ctx) {
		const post = await getPost(ctx.params.post)
		if (post === null) return ctx.renderNotFound()
		return ctx.render({ post, state: ctx.state })
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
					{new Date(post.publishedAt).toLocaleDateString('en-us', {
						year: 'numeric',
						month: 'long',
						day: 'numeric',
					})}
				</time>
				<div
					class="mt-8 markdown-body"
					dangerouslySetInnerHTML={{ __html: render(post.content) }}
				/>
				<div class="my-12">
					<a href="/">
						<button
							type="button"
							class="px-3 py-2 rounded border(gray-400 1) hover:bg-gray-200 flex gap-2"
							href="/"
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
