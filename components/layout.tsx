import IconBrandGithub from 'https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/brand-github.tsx'
import IconCopyleft from 'https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/copyleft.tsx'
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
			<header class="max-w-screen-md mx-auto p-4 flex flex-row justify-between bg-blue-100 rounded-lg mt-4">
				<a href="/" class="flex flex-row items-center w-max gap-4">
					<img src="/logo.webp" class="w-24 h-24 rounded-full" alt="catnip" />
					<div>
						<h1 class="my-2 text-4xl font-bold">Trippn'</h1>
						<h2 class="font-bold text-gray-400">Catnip for humans</h2>
					</div>
				</a>
				<div class="flex justify-center items-center gap-2">
					{isAuthed ? (
						<>
							<span>{state?.user?.email}</span>
							<a href="api/log-out">
								<button
									type="button"
									class="px-1.5 py-1 bg-white rounded border(gray-400 1) hover:bg-red-200 flex gap-2"
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
			<footer class="max-w-screen-md mx-auto p-4 flex flex-row justify-center gap-4 bg-pink-100 rounded-lg mt-4">
				<a href="https://creativecommons.org/licenses/by-sa/4.0/">
					<IconCopyleft class="w-6 h-6" />
				</a>
				<a href="https://github.com/benmneb">
					<IconBrandGithub class="w-6 h-6" />
				</a>
			</footer>
		</>
	)
}
