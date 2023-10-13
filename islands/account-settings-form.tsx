import IconLock from 'icons/lock.tsx'
import IconMail from 'icons/mail.tsx'
import IconShieldLock from 'icons/shield-lock.tsx'
import IconTrashX from 'icons/trash-x.tsx'
import IconUserEdit from 'icons/user-edit.tsx'
import { useRef } from 'preact/hooks'
import { ServerState } from '/routes/_middleware.ts'

interface Props {
	user: ServerState['user']
}

export default function AccountSettingsForm({ user }: Props) {
	const usernameDialogRef = useRef<HTMLDialogElement>(null)
	const emailDialogRef = useRef<HTMLDialogElement>(null)
	const passwordDialogRef = useRef<HTMLDialogElement>(null)
	const deletingDialogRef = useRef<HTMLDialogElement>(null)
	const logoutDialogRef = useRef<HTMLDialogElement>(null)

	return (
		<>
			<main class="grid gap-4 grid-cols-3 grid-rows-2">
				<button
					onClick={() =>
						setTimeout(() => usernameDialogRef.current?.showModal(), 150)
					}
					class="flex flex-col items-center justify-center gap-4 p-4 py-8 text-lg text-indigo-500 rounded-lg bg-indigo-100/50 border-2 border-indigo-300 hover:(bg-indigo-100) active:scale-95 transition-transform"
				>
					<IconUserEdit class="w-8 h-8 text-indigo-400" />
					Edit username
				</button>
				<button
					onClick={() =>
						setTimeout(() => emailDialogRef.current?.showModal(), 150)
					}
					class="flex flex-col items-center justify-center gap-4 p-4 py-8 text-lg text-violet-500 rounded-lg bg-violet-100/50 border-2 border-violet-300 hover:(bg-violet-100) active:scale-95 transition-transform"
				>
					<IconMail class="w-8 h-8 text-violet-400" />
					Change email
				</button>
				<button
					onClick={() =>
						setTimeout(() => passwordDialogRef.current?.showModal(), 150)
					}
					class="flex flex-col items-center justify-center gap-4 p-4 py-8 text-lg text-purple-500 rounded-lg bg-purple-100/50 border-2 border-purple-300 hover:(bg-purple-100) active:scale-95 transition-transform"
				>
					<IconShieldLock class="w-8 h-8 text-purple-400" />
					Update password
				</button>
				<button
					onClick={() =>
						setTimeout(() => deletingDialogRef.current?.showModal(), 150)
					}
					class="flex flex-col items-center justify-center gap-4 p-4 py-8 text-lg text-rose-500 rounded-lg bg-rose-100/50 border-2 border-rose-300 hover:(bg-rose-100) active:scale-95 transition-transform"
				>
					<IconTrashX class="w-8 h-8 text-rose-400" />
					Delete account
				</button>
				<button
					onClick={() =>
						setTimeout(() => logoutDialogRef.current?.showModal(), 150)
					}
					class="w-full flex flex-col items-center justify-center gap-4 p-4 py-8 text-lg text-stone-500 rounded-lg bg-stone-100/50 border-2 border-stone-300 hover:(bg-stone-100) active:scale-95 transition-transform"
				>
					<IconLock class="w-8 h-8 text-stone-400" />
					Log out
				</button>
			</main>
			<dialog
				ref={usernameDialogRef}
				class="open:(p-8 pb-4 flex flex-col rounded-lg shadow-xl w-full max-w-md) backdrop:(bg-white/20 backdrop-blur-md)"
			>
				<h1 class="text-2xl mb-4">Edit username</h1>
				<p class="text-lg">
					Your publicly visible username is associated with all of your posts.
				</p>
				<form method="post" action="account" class="mt-6">
					<div class="flex flex-col items-start gap-4">
						<input
							type="text"
							name="username"
							minLength={4}
							maxLength={16}
							placeholder={user?.username || 'Anonymous'}
							class="w-56 px-3 py-2 rounded text-lg bg-indigo-100 text-indigo-700 placeholder:(text-indigo-300) focus-visible:(outline outline-indigo-300)"
							required
						/>
					</div>
					<footer class="flex flex-row justify-end gap-2 mt-4 -mr-3">
						<button
							type="reset"
							class="px-3 py-2 rounded text-lg active:scale-95 transition-transform"
							onClick={() => usernameDialogRef.current?.close()}
						>
							Cancel
						</button>
						<button
							type="submit"
							class="px-3 py-2 rounded text-lg flex flex-row items-center gap-2 hover:bg-gradient-to-r from-indigo-100 via-violet-100 to-purple-100 hover:shadow-next hover:shadow-violet-200/40 hover:shadow-next hover:shadow-violet-200/40 active:scale-95 transition-transform"
						>
							<IconUserEdit class="w-6 h-6" />
							Edit it
						</button>
					</footer>
				</form>
			</dialog>
			<dialog
				ref={emailDialogRef}
				class="open:(p-8 pb-4 flex flex-col rounded-lg shadow-xl w-full max-w-md) backdrop:(bg-white/20 backdrop-blur-md)"
			>
				<h1 class="text-2xl mb-4">Change email</h1>
				<p class="text-lg">You will be sent a confirmation email.</p>
				<form method="post" action="account" class="mt-6">
					<div class="flex flex-col items-start gap-4">
						<input
							type="email"
							name="email"
							placeholder={user?.email || 'Email'}
							class="px-3 py-2 rounded text-lg bg-violet-100 text-violet-700 placeholder:(text-violet-300) focus-visible:(outline outline-violet-300)"
							required
						/>
					</div>
					<footer class="flex flex-row justify-end gap-2 mt-4 -mr-3">
						<button
							type="reset"
							class="px-3 py-2 rounded text-lg active:scale-95 transition-transform"
							onClick={() => emailDialogRef.current?.close()}
						>
							Cancel
						</button>
						<button
							type="submit"
							class="px-3 py-2 rounded text-lg flex flex-row items-center gap-2 hover:bg-gradient-to-r from-indigo-100 via-violet-100 to-purple-100 hover:shadow-next hover:shadow-violet-200/40 hover:shadow-next hover:shadow-violet-200/40 active:scale-95 transition-transform"
						>
							<IconMail class="w-6 h-6" />
							Change it
						</button>
					</footer>
				</form>
			</dialog>
			<dialog
				ref={passwordDialogRef}
				class="open:(p-8 pb-4 flex flex-col rounded-lg shadow-xl w-full max-w-md) backdrop:(bg-white/20 backdrop-blur-md)"
			>
				<h1 class="text-2xl mb-4">Update password</h1>
				<p class="text-lg">
					Please enter your current password and a new password.
				</p>
				<form method="post" action="account" class="mt-6">
					<div class="flex flex-col items-start gap-4">
						<input
							type="password"
							name="old-password"
							placeholder="Current password"
							minLength={6}
							class="px-3 py-2 rounded text-lg bg-purple-100 text-purple-700 placeholder:(text-purple-300) focus-visible:(outline outline-purple-300)"
							required
						/>
						<input
							type="password"
							name="password"
							placeholder="New password"
							minLength={6}
							class="px-3 py-2 rounded text-lg bg-purple-100 text-purple-700 placeholder:(text-purple-300) focus-visible:(outline outline-purple-300)"
							required
						/>
					</div>
					<footer class="flex flex-row justify-end gap-2 mt-4 -mr-3">
						<button
							type="reset"
							class="px-3 py-2 rounded text-lg active:scale-95 transition-transform"
							onClick={() => passwordDialogRef.current?.close()}
						>
							Cancel
						</button>
						<button
							type="submit"
							class="px-3 py-2 rounded text-lg flex flex-row items-center gap-2 hover:bg-gradient-to-r from-indigo-100 via-violet-100 to-purple-100 hover:shadow-next hover:shadow-violet-200/40 hover:shadow-next hover:shadow-violet-200/40 active:scale-95 transition-transform"
						>
							<IconShieldLock class="w-6 h-6" />
							Update it
						</button>
					</footer>
				</form>
			</dialog>
			<dialog
				ref={deletingDialogRef}
				class="open:(p-8 pb-4 flex flex-col rounded-lg shadow-xl w-full max-w-md) backdrop:(bg-white/20 backdrop-blur-md)"
			>
				<h1 class="text-2xl mb-4">Delete account</h1>
				<p class="text-lg">
					Please enter your password to confirm permanent deletion of your
					account.
				</p>
				<form method="post" action="account" class="mt-6">
					<div class="flex flex-col gap-4">
						<input
							type="password"
							name="delete-account-password"
							placeholder="Password"
							class="px-3 py-2 rounded text-lg bg-red-100 text-red-700 placeholder:(text-red-300) focus-visible:(outline outline-red-300)"
							required
						/>
						<div class="flex items-center">
							<label
								class="relative flex items-center mr-2"
								for="delete-posts-also"
							>
								<input
									type="checkbox"
									id="delete-posts-also"
									name="delete-posts-also"
									class="peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-gray-300 transition-all checked:border-red-100 checked:bg-red-100"
								/>
								<div class="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-red-700 opacity-0 transition-opacity peer-checked:opacity-100">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="h-3.5 w-3.5"
										viewBox="0 0 20 20"
										fill="currentColor"
										stroke="currentColor"
										stroke-width="1"
									>
										<path
											fill-rule="evenodd"
											d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
											clip-rule="evenodd"
										></path>
									</svg>
								</div>
							</label>
							<label class="text-lg cursor-pointer" for="delete-posts-also">
								Delete all my posts also
							</label>
						</div>
					</div>
					<footer class="flex flex-row justify-end gap-2 mt-4 -mr-3">
						<button
							type="reset"
							class="px-3 py-2 rounded text-lg active:scale-95 transition-transform"
							onClick={() => deletingDialogRef.current?.close()}
						>
							Cancel
						</button>
						<button
							type="submit"
							class="px-3 py-2 rounded text-lg flex flex-row items-center gap-2 hover:bg-gradient-to-r from-red-100 via-orange-100 to-amber-100 hover:shadow-next hover:shadow-violet-200/40 active:scale-95 transition-transform"
						>
							<IconTrashX class="w-6 h-6" />
							Delete it
						</button>
					</footer>
				</form>
			</dialog>
			<dialog
				ref={logoutDialogRef}
				class="open:(p-8 pb-4 flex flex-col rounded-lg shadow-xl w-full max-w-md) backdrop:(bg-white/20 backdrop-blur-md)"
			>
				<h1 class="text-2xl mb-4">Log out?</h1>
				<p class="text-lg">Please confirm you want to log out.</p>
				<form method="get" action="api/log-out" class="mt-6">
					<footer class="flex flex-row justify-end gap-2 mt-4 -mr-3">
						<button
							type="reset"
							class="px-3 py-2 rounded text-lg active:scale-95 transition-transform"
							onClick={() => logoutDialogRef.current?.close()}
						>
							Cancel
						</button>
						<button
							type="submit"
							class="px-3 py-2 rounded text-lg flex flex-row items-center gap-2 hover:bg-gradient-to-r from-stone-100 via-neutral-100 to-zinc-100 hover:shadow-next hover:shadow-violet-200/40 active:scale-95 transition-transform"
						>
							<IconLock class="w-6 h-6" />
							Log out
						</button>
					</footer>
				</form>
			</dialog>
		</>
	)
}
