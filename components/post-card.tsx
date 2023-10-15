import VoteButtons from '../islands/vote-buttons.tsx'

export interface Post {
	id: string
	title: string
	created_at: Date
	body: string
	user_id: string
	author?: string
}

interface Props {
	post: Post
	index: number
	length: number
}

export default function PostCard({ post, index, length }: Props) {
	const pubDate = new Date(post.created_at).toLocaleDateString('en-us', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	})

	return (
		<div
			class={`my-12 flex flex-row justify-between ${index === 0 && 'mt-0'} ${
				index === length - 1 && 'mb-0'
			}`}
		>
			<a class="sm:col-span-2" href={`/${post.id}`}>
				<h3 class="text(3xl gray-900) font-bold mb-2">{post.title}</h3>
				<time
					dateTime={new Date(post.created_at).toISOString()}
					title={pubDate}
					class="text-gray-300 font-bold"
				>
					{pubDate}
				</time>
				<p class="mt-4 text-gray-500 line-clamp-1">
					{post.body.substring(0, 280)}
				</p>
			</a>
			<div class="basis-0">
				<VoteButtons />
			</div>
		</div>
	)
}
