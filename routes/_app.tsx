import { asset, Head } from '$fresh/runtime.ts'
import { AppProps } from '$fresh/src/server/types.ts'

export default function App({ Component }: AppProps) {
	return (
		<html>
			<Head>
				<link rel="stylesheet" href={asset('/fonts.css')} />
			</Head>
			<body>
				<Component />
			</body>
		</html>
	)
}
