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
						<h1 class="my-2 text-4xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
							Trippn'
						</h1>
						<h2 class="font-bold bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
							Catnip for humans
						</h2>
					</div>
				</a>
				<div class="flex justify-center items-center gap-2">
					{isAuthed ? (
						<>
							<span>{state?.user?.email}</span>
							<a href="api/log-out">
								<button
									type="button"
									class="px-2 py-2 bg-transparent rounded hover:bg-blue-200 flex gap-2"
								>
									<IconLock class="w-6 h-6" />
								</button>
							</a>
						</>
					) : (
						<a href="/log-in" class="flex flex-row items-center gap-2">
							<button
								type="button"
								class="px-3 py-2 bg-transparent rounded hover:bg-blue-200 flex gap-2"
							>
								Log in
								<IconLockOpen class="w-6 h-6" />
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
