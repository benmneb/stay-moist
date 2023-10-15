import IconSend from 'icons/send.tsx'
import IconTrashX from 'icons/trash-x.tsx'
import { useRef, useState } from 'preact/hooks'

export default function AddPost() {
	const [titleText, setTitleText] = useState<string>('')
	const [bodyText, setBodyText] = useState<string>('')
	const textAreaRef = useRef<HTMLTextAreaElement>(null)

	const currentDate = new Date().toLocaleDateString('en-us', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	})

	function handleCancel() {
		if (!titleText.length && !bodyText.length) {
			return (window.location.href = '/')
		}

		if (confirm('Are you sure? You will lose everything you have entered')) {
			window.location.href = '/'
		}
	}

	function handleSubmit() {
		console.log('title', titleText)
		console.log('body', bodyText)

		// TODO: post to supabase...
	}

	function textAreaAdjust() {
		if (!textAreaRef.current) return

		textAreaRef.current.style.height = '0px'
		textAreaRef.current.style.height =
			25 + textAreaRef.current.scrollHeight + 'px' // TODO: get actual line height
	}

	return (
		<form method="post">
			<header class="flex justify-between mb-4 -mx-3">
				<button
					type="button"
					class="px-3 py-2 flex gap-2 rounded focus:outline-none hover:bg-gradient-to-r from-red-100 via-orange-100 to-amber-100 hover:shadow-next hover:shadow-orange-200/40 active:scale-95 transition-transform"
					onClick={handleCancel}
				>
					<IconTrashX class="w-6 h-6" />
					Cancel
				</button>
				{!!titleText.length && !!bodyText.length && (
					<button
						type="submit"
						class="px-3 py-2 flex gap-2 self-start rounded focus:outline-none hover:bg-gradient-to-r from-indigo-100 via-violet-100 to-purple-100 hover:shadow-next hover:shadow-violet-200/40 active:scale-95 transition-transform"
						onClick={handleSubmit}
					>
						<IconSend class="w-6 h-6" />
						Post it!
					</button>
				)}
			</header>
			<main class="flex flex-col gap-3">
				<input
					type="text"
					name="title"
					placeholder="Your Title"
					class="px-3 py-2 -ml-3 bg-white rounded focus-visible:outline-none text(5xl gray-900) font-bold mb-2"
					required
					value={titleText}
					onInput={(e) => setTitleText(e.currentTarget.value)}
				/>
				<time
					dateTime={new Date().toISOString()}
					title={currentDate}
					class="text-gray-300 font-bold cursor-not-allowed self-start"
				>
					{currentDate}
				</time>
				<textarea
					type="text"
					name="body"
					placeholder="Your post content... Minimum 280 characters"
					class="px-3 py-2 -ml-3 bg-white rounded focus-visible:outline-none resize-none text-gray-900"
					required
					ref={textAreaRef}
					value={bodyText}
					onInput={(e) => setBodyText(e.currentTarget.value)}
					onKeyUp={textAreaAdjust}
				/>
			</main>
			<footer>
				<address
					rel="author"
					class="text-gray-300 cursor-not-allowed self-start"
				>
					{/* // TODO: get user name */}
					by Anonymous
				</address>
			</footer>
		</form>
	)
}
