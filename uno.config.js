import { defineConfig, presetAttributify, presetWind } from 'unocss'

export default defineConfig({
	presets: [presetAttributify({}), presetWind()],
	shortcuts: [
		[
			'blue-btn',
			'flex items-center justify-center text-[#ffffff] text-sm font-bold bg-gradient-to-r from-[#7EAEFE] to-[#67B9F1] rounded-1 cursor-pointer',
		],
	],
})
