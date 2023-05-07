import VoteButtons from '../islands/vote-buttons.tsx'
import { Post } from '../utils/posts.ts'

export default function PostCard({
	post,
	index,
	length,
}: {
	post: Post
	index: number
	length: number
}) {
	return (
		<div
			class={`my-12 flex flex-row justify-between ${index === 0 && 'mt-0'} ${
				index === length - 1 && 'mb-0'
			}`}
		>
			<a class="sm:col-span-2" href={`/${post.slug}`}>
				<h3 class="text(3xl gray-900) font-bold mb-2">{post.title}</h3>
				<time class="text-gray-300 font-bold">
					{new Date(post.publishedAt).toLocaleDateString('en-us', {
						year: 'numeric',
						month: 'long',
						day: 'numeric',
					})}
				</time>
				<div class="mt-4 text-gray-500">{post.snippet}</div>
			</a>
			<div class="basis-0">
				<VoteButtons />
			</div>
		</div>
	)
}
