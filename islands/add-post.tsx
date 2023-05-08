import { Handlers } from '$fresh/server.ts'
import IconSend from 'https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/send.tsx'
import IconTrashX from 'https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/trash-x.tsx'
import IconWriting from 'https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/writing.tsx'
import { useRef, useState } from 'preact/hooks'

export const handler: Handlers = {
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
}

export default function AddPost({ isAuthed }: Props) {
	const [isAddingPost, setIsAddingPost] = useState<boolean>(false)
	const [titleText, setTitleText] = useState<string>('')
	const [bodyText, setBodyText] = useState<string>('')
	const textAreaRef = useRef<any>()

	function toggleIsAddingPost() {
		if (!isAuthed) return (window.location.href = '/log-in')

		if (!isAddingPost) return setIsAddingPost(true)

		if (!titleText.length && !bodyText.length) {
			return setIsAddingPost(false)
		}

		if (confirm('Are you sure? You will lose the text you have entered')) {
			setTitleText('')
			setBodyText('')
			setIsAddingPost(false)
		}
	}

	function handleSubmit() {
		console.log('title', titleText)
		console.log('body', bodyText)

		// TODO: post to supabase...
	}

	function textAreaAdjust() {
		textAreaRef.current.style.height = '0px'
		textAreaRef.current.style.height =
			25 + textAreaRef.current.scrollHeight + 'px' // TODO: get actual line height
	}

	return (
		<form method="post">
			<header class="flex justify-between mb-4 -mx-3">
				<button
					type="button"
					class={`px-3 py-2 bg-white rounded focus:outline-none flex gap-2 ${
						isAddingPost
							? 'hover:bg-gradient-to-r from-red-200 via-orange-200 to-amber-200'
							: 'hover:bg-gradient-to-r from-green-200 via-teal-200 to-sky-200'
					}`}
					onClick={toggleIsAddingPost}
				>
					{isAddingPost ? (
						<IconTrashX class="w-6 h-6" />
					) : (
						<IconWriting class="w-6 h-6" />
					)}
					{isAddingPost ? 'Cancel' : 'Add post'}
				</button>
				{isAddingPost && !!titleText.length && !!bodyText.length && (
					<button
						type="submit"
						class="px-3 py-2 bg-white rounded disabled:(opacity-50 cursor-not-allowed) focus:outline-none hover:bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 flex gap-2 self-start"
						onClick={handleSubmit}
					>
						<IconSend class="w-6 h-6" />
						Post it!
					</button>
				)}
			</header>
			{isAddingPost && (
				<main class="flex flex-col gap-3 mb-8">
					<input
						type="text"
						name="title"
						placeholder="Your Title"
						class="px-3 py-2 -ml-3 bg-white rounded focus-visible:outline-none text(3xl gray-900) font-bold mb-2"
						required
						value={titleText}
						onInput={(e) => setTitleText(e.currentTarget.value)}
					/>
					<time class="text-gray-300 font-bold cursor-not-allowed self-start">
						{new Date().toLocaleDateString('en-us', {
							year: 'numeric',
							month: 'long',
							day: 'numeric',
						})}
					</time>
					<textarea
						type="text"
						name="body"
						placeholder="Your post content... Minimum 280 characters"
						class="px-3 py-2 -ml-3 bg-white rounded focus-visible:outline-none resize-none text-gray-500"
						required
						ref={textAreaRef}
						value={bodyText}
						onInput={(e) => setBodyText(e.currentTarget.value)}
						onKeyUp={textAreaAdjust}
					/>
				</main>
			)}
		</form>
	)
}
