import IconChevronDown from 'icons/chevron-down.tsx'
import IconChevronUp from 'icons/chevron-up.tsx'
import { useState } from 'preact/hooks'

interface VoteButtonProps {
	start?: number
}

export default function VoteButtons({ start = 0 }: VoteButtonProps) {
	const [count, setCount] = useState<number>(start)

	return (
		<div class="flex flex-col">
			<IconChevronUp
				class="w-9 h-9 text-gray-500 cursor-pointer"
				onClick={() => setCount((c) => c + 1)}
			/>
			<span class="flex-grow-1 font-bold text-xl text-center text-gray-500">
				{count}
			</span>
			<IconChevronDown
				class="w-9 h-9 text-gray-500 cursor-pointer"
				onClick={() => setCount((c) => c - 1)}
			/>
		</div>
	)
}
