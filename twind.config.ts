import { defineConfig } from 'twind'
import { Options } from 'twind_fresh_plugin/twind.ts'
// twind preset
import presetAutoPrefix from 'twind-preset-autoprefix'
import presetLineClamp from 'twind-preset-line-clamp'
import presetTailWind from 'twind-preset-tailwind'

export default {
	...defineConfig({
		presets: [presetAutoPrefix(), presetTailWind(), presetLineClamp()],
		theme: {
			extend: {
				boxShadow: {
					next: '0 4px 14px 0 rgba(0, 0, 0, 0.3)',
				},
			},
		},
	}),
	selfURL: import.meta.url,
} as unknown as Options
