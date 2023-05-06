export default function Header() {
	return (
		<header class="max-w-screen-md mx-auto flex flex-row">
			<a href="/" class="m-4 flex flex-row items-center w-max self-start">
				<img
					src="/logo.svg"
					class="w-24 h-24 mr-2"
					alt="the fresh logo: a sliced lemon dripping with juice"
				/>
				<div>
					<h1 class="my-2 text-4xl font-bold">Drippin'</h1>
					<h2 class="font-bold text-gray-300">Stay moist</h2>
				</div>
			</a>
		</header>
	)
}
