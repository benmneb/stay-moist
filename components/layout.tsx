import { Head } from '$fresh/runtime.ts'
import IconBrandGithub from 'icons/brand-github.tsx'
import IconCopyleft from 'icons/copyleft.tsx'
import IconLockOpen from 'icons/lock-open.tsx'
import IconLock from 'icons/lock.tsx'
import { ComponentChildren } from 'preact'
import { ServerState } from '/routes/_middleware.ts'

type Props = {
	children: ComponentChildren
	state: ServerState
	title?: string
	path?: string
}

export function Layout({ children, state, title, path }: Props) {
	const isAuthed = !!state?.user
	const isLogInPath = path === '/log-in'

	return (
		<>
			<Head>
				<title>{title ? `Trippn' | ${title}` : "Trippn'"}</title>
				<link rel="stylesheet" href="/baseline.css" />
			</Head>
			<header class="max-w-screen-md mx-auto p-4 flex flex-row justify-between mt-4">
				<a href="/" class="flex flex-row items-center w-max gap-4">
					<img src="/logo.webp" class="w-24 h-24 hue-rotate-30" alt="catnip" />
					<div>
						<h1 class="my-2 text-4xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
							Trippn'
						</h1>
						<h2 class="font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
							Catnip for humans
						</h2>
					</div>
				</a>
				<div class="flex justify-center items-center gap-2">
					{isAuthed && (
						<>
							<span>{state?.user?.email}</span>
							<a href="api/log-out">
								<button
									type="button"
									class="px-2 py-2 bg-transparent rounded hover:bg-gradient-to-r from-red-100 via-orange-100 to-amber-100 flex gap-2"
								>
									<IconLock class="w-6 h-6" />
								</button>
							</a>
						</>
					)}
					{!isLogInPath && !isAuthed && (
						<a href="/log-in" class="flex flex-row items-center gap-2 -mr-2">
							<button
								type="button"
								class="px-3 py-2 bg-transparent rounded hover:bg-gradient-to-r from-indigo-100 via-violet-100 to-purple-100 flex gap-2"
							>
								Log in
								<IconLockOpen class="w-6 h-6" />
							</button>
						</a>
					)}
				</div>
			</header>
			{children}
			<footer class="max-w-screen-md mx-auto p-4 flex flex-row justify-center gap-4">
				<a
					href="https://creativecommons.org/licenses/by-sa/4.0/"
					class="p-2 rounded-full hover:bg-gradient-to-r from-sky-100 via-blue-100 to-indigo-100"
				>
					<IconCopyleft class="w-6 h-6" />
				</a>
				<a
					href="https://github.com/benmneb"
					class="p-2 rounded-full hover:bg-gradient-to-r from-violet-100 via-purple-100 to-fuchsia-100"
				>
					<IconBrandGithub class="w-6 h-6" />
				</a>
			</footer>
		</>
	)
}
