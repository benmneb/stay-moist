import IconLockOpen from 'https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/lock-open.tsx'
import IconLock from 'https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/lock.tsx'
import { ComponentChildren } from 'preact'
import { ServerState } from '/routes/_middleware.ts'

type Props = {
	children: ComponentChildren
	state: ServerState
}

export function Layout({ children, state }: Props) {
	const isAuthed = !!state?.user

	return (
		<>
			<header class="max-w-screen-md mx-auto p-4 flex flex-row justify-between">
				<a href="/" class="flex flex-row items-center w-max gap-4">
					<img
						src="/logo.webp"
						class="w-24 h-24 rounded-full"
						alt="the fresh logo: a sliced lemon dripping with juice"
					/>
					<div>
						<h1 class="my-2 text-4xl font-bold">Trippn'</h1>
						<h2 class="font-bold text-gray-300">Stay weird</h2>
					</div>
				</a>
				<div class="flex justify-center items-center gap-2">
					{isAuthed ? (
						<>
							<span>{state?.user?.email}</span>
							<a href="api/log-out">
								<button
									type="button"
									class="px-1.5 py-1 bg-white rounded border(gray-400 1) hover:bg-gray-200 flex gap-2"
								>
									<IconLock class="w-4 h-4" />
								</button>
							</a>
						</>
					) : (
						<a href="/log-in" class="flex flex-row gap-2">
							<span>Log in</span>
							<button
								type="button"
								class="px-1.5 py-1 bg-white rounded border(gray-400 1) hover:bg-gray-200 flex gap-2"
							>
								<IconLockOpen class="w-4 h-4" />
							</button>
						</a>
					)}
				</div>
			</header>
			{children}
		</>
	)
}
